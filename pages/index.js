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
import JamCardCollage from '@components/JamCardCollage';
import Banner from '@components/Banner';
import Search from '@components/Search';
import {
  GreenCheck,
  Author,
  Close,
  Stack,
  Code,
  Mashups,
  Video,
  Pencil,
} from '@components/Icons';
import MediaJams from '@components/MediaJams';
import MediaJar from '@components/MediaJar';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import { useTags } from '@hooks/useTags';
import { useSearch } from '@components/SearchProvider';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 3,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', ['author', 'name']],
};

const JAMS_TO_SHOW = 10;

export default function Dashboard() {
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const {
    state: { searchValue, selectedTagFilters, filteredJams },
    handleFilter,
    updateSearchValue,
  } = useSearch();

  const { data: allJams, isLoading: isLoadingJams } = useJamsQuery();
  const { data: featuredJams, isLoading } = useFeaturedJamsQuery();
  const {
    data: { tags },
  } = useTags();

  const featuredTags = tags.filter(({ featured }) => featured);

  console.log('tags', tags);
  console.log('featuredTags', featuredTags);

  const standardJams = allJams?.jams
    .filter((j) => !j.postMetadata.featured)
    .slice(0, JAMS_TO_SHOW);

  // React.useEffect(() => {
  //   // do some checking here to ensure data exist
  //   if (isLoadingJams === false && allJams?.jams) {
  //     handleFilter(allJams?.jams);
  //     loadMoreJams();
  //   }
  // }, [isLoadingJams, allJams]);

  // handle updating the filteredPosts with different search criteria
  // React.useEffect(() => {
  //   if (searchValue === '' && selectedTagFilters.length === 0) {
  //     handleFilter(allJams?.jams);
  //   } else {
  //     // Allow for a search for tag
  //     const formattedTags = selectedTagFilters.map((item) => item.title);

  //     const queries = {
  //       $or: [
  //         {
  //           title: searchValue,
  //         },
  //         {
  //           $path: ['author.name'],
  //           $val: searchValue,
  //         },
  //         {
  //           $path: ['tags.title'],
  //           $val: searchValue,
  //         },
  //       ],
  //       $and: [],
  //     };

  //     // Add an $and with the tag title if we have an active topic

  //     if (formattedTags.length > 0) {
  //       formattedTags.forEach((tag) => {
  //         queries.$and.push({
  //           $path: 'tags.title',
  //           $val: `'${tag}`, // the ' in front adds exact match
  //         });
  //       });
  //     }
  //     async function initFuse() {
  //       const Fuse = (await import('fuse.js')).default;
  //       const fuse = new Fuse(allJams?.jams, fuseOptions);
  //       const results = fuse.search(queries).map((result) => result.item);

  //       handleFilter(results);
  //     }
  //     initFuse();
  //     // routerPushTags({ tags: selectedFilters.map((f) => f.title).join(',') });
  //   }
  // }, [searchValue, selectedTagFilters, isLoadingJams]);

  return (
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
          <Box
            py={{
              base: 12,
              xl: 32,
            }}
          >
            <Flex
              alignItems="center"
              flexDirection={{
                base: 'column',
                xl: 'row',
              }}
              mx={{
                base: 0,
                md: 0,
                lg: 0,
                xl: -10,
                '2xl': -20,
              }}
            >
              <Flex
                width={{
                  base: '100%',
                  xl: '50%',
                }}
                alignItems={{
                  base: 'center',
                  xl: 'flex-start',
                }}
                flexDirection="column"
                flexGrow="0"
                flexShrink="0"
                pr="2"
              >
                <MediaJams width="24em" mb="4" />
                <Text fontSize="34" fontWeight="bold">
                  Learn media with easy to follow guides and examples
                </Text>
              </Flex>
              <Box
                width="50%"
                width={{
                  base: '80%',
                  md: '70%',
                  lg: '60%',
                  xl: '50%',
                }}
                flexGrow="0"
                flexShrink="0"
                transform={{
                  base: 'scale(1.5)',
                  xl: 'scale(1.5) translate3d(12%, 0, 0)',
                }}
                pt={{
                  base: 32,
                  xl: 0,
                }}
                pb={{
                  base: 24,
                  xl: 0,
                }}
              >
                <JamCardCollage jams={featuredJams?.jams.slice(0, 3)} />
              </Box>
            </Flex>
          </Box>

          <Heading as="h2" fontSize="42" color="blue.800" mt="4">
            Discover Jams
          </Heading>

          <Search
            searchValue={searchValue}
            setSearchValue={updateSearchValue}
          />

          <Box>
            <SimpleGrid
              as={List}
              templateColumns={{
                base: 'repeat(6, 310px)',
                lg: 'repeat(3, minmax(0, 310px))',
              }}
              spacing="4"
            >
              {featuredTags.slice(0, 3).map((tag) => {
                return (
                  <ListItem
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    color="white"
                    backgroundColor="blue.800"
                    borderRadius="md"
                    py="6"
                  >
                    <ListIcon as={Stack} fontSize="28" />
                    <Text fontSize="18" fontWeight="bold" mt="3">
                      {tag.title}
                    </Text>
                  </ListItem>
                );
              })}
            </SimpleGrid>
          </Box>

          <Banner />

          <Flex alignItems="center" mt="8">
            <Box
              flexGrow="1"
              pr={{
                md: '2em',
              }}
            >
              <Heading as="h2" fontSize="24" mb="4" color="blue.800">
                Set up an account to unlock more learning resources!
              </Heading>
              <Text>
                <Button colorScheme="blue" px="6">
                  Sign Up
                </Button>
              </Text>
            </Box>
            <Box>
              <List spacing="4">
                <ListItem fontSize="20" whiteSpace="nowrap">
                  <ListIcon as={GreenCheck} color="green.500" />
                  Create notes right in the app
                </ListItem>
                <ListItem fontSize="20" whiteSpace="nowrap">
                  <ListIcon as={GreenCheck} color="green.500" />
                  Bookmark your favorite jams
                </ListItem>
                <ListItem fontSize="20" whiteSpace="nowrap">
                  <ListIcon as={GreenCheck} color="green.500" />
                  Return to your recent jams
                </ListItem>
              </List>
            </Box>
            <Box
              pl={{
                md: '3em',
              }}
            >
              <MediaJar width="32" height="auto" />
            </Box>
          </Flex>

          <Heading as="h2" fontSize="42" color="blue.800" mt="8">
            Latest Jams
          </Heading>

          <JamCardList jams={standardJams} columns={jamListColumns} />
        </Flex>
      </Flex>
    </Box>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  await queryClient.setQueryData('jamTags', (old) => ({ tags: old.tags }));
  await queryClient.fetchQuery('featuredJams', queryJams.getStaticFeaturedJams);
  await queryClient.setQueryData('featuredJams', (old) => ({
    jams: old.data.jams,
  }));
  await queryClient.fetchQuery('allJams', queryJams.getStatic);
  await queryClient.setQueryData('allJams', (old) => ({ jams: old.data.jams }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
