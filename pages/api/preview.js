import { postBySlug } from '../../lib/api';
import { withSentry } from '@sentry/nextjs';

export default withSentry(async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await postBySlug(req.query.slug, true);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  const redirectLocation = req.query?.media
    ? `/post/media/${post.slug}/${post._id}`
    : `/post/${post.slug}`;
  console.log('media', req.query?.media, redirectLocation);
  // Redirect to the path from the fetched post
  res.writeHead(307, { Location: redirectLocation });
  res.end();
});
