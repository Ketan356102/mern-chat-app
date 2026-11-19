import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack, Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState();

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "dry5tkoki");
      fetch("https://api.cloudinary.com/v1_1/dry5tkoki/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  return (
     <VStack spacing={4} align="stretch" w="100%">
      <FormControl id="first-name" isRequired>
        <FormLabel
          fontSize="xs"
          fontWeight="700"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={1.5}
        >
          Name
        </FormLabel>
        <Input
          name="name"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
          borderRadius="xl"
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          py={6}
          _focus={{
            bg: "white",
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.4)",
          }}
          _hover={{ borderColor: "gray.300" }}
          transition="all 0.2s"
        />
      </FormControl>

      <FormControl id="Signup-email" isRequired>
        <FormLabel
          fontSize="xs"
          fontWeight="700"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={1.5}
        >
          Email Address
        </FormLabel>
        <Input
          name="email"
          placeholder="your.email@example.com"
          onChange={(e) => setEmail(e.target.value)}
          borderRadius="xl"
          bg="gray.50"
          border="1px solid"
          borderColor="gray.200"
          py={6}
          _focus={{
            bg: "white",
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.4)",
          }}
          _hover={{ borderColor: "gray.300" }}
          transition="all 0.2s"
        />
      </FormControl>

      <FormControl id="Signup-password" isRequired>
        <FormLabel
          fontSize="xs"
          fontWeight="700"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={1.5}
        >
          Password
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            borderRadius="xl"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            py={6}
            _focus={{
              bg: "white",
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.4)",
            }}
            _hover={{ borderColor: "gray.300" }}
            transition="all 0.2s"
          />
          <InputRightElement h="100%" width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              variant="ghost"
              color="blue.500"
              fontWeight="bold"
              _hover={{ bg: "transparent", color: "blue.600" }}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="Signup-confirm-password" isRequired>
        <FormLabel
          fontSize="xs"
          fontWeight="700"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={1.5}
        >
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="••••••••"
            onChange={(e) => setConfirmpassword(e.target.value)}
            borderRadius="xl"
            bg="gray.50"
            border="1px solid"
            borderColor="gray.200"
            py={6}
            _focus={{
              bg: "white",
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.4)",
            }}
            _hover={{ borderColor: "gray.300" }}
            transition="all 0.2s"
          />
          <InputRightElement h="100%" width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              variant="ghost"
              color="blue.500"
              fontWeight="bold"
              _hover={{ bg: "transparent", color: "blue.600" }}
              onClick={() => setShow(!show)}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel
          fontSize="xs"
          fontWeight="700"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={1.5}
        >
          Upload Profile Picture (Optional)
        </FormLabel>
        <Box
          border="2px dashed"
          borderColor="gray.200"
          borderRadius="xl"
          p={3}
          textAlign="center"
          bg="gray.50"
          cursor="pointer"
          position="relative"
          _hover={{ borderColor: "blue.400", bg: "blue.50" }}
          transition="all 0.2s"
        >
          <Input
            type="file"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            opacity={0}
            cursor="pointer"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <Text fontSize="xs" fontWeight="bold" color="gray.500">
            {pic ? "✅ Picture Selected" : "📁 Choose image file"}
          </Text>
        </Box>
      </FormControl>

      <Button
        mt={2}
        bgGradient="linear(to-r, blue.400, blue.600)"
        color="white"
        borderRadius="xl"
        py={6}
        fontSize="sm"
        fontWeight="bold"
        shadow="md"
        _hover={{
          bgGradient: "linear(to-r, blue.500, blue.700)",
          transform: "translateY(-1px)",
          shadow: "lg",
        }}
        _active={{ transform: "translateY(0)" }}
        onClick={submitHandler}
        isLoading={loading}
        transition="all 0.2s"
      >
        Sign Up
      </Button>
    </VStack>
  );
};


export default Signup;