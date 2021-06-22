import React from 'react';
import { useQuery } from 'react-query';
import { tags as queryTags } from '@lib/queries/tags';

import { Button, Flex, Text, useToken } from '@chakra-ui/react';

function TagButton({
  tag,
  addTag,
  removeTag,
  selectedFilters,
  children,
  ...rest
}) {
  const isTagSelected = selectedFilters.some(
    (selected) => selected.title === tag.title,
  );
  return (
    <Button
      _hover={{
        background: useToken('colors', 'primary.200'),
        color: useToken('colors', 'primary.800'),
      }}
      padding={{ lg: '2px 6px' }}
      minW={{ base: '' }}
      bg={() => (!isTagSelected ? 'grey.200' : 'primary.200')}
      color={() => (!isTagSelected ? 'grey.800' : 'primary.800')}
      borderRadius="4px"
      onClick={() => (isTagSelected ? removeTag(tag) : addTag(tag))}
      height="auto"
      {...rest}
    >
      <Text variant="B300" fontWeight="500">
        {children}
      </Text>
    </Button>
  );
}

function ToggleTagListButton({ children, onClick, ...rest }) {
  return (
    <Button
      _hover={{
        border: 'none',
        background: 'none',
        textDecoration: 'underline',
      }}
      onClick={onClick}
      borderRadius="4px"
      border="none"
      bg="none"
      color="primary.700"
      ml={{ base: '20px', md: 0 }}
      _focus={{ outline: 'none' }}
      {...rest}
    >
      <Text variant="B300">{children}</Text>
    </Button>
  );
}

function Tags({ selectedFilters, addTag, removeTag }) {
  const [showMore, setShowMore] = React.useState(false);
  const [featuredTags, setFeaturedTags] = React.useState([]);
  const { data } = useQuery('jamTags', queryTags.get);

  let collectedFeaturedTags = [];
  React.useEffect(() => {
    if (data.tags) {
      data.tags.map((tag) => tag.featured && collectedFeaturedTags.push(tag));
      setFeaturedTags(collectedFeaturedTags);
    }
  }, [data]);

  return (
    <Flex
      w="100%"
      justify={{ base: '', lg: 'space-around' }}
      align="center"
      flexWrap={{ base: 'nowrap', lg: 'wrap' }}
      _after={{ content: "''", flex: 'auto' }}
      sx={{ gap: '4px' }}
      overflowX="scroll"
    >
      <Text variant="B300" color={useToken('colors', 'grey.900')}>
        Topics:
      </Text>
      {showMore
        ? data.tags.map((tag) => (
            <TagButton
              tag={tag}
              addTag={addTag}
              removeTag={removeTag}
              selectedFilters={selectedFilters}
            >
              {tag.title}
            </TagButton>
          ))
        : featuredTags.map((tag) => (
            <TagButton
              tag={tag}
              addTag={addTag}
              removeTag={removeTag}
              selectedFilters={selectedFilters}
            >
              {tag.title}
            </TagButton>
          ))}

      {!showMore ? (
        <ToggleTagListButton onClick={() => setShowMore(true)}>
          Show More
        </ToggleTagListButton>
      ) : (
        <ToggleTagListButton onClick={() => setShowMore(false)}>
          Show Less
        </ToggleTagListButton>
      )}
    </Flex>
  );
}

export default function TagFilters({
  selectedFilters,
  setSelectedFilters,
  addTag,
  removeTag,
  clearAllTags,
}) {
  return (
    <Flex
      w="100%"
      mt="22px"
      align="center"
      justify="space-between"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex w={{ base: '100%', lg: '70%' }}>
        <Tags
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </Flex>
      <Button onClick={clearAllTags} alignSelf="flex-start">
        x Clear all tags
      </Button>
    </Flex>
  );
}
