import React from 'react';
import {
  HStack,
  Button,
  Flex,
  Image,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import { FaHome, FaPhotoVideo } from 'react-icons/fa';

import { Link as NextLink } from 'next/link';

import { useImage } from 'use-cloudinary';

export default function SideNav() {
  const { generateImageUrl } = useImage('mediadevs');

  const logoConfig = {
    delivery: {
      publicId: 'mediajams/logo',
    },
    transformation: {
      height: 0.6,
    },
  };

  return (
    <Flex
      w={80}
      direction="column"
      borderRadius="lg"
      boxShadow="5px 3px 10px -7px rgba(0,0,0,1)"
      minH="100vh"
      backgroundColor="blue.200"
    >
      <Flex
        w="100%"
        direction="column"
        height={100}
        background="grey.900"
        justifyContent="space-between"
        borderTopRightRadius="3px"
      >
        <Flex justifyContent="space-between" mt={3}>
          <Image alt="MediaJams logo" src={generateImageUrl(logoConfig)} />
          <HStack spacing="2">
            <Button
              size="sm"
              colorScheme="blue"
              as={NavLink}
              isButton
              href="/api/auth/login"
            >
              Log In
            </Button>
            <Text fontSize="md" mr={5} color="blue.400" as="u">
              Sign Up
            </Text>
          </HStack>
        </Flex>
      </Flex>
      <NavLinkGroup />
    </Flex>
  );
}

function NavLink({ children, isButton, ...props }) {
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
