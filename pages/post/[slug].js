import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import { postBySlug, postsWithSlug } from 'lib/api';

import Code from '@components/Code';
import CodeSandbox from '@components/CodeSandbox';
import Layout from '@components/Layout';

const components = { code: Code, iframe: CodeSandbox };

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return null;
  }
  const content = hydrate(post.content, { components });

  return (
    <Layout>
      <h1>{post.title}</h1>
      {content}
    </Layout>
  );
}

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const posts = await postsWithSlug();
  return {
    paths:
      posts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params: { slug }, preview = false }) => {
  console.log(`Loading post content, preview mode is ${!!preview}`);
  const { title, body, slug: slug_current, tags = null } = await postBySlug(
    slug,
    preview,
  );

  const mdx = await renderToString(body, { components }, null);
  return {
    props: {
      preview,
      post: {
        content: mdx,
        title: title,
        slug: slug_current,
        tags,
      },
    },
  };
};
