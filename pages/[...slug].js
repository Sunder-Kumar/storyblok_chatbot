import { useRouter } from 'next/router';
import Storyblok from '../lib/storyblok'; // Make sure you have Storyblok API setup
import ReactMarkdown from 'react-markdown';

export default function DynamicPage({ story }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>{story.name}</h1>
      <ReactMarkdown>{story.content.body}</ReactMarkdown>
    </main>
  );
}

export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join('/') : 'home';

  try {
    let { data } = await Storyblok.get(`cdn/stories/${slug}`, {
      version: 'draft'
    });

    return {
      props: {
        story: data.story
      },
      revalidate: 10
    };
  } catch (error) {
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}
