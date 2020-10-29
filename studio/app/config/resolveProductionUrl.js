/**
 * Function that will receive the full document that was selected for previewing.
 * The function must return a URL to your front end that is adapted to your front-ends URL structure.
 */
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
/**
 * For local dev we want 'localhost:3000', meaning we're also running the mediajams app too
 * For prod the url would be mediajams.dev
 * The studio has no separate development portal that'd you reach, only stage for dev, and prod.
 */
const projectUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://mediajams.dev'
    : 'http://localhost:3000';

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`;
}
