import { Box, Flex, useColorMode } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

const SiteLayout = ({ children }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.100', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };

  return (
    <Box w="100%" minH="100%">
      <Flex width="100%" flexDir="column" height="100vh">
        <Navbar />

        <Box flex="1 0 auto" bg={bgColor[colorMode]} color={color[colorMode]} transform="translateZ(0)">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default SiteLayout;
