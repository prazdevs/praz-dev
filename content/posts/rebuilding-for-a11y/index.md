---
title: Rebuilding my website for accessibility
date: 2020-11-09
tags: [storytime, a11y]
---

I recently decided to rebuild my website from scratch (apart from content) with accessibility in mind. I want to share with you why accessibility matters so much to me and how I implemented the features into my website, so you can spread the word and build your own as well!

## Why accessibility ?

### A personal story

I have (and had) people in my close family with physical disabilities (such as multiple sclerosis). Living with people with disabilities makes you realise that some facilities are not thought and built for them, making their lives harder than they are already. We see more and more work towards making new appartments and buildings accessible for people with physical disabilities, which is great. As I enjoy building things and try my hardest to make my apps a good experience for users, I started questionning myself about my apps: if I question facilities for their accessibility, how about my websites? Here is a fact: we, web developers, have an incredible power: creating experiences from nothing but code. But with great power, comes great responsibility. What are my apps if not everyone can use them equally?

### Fighting exclusion and ableism

Here is a word you may not know, but be familiar with without knowing it: ableism. What is it ? Ableism is the belief that a fully-functional body and mind are the norm for a human being. Said this way, it may already shock you, and I hope it does. While i won't go deep into what ableism is and where it comes from (and i will leave you a great article on [how ableism leads to innaccessibility](https://www.24a11y.com/2018/how-ableism-leads-to-inaccessibility/)), I want to emphasize on one thing: we have the power. The power to fight the "norm". It only belongs to us to choose where we draw the line. Since I was a child, as far as I remember, I could never handle injustice and inequality. I don't really know where it comes from, maybe family? Or my personal situation having ADD and so-called intellectual giftedness (that sets you apart as a child). What I'm sure of, is that I want to fight against it, and as a developer, I have the power to change things.

### What accessibility is to me

I'll start out by quoting someone that inspires me a lot with accessibility :

> Accessibility is a lifestyle and a culture.
> <cite>-- Marcy Sutton</cite>

And I could not agree more. For some companies regarding their product, accessibility just means being compliant with a set of defined rules. Accessibility is not about rules, it is about people. If you're making your apps "accessible" because you're being told to do so or because "we need to be compliant to sell the product", you may want to reconsider it. I have heard too many times things such as "disabled people are not in the target audience" or "it is not the priority, the client paid for the feature". And it ends up with shipping inaccessible features as a result of ableist thinking. But here is another take: one may need accessibility when they don't expect it. We can define different disabilities : permanent, temporary or situational. Thus, anyone can benefit form accessibility at any time. I recommend reading the [Inclusive Toolkit Manual](https://www.microsoft.com/design/inclusive/) from Microsoft, it is a great read with emphasis on empathy to learn what building for accessibility truly means. Here is a quote from it:

> Designing for inclusivity not only opens up our products and experience to more people with a wider range of abilities. It also reflects how people really are. All humans are growing, changing, and adapting to the world around them every day.

Nothing is set in stone. It is time to work towards a more inclusive and accessible web. Wether it already exists or is only yet defined by a bunch of specs, any project can be made more accessible. And I decided to apply that on my very own website.

## Rebuilding my website

Having spent a lot of time learning about accessibility, the need to apply the knowledge became too important. And the most obvious project came up to my mind: this website you are currently reading. It does represent me (and I do want it to) in many ways. I want it to be as inclusive as possible and I want everyone to be able to share with me about things that matter to me. Sharing is caring.

### Thinking ahead

I really like React. That's no surprise anymore. And I also really enjoy working with Gatsby. Gatsby is a great framework for static websites, and allows for great accessibility features. Javascript controlling our webpages is not the reasons of inaccessibility, it is our use of it that is. The great thing with static websites and static site generators, is that we are mostly building HTML. Good old HTML. I used it for the [previous version of my website](https://github.com/prazdevs/praz-dev-old) but this time, I had accessibility in mind from the beginning. Semantic HTML, and native HTML elements were my best friends to get started, here is some [documentation on that](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML). Every element and component I built, I looked into the rendered HTML. Every page that was generated, I ran some tools to help me through accessibility features, as well as navigating through it using keyboard and a screen reader. It takes a bit of time to get used to those added steps, until it becomes second nature. 

### A special mention to Chakra UI

I want to mention the UI framework behind my website: [Chakra UI](https://chakra-ui.com). Chakra is an absolutely amazing UI framework built by [Segun Adebayo](https://twitter.com/thesegunadebayo) with emphasis on accessibility. It allows to build "accessible React apps & websites with speed". The headline sure does not lie. Chakra provides all the base components you need to build complex components and pages through style-props. You also get a Theme provider and a ColorMode provider (this is what allows me to offer you a dark and a light theme). The theme can be easily extended and customised to your needs, colors and branding. Did I mention how great the documentation is? You will find anything you need to get the best value out of the library, with indications on accessibility on any components that can benefit them. Oh, and the community is great, anytime I had questions, there was always someone on the Discord to give me proper answers. If you are starting a React project and wanna build things fast, without the Sass hassle, and want to get some good a11y features out of the box, you should definitely try it.

### What now ?

Well, that was only the beginning of my accessibility journey. Rebuilding something that I was already proud of into something that really represents me. And I am not done with it yet: as I write this post, I have some features in mind that will soon come live on the website. I am still only started on learning but already spreading the word. You can expect some posts about accessibility in here. But moslty, I will never build an app without thinking about making it accessible in the first place. I don't want to straight up change everyone's way of thinking nor judge the current state of things. I do want people to realise it by themselves as it is the best way to getting them involved, and not only being spectators anymore.

---

_You can find all the source code of my website on its [GitHub repo](https://github.com/prazdevs/praz-dev), feel free to take inspiration from it, but do not hesitate to point things that could be improved (open a PR or reach to me!)._
