---
title: Command and Factory patterns in a Discord bot with Typescript
date: 2020-02-24
tags: [node, typescript]
---

In my [previous post](https://praz.dev/deploying-bot-heroku/), we implemented a Discord bot using TypeScript and Discord.JS and hosted it on Heroku. The bot was quite simple to say the least. We usually want bots to be reactive and respond to "commands". If you have used Discord bots before, you probably know about `!play MySong` or `+role Green`. Those are commands, and it is time to add features to our bot with several of them. But here is the twist, since we work with TypeScript, we will implement those following some design patterns, allowing us to easily add more while keeping our code as clean as possible! We will add add 2 very simple commands: a `ping` command returning the latency of our bot with the discord server and a `say` command that will make the bot repeat what is passed as parameter before deleting our command message. It will be easy I promise, so bear with me.

## Commands

The command pattern is fairly simple: we encapsulate everything we need to perform an action in a "command", so we can later on verify is that action is doable, and trigger it. You may find more information on the pattern [here](https://sourcemaking.com/design_patterns/command).

### Abstract Command

Let's start by creating a simple abstract command, so we know what every command we add should look like. We need to be able to know if it can be executed as well as trigger its execution. So we have a class as as simple as that:

```typescript title=src/commands/Command.ts
export enum CommandType {
  ping,
  say,
}

export abstract class Command<CommandType> {
  abstract async execute(): Promise<void>;
  abstract canExecute(): boolean;
}
```

Wait, what is that `<CommandType>` thing? We will later implement a way to create those commands from Discord messages, and we want to know exactly which commands are allowed and how they should be created, so we define them in an `enum` passed as the generic type of the command.

The class is abstract because it is our blueprint, therefore, the methods are also abstract.

### Ping Command

Now that we have our blueprints, let's start building the actual commands with the `Ping` one. The `Client` object from Discord.JS holds a `ping` property giving the value of our bot's latency with the server. A `Message` will be the receiver of that command as it will call its `channel`'s `send` method to respond to the user. Here is our command:

```typescript title=src/commands/Ping.command.ts
import { Client, Message } from 'discord.js';

import { Command, CommandType } from './Command';

export class PingCommand extends Command<CommandType.ping> {
  constructor(private message: Message, private client: Client) {
    super();
  }

  async execute(): Promise<void> {
    if (this.canExecute()) {
      try {
        await this.message.channel.send(`My latency is ${this.client.ping}ms`);
      } catch (err) {
        console.error(`Could not execute command Say. Error: ${err.message}`);
      }
    }
  }

  canExecute(): boolean {
    return true;
  }
}
```

We extend Command with the type set to `ping`, and pass what we need to the constructor: the `Message` containing the Discord command and the `Client` holding its ping value. And then, we simply implements our methods:

- `canExecute` ensures we have the rights to execute the command. We want everyone to be able to check the bot's ping so we set it to return `true`.

- `execute` proceeds to executing the action. It calls on the `Message` receiver to send back the ping to the channel. Since we do asynchronous work, the call is awaited, and errors are caught in a `try/catch` block.

We can now repond to a message with the latency. Interesting... While we are implementing the commands, let's also implement the `Say` command before deciding what should trigger them.

### Say Command

Following the exact same schema, we can implement the following:

```typescript title=src/commands/Say.command.ts
import { Message } from 'discord.js';

import { Command, CommandType } from './Command';

export class SayCommand extends Command<CommandType.say> {
  constructor(private message: Message, private args: string[]) {
    super();
  }

  async execute(): Promise<void> {
    if (this.canExecute()) {
      try {
        await this.message.channel.send(this.args.join(' '));
        await this.message.delete();
      } catch (err) {
        console.error(`Could not execute command Say. Error: ${err.message}`);
      }
    }
  }

  canExecute(): boolean {
    return this.message.member.hasPermission('ADMINISTRATOR');
  }
}
```

It might seem a little more complex at first but it really is not. The receiver remains the same: a `Message`. The other argument `args` is simply the message minus our command keyword. When we type `say hello world` in Discord, `say` is our keyword and `args` becomes the array containing the rest of the message, in that case `args = ['hello','world]`.
Our methods now implement as follows:

- `canExecute` ensures only server administrators can run the command. We don't want everyone to be able to make our bot type! `hasPermission` takes a `PermissionResolvable` object, you can read about it [in the documentation](https://discord.js.org/#/docs/main/stable/typedef/PermissionResolvable).

- `execute` takes our arguments, rebuilds a sentence and send it as a message on the channel. It then proceeds to delete the message text sent by the user calling the command. Again we carefully protect our call with a `try/catch` block.

We can now make our bot look like it just typed by itself! That can be of great use to display our guild's rules or raid planning!

But wait a minute; how do we intercept the "say" or "ping" keywords from messages and create our commands? It is time to industrialize the command creation with a Factory pattern!

## Factory

We want to build commands from Discord messages, luckily, as we did earlier with our very basic first version of the bot, we can intercept messages from Discord text channels thanks to an event handler. But let's first try to create our commands from just a `Message` intercepted by the event handler. For that, we will use the Factory design pattern and build a command factory, it should parse a message and generate the appropriate `Command` then try to execute it.

```typescript title=src/commands/CommandFactory.ts
import { Client, Message } from 'discord.js';

import { Command, CommandType } from './Command';
import { PingCommand } from './Ping.command';
import { SayCommand } from './Say.command';

export class CommandFactory {
  constructor(private client: Client, private prefix: string) {}

  createCommand(message: Message): Command<CommandType> | null {
    const [keyword, args] = this.parseCommand(message.content);

    switch (keyword) {
      case CommandType.say:
        return new SayCommand(message, args);

      case CommandType.ping:
        return new PingCommand(message, this.client);

      default:
        return null;
    }
  }

  private parseCommand(messageContent: string): [CommandType, string[]] {
    const args = messageContent
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g);
    const keyword = args.shift()?.toLowerCase() ?? '';
    const commandType =
      CommandType[keyword as keyof typeof CommandType] ?? null;
    return [commandType, args];
  }
}
```

Let's break that one down together.

### Parsing & creating the command

A command message sent in a Discord channel should look like this: `{prefix}{keyword} {arguments}`.

- The prefix is what will differentiate our bot to potential other bots on the server. We don't want 3 bots answering to a single command.
- The keyword is the action we want the bot to execute (such as our "say" and "ping").
- The arguments are optional arguments as explained in the "say" command.

The factory only knows of the client and the prefix it should based its parsing on, those values are passed to the constructor as private.

The private method `parseCommand` takes the content of a Discord `Message`. It first removes the silces the prefix out, we won't need it anymore. Then it splits the whole message into an array of string. The first element of that array is our keyword, fetched by the second expression, affected to `keyword` using `shift`. We lowercase that value to eventually match the Enum.

The next line is interesting: `CommandType[keyword as keyof typeof CommandType]`. We try to cast our keyword as a key of CommandType, and get its enum value. It returns `null` if it cannot cast to an existing value of `CommandType`; we do not want an `undefined` value as they are supposed to be unexpected. I personally find it oddly satisfying. We now have a tuple with the CommandType (or null) and arguments.

In our `createCommand` method, we directly parse the command with the previously explained `parseCommand`. Then we `switch` on the possible values of our `CommandType` enum, if the `keyword` value is not implemented, we return null, no command is created. We can finally rework our message handler in our `DiscordBot`.

### Calling the factory and handling commands

Let's head back to our `DiscordBot` class and give it a `CommandFactory`.

```typescript title=src/commands/CommandFactory.ts
import { CommandFactory } from './commands/CommandFactory';

//...

export class DiscordBot {
  //...

  private prefix: string = 'z!';
  private commandFactory: CommandFactory = new CommandFactory(
    this.client,
    this.prefix
  );

  //...
}
```

Then we refactor our `setMessageHandler` to handle messages and react to commands.

```typescript title=src/commands/CommandFactory.ts
//...

private setMessageHandler(): void {
    this.client.on('message', async (message: Message) => {
      //* filters out requests from bots and other prefixes
      if (message.author.bot) return;
      if (message.content.indexOf(this.prefix) !== 0) return;

      //* delegates creation to factory & executes
      const command = this.commandFactory.createCommand(message);
      await command?.execute();
    });
  }

//...
```

Our new handler does quite a few things. First, it automatically ignores messages from other bots, we're not trying to make an AI discussion, are we? Second, it also ignores messages that do not contain our prefix, i.e. messages aimed at other bots. Finally it tries to create a command, then tries to execute it if the creation was a success.

Adding a new command would simply require you to add its value to the enum, create the corresponding commad class (extending the abstract one) and define its action(s) and permissions policy, and add it to the factory switch. We now have a Discord bot that doesn't care about what commands it can execute, but delegates it to a factory!

And that's all folks! Time to commit our code and push it to Heroku to try our new commands. That one was a bit tricky but really satisfying, I hope you appreciate it!

---

_All this code is part of my ZoeBot3 project. You can find more infos on the [GitHub repo](https://github.com/prazdevs/zoebot3). If you encounter any issue, or have any question, let me know, I'd be more than happy to help!_
