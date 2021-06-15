import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  HStack,
  Flex,
  Stack,
  Spacer,
  Slide,
  IconButton,
  createIcon,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Author, MoreTab } from '@components/Icons';

// Navigation
const SideStrip = ({ onToggle }) => {
  return (
    <VStack w="80px" h="100vh" opacity="0.12" bg="#FFFFFF">
      <Button onClick={onToggle}>More</Button>
    </VStack>
  );
};

const SideBarToggle = createIcon({
  displayName: 'UpDownIcon',
  viewBox: '0 0 200 200',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M19 17l-5-5 5-5"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  ),
});

const SideTopBar = ({ onClose }) => {
  return (
    <Flex w="100%" h="64px">
      <HStack spacing={3}>
        <IconButton
          onClick={onClose}
          size="lg"
          variant="ghost"
          aria-label="expand collapse"
          icon={<SideBarToggle />}
        />
      </HStack>
      <Spacer />
      <HStack spacing={3} px={4}>
        <Button size="sm" variant="ghost" color="white" onClick={onClose}>
          Login
        </Button>
        <Button size="sm" color="white" bg="rgba(255, 255, 255, 0.16)">
          Sign Up
        </Button>
      </HStack>
    </Flex>
  );
};

const SideMenuButton = ({ children }) => (
  <Button variant="solid" bg="rgba(255, 255, 255, 0.16)" w="100%" color="white">
    {children}
  </Button>
);

const animationVariants = {
  open: { width: '100%' },
  closed: { width: 0 },
};

const SidebarContent = ({ onClose, isOpen }) => {
  return (
    <Flex direction="column" h="100vh" width={{ base: 'xs' }}>
      <SideTopBar onClose={onClose} />
      <Stack spacing={8}>
        <Stack px={6} py={8}>
          <SideMenuButton>Home</SideMenuButton>
          <SideMenuButton>About</SideMenuButton>
          <SideMenuButton>Contact</SideMenuButton>
        </Stack>
      </Stack>
    </Flex>
  );
};
const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

const LayoutSidebar = () => {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  return variants?.navigation === 'sidebar' ? (
    <motion.div
      style={{
        display: 'flex',
        width: 'auto',
        minWidth: '80px',
        maxWidth: '480px',
        background: `linear-gradient(180deg, #8472DF 0%, #7BCCFF 100%)`,
      }}
      animate={isOpen ? 'open' : 'closed'}
      variants={animationVariants}
      transition={{ type: 'spring', bounce: 0.25 }}
    >
      <SideStrip onClose={onClose} onToggle={onToggle} />
      {isOpen && (
        <SidebarContent onClose={onClose} isOpen={isOpen} onToggle={onToggle} />
      )}
    </motion.div>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="lg">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SideStrip onClose={onClose} onToggle={onToggle} />
            <SidebarContent
              onClose={onClose}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default LayoutSidebar;
