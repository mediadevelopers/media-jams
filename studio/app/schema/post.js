import userStore from 'part:@sanity/base/user';
import { GoFile } from 'react-icons/go';
import slugify from 'slugify';
import { isUniqueSlug } from '../lib/utils/isUniqueSlug';
import autoCompleteTags from '../components/autoCompleteTags';

/**
 * Defines a Media Jam
 * @typedef {Object} Post
 * @property {Object} post
 * @property {string} post.Title - title of media jam
 * @property {slug} post.Slug - unique value generated from the title
 * @property {Object} post.Author - reference to Auther
 * @property {boolean} post.featured - to flag an article as featured for specific styling or display
 * @property {Tag[]} post.Tags - reference to Tag. One to many relationship
 * @property {Category[]} post.Categories - reference to Categories. One to many relationship
 * @property {datetime} post.publishedAt - date media jam is published
 * @property {markdown} post.body - content of media supporting markdown
 */
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (fields.title.length > 0 && fields.slug?.current?.length <= 0)
        return "You've gotta have a slug to go with that awesome title!";
      return true;
    }),
  initialValue: async () => {
    const { name, id } = await userStore.getUser('me');
    const self = `${id}-self`;
    return {
      author: {
        _ref: self,
        _type: 'reference',
      },
    };
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [
        Rule.required()
          .min(10)
          .error('A title of min. 10 characters is required'),
        Rule.max(50).warning('Shorter titles are usually better'),
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
      options: {
        minRows: 20,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        slugify: slugify,
        isUnique: isUniqueSlug,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      readOnly: true,
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      inputComponent: autoCompleteTags,
      validation: (Rule) => Rule.required().min(1),
      of: [{ type: 'reference', to: { type: 'tag' } }],
      options: {
        layout: 'tags',
        isHighlighted: true,
      },
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
    },
    prepare(selection) {
      let media = GoFile;
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
        media,
      });
    },
  },
};
