import React, { useState } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // Image,
  // InputGroup,
  // Icon,
  // Input,
  // InputLeftElement,
  Link as ChakraLink,
  Switch,
  // Heading,
  // useDisclosure
  // Button
  Text,
  useColorMode
} from '@chakra-ui/react';
import { MAX_CONTAINER_WIDTH } from '../constants';
import {
  FaHome,
  // FaTwitterSquare,
  // FaFacebookSquare,
  // FaInstagramSquare,
  // FaLinkedin,
  FaChevronDown
} from 'react-icons/fa';
import Sticky from 'react-stickynode';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TeamsQuery = gql`
  query TeamsQuery {
    teams {
      id
      shortName
      slug
    }
  }
`;

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const { data = {} } = useQuery(TeamsQuery);
  // const [searchQuery, setSearchQuery] = useState('');
  const { teams = [] } = data;
  const router = useRouter();
  const { pathname } = router;
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  // const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.keyCode === 13) {
  //     const params = new URLSearchParams();

  //     params.append('q', searchQuery);

  //     // history.push(`/search?${params.toString()}`);
  //   }
  // };

  return (
    <Box as="nav" color="brand" bg="white" flexShrink={0}>
      {/* <Box maxW={MAX_CONTAINER_WIDTH} mx="auto" py={3} px={3}>
        <Flex align="center" justify="space-between" wrap="wrap">
          <Flex alignItems="center">
            <Box>
              <Link href="/">
                <Image
                  src="/images/logo/original/logo-transparent.png"
                  alt="logo"
                  title="logo"
                  ignoreFallback
                  height={75}
                />
              </Link>
            </Box>

            <Box pl={3} maxW="300px" display={{ xs: 'none', md: 'block' }}>
              <Heading
                as="h1"
                fontSize="lg"
                color="blue.800"
                lineHeight="1.25em"
                fontWeight="normal"
                fontFamily="SpecialElite"
              >
                Stay up to date with everything L.A. sports
              </Heading>
            </Box>
          </Flex>

          <Box flex="0 1 260px">
            <Flex fontSize="2xl" color="blue.700" mb={3} justifyContent="flex-end">
              <Link href="https://twitter.com/SportsHubLA" isExternal title="Twitter">
                <Box mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaTwitterSquare />
                </Box>
              </Link>

              <Link href="https://www.facebook.com/sportshubla" isExternal title="Facebook">
                <Box mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaFacebookSquare />
                </Box>
              </Link>

              <Link href="https://www.instagram.com/sportshubla" isExternal title="Instagram">
                <Box mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaInstagramSquare />
                </Box>
              </Link>

              <Link href="https://www.linkedin.com/company/sportshubla" isExternal title="Linkedin">
                <Box mr={2} _hover={{ color: 'blue.500' }} transition="color 0.5s ease">
                  <FaLinkedin />
                </Box>
              </Link>
            </Flex>

            <InputGroup size="sm">
              <InputLeftElement children={<Icon name="search" color="gray.400" size="15px" />} />
              <Input
                placeholder="Search articles, videos, tweets..."
                bg="gray.200"
                rounded="md"
                _focus={{ bg: 'white', border: '1px', borderColor: 'blue.700' }}
                onChange={onChange}
                onKeyDown={keyPress}
              />
            </InputGroup>
          </Box> 
        </Flex>
      </Box> */}

      <Sticky enabled innerZ={1000}>
        <Box bg="brand" w="100%" overflowX="hidden">
          <Flex color="white" maxW={MAX_CONTAINER_WIDTH} mx="auto" px={3}>
            <Link href="/">
              <Box
                as={ChakraLink}
                px={3}
                py={3}
                mr={1}
                fontSize="lg"
                height="45px"
                display="flex"
                alignItems="center"
                _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                {...(pathname === `/` ? { borderColor: 'blue.700', bg: 'blue.700' } : {})}
              >
                <FaHome />
              </Box>
            </Link>

            {/* Mobile */}
            <Box display={{ base: 'block', md: 'none' }}>
              <Menu autoSelect={false}>
                <MenuButton
                  px={3}
                  py={3}
                  display="flex"
                  alignItems="center"
                  _focus={{ outline: 0, boxShadow: 'outline' }}
                >
                  <Flex align="center">
                    Teams
                    <Box pl={1} fontSize="10px" mb="-2px">
                      <FaChevronDown />
                    </Box>
                  </Flex>
                </MenuButton>

                <MenuList bg="brand">
                  {teams.map(team => {
                    const teamIsSelected = pathname === `/teams/${team.slug}`;

                    return (
                      <Link key={team.id} href={`/teams/${team.slug}`}>
                        <MenuItem
                          as={ChakraLink}
                          _hover={{ borderColor: 'blue.700', bg: 'blue.700', color: 'blue.700' }}
                          {...(teamIsSelected ? { borderColor: 'blue.700', bg: 'blue.700' } : {})}
                        >
                          {team.shortName}
                        </MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              </Menu>
            </Box>

            {/* Non-Mobile */}
            <Box
              display={{ base: 'none', md: 'flex' }}
              width={{ sm: 'full', lg: 'auto' }}
              alignItems="center"
              flexGrow={1}
              flexWrap="wrap"
            >
              {teams.map(team => {
                const teamIsSelected = pathname === `/teams/${team.slug}`;

                return (
                  <Link key={team.id} href={`/teams/${team.slug}`}>
                    <Box
                      as={ChakraLink}
                      px={2}
                      py={3}
                      height="45px"
                      display="flex"
                      alignItems="center"
                      _hover={{ borderColor: 'blue.700', bg: 'blue.700', textDecor: 'none' }}
                      {...(teamIsSelected ? { borderColor: 'blue.700', bg: 'blue.700' } : {})}
                    >
                      {team.shortName}
                    </Box>
                  </Link>
                );
              })}
            </Box>

            <Flex ml="auto">
              <Flex align="center">
                <Text pr={2}>Dark Mode:</Text> <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
              </Flex>
            </Flex>

            {/* <Box ml="auto">
              <Flex>
                <Link to="/articles">
                  <Box
                    px={2}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                    {...(location.pathname === `/articles`
                      ? { borderColor: 'blue.700', bg: 'blue.700', color: '#fff' }
                      : {})}
                  >
                    Articles
                  </Box>
                </Link>

                <Link to="/videos">
                  <Box
                    px={2}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                    {...(location.pathname === `/videos`
                      ? { borderColor: 'blue.700', bg: 'blue.700', color: '#fff' }
                      : {})}
                  >
                    Videos
                  </Box>
                </Link>

                <Link to="/tweets">
                  <Box
                    px={2}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                    {...(location.pathname === `/tweets`
                      ? { borderColor: 'blue.700', bg: 'blue.700', color: '#fff' }
                      : {})}
                  >
                    Tweets
                  </Box>
                </Link>

                <Button onClick={onOpen} variant="link">
                  <Box
                    px={2}
                    py={3}
                    height="45px"
                    display="flex"
                    alignItems="center"
                    color="gray.400"
                    fontWeight="normal"
                    fontSize="sm"
                    _hover={{ borderColor: 'blue.700', bg: 'blue.700' }}
                  >
                    Set My Teams
                  </Box>
                </Button>
              </Flex>
            </Box>
           */}
          </Flex>
        </Box>
      </Sticky>
    </Box>
  );
};

export default Navbar;
