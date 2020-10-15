import S from '@sanity/desk-tool/structure-builder';
import { GoPencil, GoPerson, GoEye, GoTextSize } from 'react-icons/go';
import userStore from 'part:@sanity/base/user';
import { filter, map, switchMap } from 'rxjs/operators';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import IframePreview from '../components/iframePreview';
import CreatorEditor from '../components/creatorEditor';
import { getCurrentUser$ } from '../lib/user';

const CREATOR_DOCUMENTS_QUERY = `
* [_type == $type  && author._ref == $userId ] 
`;

const CREATOR_AUTHOR_QUERY = `
 *[_type == $type && _id == $userId]
`;

export const creatorListItems = [
  // Show only posts authored by current_user
  S.listItem({
    id: 'posts-by-author',
    title: 'My Jams',
    icon: GoPencil,
    schemaType: 'post',
    child: async () => {
      const { name, id } = await userStore.getUser('me');
      const self = `${id}.self`;
      return S.documentTypeList('post')
        .title('Jams')
        .filter('_type == $type && author._ref == $authorId')
        .params({ type: 'post', authorId: self })
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType('post')
            .views([
              S.view.form().icon(GoTextSize).title('Editor'),
              S.view.component(IframePreview).icon(GoEye).title('Web Preview'),
            ]),
        );
    },
  }),
  S.listItem()
    .title('Author Profile')
    .icon(GoPerson)
    .child(() => {
      return getCurrentUser$().pipe(
        map(({ id }) => {
          return S.editor().schemaType('author').documentId(`${id}.self`);
        }),
      );
    }),
];
