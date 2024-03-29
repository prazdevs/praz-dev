---
title: Posting Reddit submissions to Discord & Twitter automatically
date: 2020-03-15
tags: [node, typescript]
---

Now that our Discord bot can [execute commands](https://praz.dev/abstract-commands-discord), how about we add more features into it?
Reddit is a well known platform used by many communities to share around a given topic. But since I mainly use Discord and don't have much time browsing Reddit, I realised being able to see what was being posted on Reddit from Discord was a great idea and so it was time for our bot to get its upgrade.

## Fetching data from Reddit

The [reddit API](https://www.reddit.com/dev/api/) is really complete but also quite complex. Every post on reddit is called a "submission", and they hold quite a lot of properties, including metadata and links to external content. Thanks to the great NodeJs community, _there's a package for that_. [Snoowrap](https://www.npmjs.com/package/snoowrap) comes with nice [documentation](https://not-an-aardvark.github.io/snoowrap/snoowrap.html) and is perfect for our needs. We simple run `yarn add snoowrap` as it already contains types for our TypeScript needs.

### Reddit posts for our needs

When fetching submissions with Snoowrap, we get raw complete `submission` objects containing a lot of properties we won't need. So we will first create our own custom object with only what we need. I made arbitrary choices and settled with a few, up to you to change them according to your needs. We get a `RedditPost` class similar to this:

```typescript title=src/reddit/RedditPost.ts
import { Submission } from 'snoowrap';

export class RedditPost {
  id: string;
  title: string;
  author: string;
  self: boolean;
  thumbnail: string;
  selfText: string;
  image: string;
  url: string;
  hasMedia: boolean;
  flair: string;
  created: number;

  constructor(submission: Submission) {
    this.id = submission.id;
    this.title = submission.title;
    this.author = submission.author.name;
    this.self = submission.is_self;
    this.selfText = submission.selftext;
    this.thumbnail = submission.thumbnail;
    this.image = submission.url;
    this.url = `http://reddit.com${submission.permalink}`;
    this.hasMedia = !!submission.media;
    this.flair = submission.link_flair_text
      ? `[${submission.link_flair_text}]`
      : '[Post]';
    this.created = submission.created_utc;
  }
}
```

If you're not familiar these names, feel free to look into the documentation or try to fetch complete submissions and see how they look like. For now we'll settle with that one; everytime we fetch a submission, we will create a `RedditPost` object and work with it.

### Fetching the submissions

Snoowrap gives us an object also called `snoowrap` that gives us access to the Reddit API. We will create our own `SubredditFetcher` that holds and uses it to get posts (or more if you feel like it) from a given subreddit. We will need the [Moment](https://momentjs.com/) package so make sure to import it with `yarn add moment`. Here is the class:

```typescript title=src/reddit/SubredditFetcher.ts
import moment from 'moment';
import snoowrap, { Submission } from 'snoowrap';

import { RedditPost } from './RedditPost';

export class SubredditFetcher {
  private R: snoowrap;

  constructor(private subreddit: string) {
    this.R = new snoowrap({
      clientId: process.env.R_CLIENT_ID,
      clientSecret: process.env.R_CLIENT_SECRET,
      username: process.env.R_USERNAME,
      password: process.env.R_PASSWORD,
      userAgent: 'DiscordBot',
    });
  }

  async getLatestPostsSince(delayInSeconds: number): Promise<RedditPost[]> {
    const latestPosts = await this.getLatestPosts();
    const filtered = latestPosts.filter(
      post => moment().unix() - post.created < delayInSeconds
    );
    return filtered;
  }

