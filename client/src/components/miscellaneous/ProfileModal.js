import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
          {children ? (
        <span onClick={onOpen} style={{ cursor: "pointer" }}>
          {children}
        </span>
      ) : (
        <IconButton
          icon={<ViewIcon />}
          onClick={onOpen}
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, teal.500, blue.600)",
            scale: 1.05,
          }}
          borderRadius="full"
          boxShadow="md"
          transition="0.2s"
        />
      )}
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent h="410px">
        <ModalHeader
        fontSize="40px"
        fontFamily="Work sans"
        display="flex"
        justifyContent="center"
        >
          {user.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="space-between"
        >
          <Image 
          borderRadius="full"
          boxSize="150px"
          src={user.pic}
          alt={user.name}
          />

          <Text
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily="WorK sans"          
          >
            Email: {user.email}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};

export default ProfileModal