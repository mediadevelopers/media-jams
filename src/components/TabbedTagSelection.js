import React from 'react';

import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Wrap,
  Button,
  Text,
} from '@chakra-ui/core';

import { FaHashtag } from 'react-icons/fa';

export default function TabbedTagSelection({
  tabs,
  addTag,
  removeTag,
  searchTags,
}) {
  console.log(searchTags);
  function Panels({ tabs }) {
    return (
      <TabPanels>
        {tabs.map((category) => (
          <TabPanel>
            {category.tags?.length >= 1 ? (
              <Wrap>
                {category.tags.map((tag) => (
                  <Button
                    key={tag.title}
                    onClick={() =>
                      searchTags.some((selected) => selected === tag)
                        ? removeTag(tag)
                        : addTag(tag)
                    }
                    variant={
                      searchTags.some((selected) => selected === tag)
                        ? 'solid'
                        : 'outline'
                    }
                    colorScheme={
                      searchTags.some((selected) => selected === tag)
                        ? 'teal'
                        : null
                    }
                    rightIcon={<FaHashtag />}
                  >
                    {tag}
                  </Button>
                ))}
              </Wrap>
            ) : (
              <Text>No tags yet</Text>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    );
  }

  return (
    <Tabs>
      <TabList mb="1em">
        {tabs.map((tab) => (
          <Tab key={tab.id}>{tab.title}</Tab>
        ))}
      </TabList>
      <Panels tabs={tabs} />
    </Tabs>
  );
}
