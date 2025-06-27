import axios from 'axios';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});

export async function getFaqContent() {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

  const res = await axios.get('https://api.storyblok.com/v2/cdn/stories', {
    params: {
      starts_with: 'faq/',
      version: 'draft',
      token,
    },
  });

  const stories = res.data.stories;

  return stories.map((story) => ({
    title: story.content.title,
    body: story.content.body?.content?.map((c) => c.content?.[0]?.text || '').join('\n') || '',
  }));
}
