import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast, HStack, VStack, Input, InputLeftElement, AvatarBadge, InputGroup, Avatar } from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { getSenderFull } from "../config/ChatLogics"
import ChatLoading from "./ChatLoading"
import GroupChatModal from './miscellaneous/GroupChatModal';
import axios from "axios";
import moment from "moment";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if(user) {
      fetchChats();
    }
  }, [fetchAgain, user]);

  const filteredChats = chats?.filter((chat) => {
    if(chat.isGroupChat) {
      return chat.chatName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    const displayUser = getSenderFull(user, chat.users);
    return displayUser?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      backdropFilter="blur(20px)"
      bg="rgba(255, 255, 255, 0.6)"
      w={{ base: "100%", md: "32%" }}
      borderRadius="28px"
      border="1px solid rgba(255,255,255,0.3)"
      boxShadow="0 8px 24px rgba(0,0,0,0.15)"
      transition="all 0.3s ease-in-out"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        fontSize={{ base: "24px", md: "28px" }}
        fontFamily="Poppins, sans-serif"
        w="100%"
        fontWeight="600"
        color="gray.800"
      >
        Chats
        <GroupChatModal>
          <Button
            bgGradient="linear(to-r, teal.400, blue.400)"
            color="white"
            borderRadius="lg"
            fontWeight="500"
            fontSize={{ base: "14px", md: "16px" }}
            rightIcon={<AddIcon />}
            _hover={{
              transition: "scale(1.05)",
              boxShadow: "0 0 12px rgba(56,189,248,0.5)",
            }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
            <InputGroup
        w="100%"
        mb={3}
        mt={1}
        bg="whiteAlpha.700"
        borderRadius="lg"
        shadow="sm"
      >
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search chats..."
          border="none"
          focusBorderColor="blue.300"
          _placeholder={{ color: "gray.500" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Chat list */}
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="rgba(255,255,255,0.5)"
        backdropFilter="blur(12px)"
        w="100%"
        h="100%"
        borderRadius="xl"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#a0aec0",
            borderRadius: "5px",
          },
        }}
      >
        {chats ? (
          <Stack spacing={3}>
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => {
                const isSelected = selectedChat?._id === chat._id;
                const displayUser = getSenderFull(user, chat.users);
                const lastMsg =
                  chat.latestMessage?.content || "No messages yet";
                const lastActive = chat.latestMessage?.updatedAt;

                return (
                  <Box
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    p={3}
                    borderRadius="lg"
                    bg={
                      isSelected
                        ? "linear-gradient(90deg, #63b3ed, #3182ce)"
                        : "whiteAlpha.700"
                    }
                    color={isSelected ? "white" : "gray.800"}
                    boxShadow={
                      isSelected ? "0 4px 12px rgba(66,153,225,0.5)" : "sm"
                    }
                    _hover={{
                      transform: "scale(1.02)",
                      boxShadow: "md",
                      transition: "0.2s",
                    }}
                    transition="all 0.2s ease-in-out"
                  >
                    <HStack justify="space-between" align="center">
                      <HStack spacing={3}>
                        <Avatar
                          size="md"
                          name={
                            chat.isGroupChat ? chat.chatName : displayUser?.name
                          }
                          src={!chat.isGroupChat ? displayUser?.pic : undefined}
                          border={
                            isSelected
                              ? "2px solid white"
                              : "2px solid transparent"
                          }
                        >
                          {!chat.isGroupChat && displayUser?.isOnline && (
                            <AvatarBadge boxSize="1em" bg="green.500" />
                          )}
                        </Avatar>
                        <VStack align="start" spacing={0}>
                          <Text
                            fontWeight="semibold"
                            fontSize="md"
                            noOfLines={1}
                          >
                            {chat.isGroupChat
                              ? chat.chatName
                              : displayUser?.name}
                          </Text>
                          <Text fontSize="sm" opacity={0.8} noOfLines={1}>
                            {lastMsg}
                          </Text>
                        </VStack>
                      </HStack>
                      {lastActive && (
                        <Text fontSize="xs" opacity={0.6}>
                          {moment(lastActive).fromNow()}
                        </Text>
                      )}
                    </HStack>
                  </Box>
                );
              })
            ) : (
              <Text textAlign="center" color="gray.500">
                No chats found
              </Text>
            )}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;