  async getLatestPosts(): Promise<RedditPost[]> {
    const latestSubmissions = await this.R.getSubreddit(
      this.subreddit
    ).getNew();
    const latestPosts = latestSubmissions.map(
      submission => new RedditPost(submission)
    );
    return latestPosts;
  }
}
```

As you can wee, when we instantiate our SubredditFetcher, the snoowrap object needs 4 keys to connect to the API. The `clientId` and `clientSecret` can be obtained by creating an app in the [applications section](https://www.reddit.com/prefs/apps/) of Reddit, `username` and `password` are also needed, feel free to create an account only for our bot or use your own. Again, we securely store the values in our `.env` file.

Since our goal is to fetch the latest posts, we call on the `getNew` method in `getLatestPosts` and map the fetched submissions to our custom post objects. `getLatestPostsSince` uses the previous method to filter results not older than the time passed as parameter (in seconds). Both these methods are asynchronous because they interact with an external API.

## Posting to Discord

Now that we can get the latest posts from a given subreddit, we need to post them in our Discord server. We could just format the metadata into a simple message and send it to a channel, but Discord (and its API) offers the ability to post "Embeds" or posts with superpowers. The idea will be to run a function every X seconds, get the latest posts since last time we checked, and then post them.

### Building embeds

Let's create a file to hold our routine and everything it will need to run. I already included the imports we will need later.

```typescript title=src/routines/fetchAndPost.routine.ts
import { Client, RichEmbed, TextChannel } from 'discord.js';

import { RedditPost } from '../reddit/RedditPost';
import { SubredditFetcher } from '../reddit/SubredditFetcher';

const buildEmbed = (post: RedditPost): RichEmbed => {
  const embed = new RichEmbed();

  embed.setAuthor(`New post on Reddit! ${post.flair}`);
  embed.setTitle(post.title);
  embed.setURL(post.url);
  embed.setColor('#9230a7');

  if (post.self) {
    embed.setDescription(post.selfText);
  } else if (post.hasMedia) {
    embed.setImage(post.thumbnail);
    embed.setDescription('This post contains media...');
  } else {
    embed.setImage(post.image);
  }

  embed.setFooter(
    `Posted by u/${post.author}`,
    'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png'
  );

  return embed;
};
```

This method will return a `RichEmbed` object than we can directly post to a Discord text channel, pretty convenient isn't it?

### Posting the embeds

This is where we interact with Discord by adding the following methods:

```typescript title=src/routines/fetchAndPost.routine.ts
const findDiscordChannels = (
  client: Client,
  channelIds: string[]
): TextChannel[] => {
  return channelIds.map(channelId => {
    const channel = client.channels.find(c => c.id === channelId);
    return channel as TextChannel;
  });
};

