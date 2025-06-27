# Storyblok Chatbot

*This is a submission for the [Storyblok Challenge](https://dev.to/challenges/storyblok)*

## What I Built

I created an **AI-powered support chatbot** that integrates seamlessly into the **Storyblok Visual Editor**. It provides **real-time answers to FAQs** and content-related questions directly within the CMS interface — making it easier for content editors to work without switching tabs.

The chatbot fetches **live FAQ data from Storyblok** and uses **OpenRouter's Mistral 7B** to generate accurate, markdown-formatted responses in a conversational style.

# Demo
[https://storyblok-chatbot.vercel.app/](https://storyblok-chatbot.vercel.app/)

**Screenshots**  
<!-- Share a video demo of your project (preferred) or include screenshots here. -->
![Chatbot UI Screenshot](./screenshots/Demo (2))
![Visual Editor Integration](./screenshots/storyblok-sidebar.png)

## Tech Stack

- Frontend: React, Next.js, TailwindCSS
- CMS: Storyblok (Headless CMS)
- AI Integration: OpenRouter API (Mistral 7B)
- Deployment: Vercel
- Markdown Support: react-markdown
- UI Elements: Lucide Icons, Styled Input/Scroll components

### How I Used Storyblok

1. Used Storyblok to manage FAQ content dynamically via the `cdn/stories` API.
2. Integrated my chatbot into the Visual Editor using a custom sidebar plugin.
3. Built a wrapper HTML + iframe that loads the chatbot directly in the sidebar UI.
4. The chatbot fetches fresh FAQ entries from Storyblok for up-to-date, context-aware answers.


