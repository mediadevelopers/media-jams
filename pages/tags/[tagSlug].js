import 'tippy.js/dist/tippy.css';
import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';

import Layout from '@components/Layout';
import JamCardList from '@components/JamCardList';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery, useJamTag } from '@hooks/useJams';
import { useTags } from '@hooks/useTags';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

export default function Tag({ tagSlug }) {
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const { data } = useJamTag(tagSlug);
  const { jams, tag } = data || {};

  return (
    <Layout>
      <Box w="100%" height="100%" overflowY="auto">
        <Flex direction="column" w="100%">
          <Flex
            w={{ base: '90%', lg: '884px' }}
            mt="26px"
            mb="50px"
            alignSelf="center"
            h="100%"
            direction="column"
            justify="space-around"
            sx={{ gap: '24px' }}
          >
            <Heading as="h2" fontSize="42" color="blue.800" my="8">
              <Text
                fontSize="inherit"
                fontWeight="black"
                as="span"
                color="secondary.600"
              >
                {tag.title}
              </Text>
              {` `}
              Jams
            </Heading>

            {jams && <JamCardList jams={jams} columns={jamListColumns} />}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { tagSlug } = params;
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(['jamTag-slug', tagSlug], () =>
    queryJams.getJamsByTagSlug(params.tagSlug),
  );
  await queryClient.setQueryData(['jamTag-slug', tagSlug], (old) => old);

  return {
    props: {
      tagSlug,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  const { data = {} } = queryClient.getQueryData('jamTags');
  const { tags } = data;

  const paths = tags.map(({ title, slug }) => {
    return {
      params: {
        tagSlug: slug?.current || encodeURIComponent(title), // hack to get all paths to compile for now
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
