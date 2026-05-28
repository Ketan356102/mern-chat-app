import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Avatar, Badge, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal';
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from '../ChatLoading';
import UserListItem from '../useAvatar/UserListItem';
import NotificationBadge from "react-notification-badge"
import { Effect } from 'react-notification-badge';
import { getSender } from "../../config/ChatLogics";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats, setNotification, notification } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/")
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Enter a name or email to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`api/user?search=${search}`, config)
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users" hasArrow placement='bottom-end'>
          <Button
            onClick={onOpen}
            variant="ghost"
            leftIcon={<Search2Icon />}
            colorScheme="blue"
            fontWeight="medium"
            _hover={{ bg: "blue.50" }}
          >
            <Text display={{ base: "2xl", md: "inline" }}>Search</Text>
          </Button>
        </Tooltip>
        <Text
          fontFamily={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          fontFamily="Baloo 2"
          bgGradient="linear(to-r, teal.500, blue.500)"
          bgClip="text"
          letterSpacing="wide"
        >
          Converxa
        </Text>
        <div>
          <Menu>
            <MenuButton
              position="relative"
              transition="0.2s ease"
              _hover={{ transform: "scale(1.1)" }}
            >
              <NotificationBadge
                count={notification.length}
                effect={Effect.scale}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList borderRadius="xl" boxShadow="xl" py={2}>
              {!notification.length && (
                <MenuItem color="gray.500">No new Messages</MenuItem>
              )}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  borderRadius="md"
                  _hover={{ bg: "blue.50" }}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}

                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
              borderRadius="full"
              px={2}
              _hover={{ bg: "blue.50" }}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList borderRadius="xl" boxShadow="xl">
              <ProfileModal user={user}>
                <MenuItem fontWeight="500">My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem color="red.600" onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? <ChatLoading /> :
              (
                searchResult?.map(user => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            {loadingChat && (
              <Spinner size="lg" mt={3} display="block" mx="auto" />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer;