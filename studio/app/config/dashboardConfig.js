import { getCurrentUser$ } from '../lib/user';
const { id } = getCurrentUser$();
export default {
  widgets: [
    {
      name: 'sanity-tutorials',
    },
    {
      name: 'airtable-list',
    },
    {
      name: 'my-jams-list',
      options: {
        title: 'My Jams',
        createButtonText: 'Create new Jam',
        types: ['post'],
      },
    },
  ],
};