const postEmbed = async (
  post: RedditPost,
  channelIds: string[],
  client: Client
): Promise<void> => {
  const channels = findDiscordChannels(client, channelIds);
  const embed: RichEmbed = buildEmbed(post);

  channels.forEach(async channel => {
    try {
      await channel.send(embed);
      console.log(
        `  Successfully posted '${post.id}' to ${channel.guild}>${channel.name}`
      );
    } catch (err) {
      console.error(
        `  Failed to post ${post.id} to ${channel.guild}>${channel.name} : ${err.message}`
      );
    }
  });
};
```

The `postEmbed` method takes a list of Discord channel IDs and tries to post to those channels. We catch any potential error (channel not found or not text, unauthorize...) to avoid having the bot crash. It's as simple as iterating through the array, mapping the IDs with `TextChannel` objects and using each of them to send the previously built embed.

### Wrapping up the routine

Let's now put things together. We will first add a small method that fetches the posts and handles the potential errors.

```typescript title=src/routines/fetchAndPost.routine.ts
const fetchPosts = async (
  subreddit: string,
  delaySeconds: number
): Promise<RedditPost[]> => {
  const fetcher = new SubredditFetcher(subreddit);
  try {
    const posts = await fetcher.getLatestPostsSince(delaySeconds);
    console.log(`Fetched ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error(`(!) Error while fetching from r/${subreddit}`);
    return [];
  }
};
```

And then, the final method to will executes our process regularly:

```typescript title=src/routines/fetchAndPost.routine.ts
export const startFetchAndPostRoutine = async (
  delaySeconds: number,
  subreddit: string,
  discordClient: Client
): Promise<void> => {
  const fetchAndPost = async () => {
    const posts = await fetchPosts(subreddit, delaySeconds);

    posts.forEach(async post => {
      await postEmbed(post, ['675271307696406545'], discordClient);
    });
  };

  await fetchAndPost();
  setInterval(fetchAndPost, delaySeconds * 1000);
};
```

It is pretty straightforward: fetch posts, then for each post, transfer them to the given Discord channels. For now, we will keep those hardcoded, I plan on having them stored in a database, or at least configuration files.

To start this routine, all we need to do is import `startFetchAndPostRoutine` in our `DiscordBot.ts` and change the `setReadyHandler` as follows:

```typescript title=src/DiscordBot.ts
export const startFetchAndPostRoutine = async (
  private setReadyHandler(): void {
    this.client.on('ready', async () => {
      console.log('Discord Bot connected');
      await this.client.user.setActivity('with sparkles | praz.dev');

      //* routines
      await startFetchAndPostRoutine(30, 'zoemains', this.client);
    });
  }
```

And that's it; every 30 seconds, posts will be fetched from the given subreddit (here 'r/zoemains') and posted to the channels we set in the routine.

## Bonus: posting to Twitter

I was asked by a friend running the Discord server if the bot could also post the messages on the community's Twitter account. I decided to add that feature to the routine.

### Interacting with Twitter

To interact with Twitter, i used the [twitter package](https://www.npmjs.com/package/twitter). Just run `yarn add twitter` then `yarn add -D @types/twitter` to add it to the project. Head over to [developer.twitter.com](https://developer.twitter.com/), create your account and do everything required to create an app and get API keys. Here is how we interact with Twitter with our own `TwitterPoster`:

```typescript title=src/twitter/TwitterPoster.ts
import Twitter from 'twitter';

export class TwitterPoster {
  private T: Twitter;

  constructor() {
    if (
      !process.env.T_CONSUMER_KEY ||
      !process.env.T_CONSUMER_SECRET ||
      !process.env.T_ACCESS_TOKEN_KEY ||
      !process.env.T_ACCESS_TOKEN_SECRET
    ) {
      throw new Error('Missing Twitter config in env');
    }
    this.T = new Twitter({
      consumer_key: process.env.T_CONSUMER_KEY,
      consumer_secret: process.env.T_CONSUMER_SECRET,
      access_token_key: process.env.T_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.T_ACCESS_TOKEN_SECRET,
    });
  }

  async tweet(tweet: string): Promise<void> {
    await this.T.post('statuses/update', { status: tweet });
  }
}
```

As usual, we put our API keys in the `.env` file.

### Adding functionality to the routine

Finally, back in our routine, following the same schema, we first build our tweets with this method:

```typescript title=src/routines/fetchAndPost.routine.ts
const buildTweet = (post: RedditPost): string => {
  const title =
    post.title.length < 100 ? post.title : `${post.title.substring(0, 100)}...`;
  const hashtags = '#LeagueOfLegends #ZoeMains';

  return `${post.flair}\n\n${title}\n\nby u/${post.author}\n\n${hashtags}\n${post.url}`;
};
```

Feel free to customize your own post to your needs, do not forget to add some hashtags for visiblity on Twitter.
We then define how to post on Twitter with a similar method:

```typescript title=src/routines/fetchAndPost.routine.ts
import { TwitterPoster } from '../twitter/TwitterPoster';

// ...

const postTweet = async (post: RedditPost): Promise<void> => {
  const poster = new TwitterPoster();
  const status = buildTweet(post);
  try {
    await poster.tweet(status);
    console.log(`  Successfully posted '${post.id}' to Twitter`);
  } catch (err) {
    console.error(`  Failed to post '${post.id}' to Twitter : ${err.message}`);
  }
};
```

We make sure the method is asyncrhonous and handles errors properly, before adding it to the routine itself:

```typescript title=src/routines/fetchAndPost.routine.ts
export const startFetchAndPostRoutine = async (
  delaySeconds: number,
  subreddit: string,
  discordClient: Client
): Promise<void> => {
  const fetchAndPost = async () => {
    const posts = await fetchPosts(subreddit, delaySeconds);

    posts.forEach(async post => {
      await postEmbed(post, ['675271307696406545'], discordClient);
      await postTweet(post);
    });
  };

  await fetchAndPost();
  setInterval(fetchAndPost, delaySeconds * 1000);
};
```

And voilà! Our Discord bot will now not only post the recent submissions from reddit on the server, but also on our Twitter account! It has now become a great automation tool for communities using different platforms, and letting everyone know what's up, no matter what they use.

---

_All this code is part of my ZoeBot3 project. You can find more infos on the [GitHub repo](https://github.com/prazdevs/zoebot3). If you encounter any issue, or have any question, let me know, I'd be more than happy to help!_
