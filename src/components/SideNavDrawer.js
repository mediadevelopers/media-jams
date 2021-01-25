import React from 'react';
import { Link as NextLink } from 'next/link';
import {
  HStack,
  Button,
  Flex,
  Image,
  Link,
  Icon,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { FaHome, FaPhotoVideo } from 'react-icons/fa';

import { useImage } from 'use-cloudinary';

export default function SideNavDrawer({ isOpen, onClose }) {
  const { generateImageUrl } = useImage('mediadevs');

  const logoConfig = {
    delivery: {
      publicId: 'mediajams/logo',
    },
    transformation: {
      height: 0.7,
    },
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Flex
            w="100%"
            direction="column"
            height={100}
            borderBottom="2px solid black"
            background="grey.900"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between" mt={2}>
              <Image
                alt="MediaJams logo"
                ml={2}
                src={generateImageUrl(logoConfig)}
              />
              <HStack spacing="2">
                <Button colorScheme="blue">Log In</Button>
                <Text mr={5} color="blue.400" as="u">
                  Sign Up
                </Text>
              </HStack>
            </Flex>
          </Flex>
          <NavLinkGroup />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      as={NextLink}
      display="flex"
      _hover={{ boxShadow: 'inset 0px -1px 58px -16px rgba(36,33,33,1)' }}
      p="10px"
      minW="90%"
      borderRadius="12px"
      display="flex"
      alignItems="center"
      mb={2}
      {...props}
    >
      {children}
    </Link>
  );
}

function NavLinkGroup() {
  return (
    <Flex mt={4} direction="column" alignItems="center">
      <NavLink href="/dashboard">
        <Icon as={FaHome} size="md" mr={2} />
        Dashboard
      </NavLink>
      <NavLink href="/post">
        <Icon as={FaPhotoVideo} size="md" mr={2} />
        Jams
      </NavLink>
    </Flex>
  );
}
