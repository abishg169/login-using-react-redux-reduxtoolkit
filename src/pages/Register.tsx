import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
//   chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  useToast,
//   InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { TranslateLanguage } from "../components/TranslateLanguage";
import { Trans } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "@/data/api/axios-constant";

type UserCredential = {
    fullName: string;
    email: string;
    password: string;
}

export default function Register ()  {
    const navigate = useNavigate();
    const toast = useToast();
    const showPassword = false;
    const { register, handleSubmit, formState: { errors } } = useForm<UserCredential>()
    const onSubmit: SubmitHandler<UserCredential> = async (data) => {
        console.log('data is ', data)
        const requestData: any = {
            'fullName': data.fullName,
            'email': data.email,
            'password': data.password
        }
        axios({
            method: 'post',
            url: `${apiBaseUrl}/api/auth/register`,
            data: requestData
        })
        .then(() => {
            toast({
                title: 'Register',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/')
        })
        .catch(e => {
            toast({
                title: 'Register',
                description: "Failed to register user",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return (
        <>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                backgroundColor="gray.200"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar bg="teal.500" />
                    <Heading color="teal.400">
                        <Trans>Welcome</Trans>
                    </Heading>
                    <Box minW={{ base: "90%", md: "468px" }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack
                                spacing={4}
                                p="2rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                            >
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input  type="text"
                                                {...register("fullName", {
                                                    required: 'Fullname is required',
                                                    }
                                                )}
                                                placeholder="Enter fullname" />
                                    </InputGroup>
                                    <div className="text-red-600 pl-2 mt-2">
                                        {errors.fullName?.message && <span>{errors.fullName?.message}</span>}
                                    </div>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input  type="email"
                                                {...register("email", {
                                                    required: 'Email is required',
                                                    pattern: {
                                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                            message: 'Please enter a valid email',
                                                        } 
                                                    }
                                                )}
                                                placeholder="email address" />
                                    </InputGroup>
                                    <div className="text-red-600 pl-2 mt-2">
                                        {errors.email?.message && <span>{errors.email?.message}</span>}
                                    </div>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<FaLock color="gray.300" />}
                                        />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            {...register("password", { required: true })}
                                        />
                                        {/* <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement> */}
                                    </InputGroup>
                                    <div className="text-red-600 pl-2 mt-2">
                                        {errors.password && <span>This field is required</span>}
                                    </div>
                                    <FormHelperText textAlign="right">
                                        <Link>forgot password?</Link>
                                    </FormHelperText>
                                </FormControl>
                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Register
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    <Flex>Language: <TranslateLanguage /></Flex>
                    {/* New to us?{" "}
                    <Link color="teal.500" href="#">
                        Sign Up
                    </Link> */}
                </Box>
            </Flex>
        </>
    )
}
