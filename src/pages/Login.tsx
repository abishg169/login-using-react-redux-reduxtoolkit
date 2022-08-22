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
//   InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { TranslateLanguage } from "../components/TranslateLanguage";
import { Trans } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { login } from "@/store/reducer/auth";
import { setUserState } from "@/store/reducer/user";

type UserCredential = {
    email: string;
    password: string;
}

export default function Login ()  {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const showPassword = false;
    const { register, handleSubmit, formState: { errors } } = useForm<UserCredential>()
    const onSubmit: SubmitHandler<UserCredential> = async (data) => {
        console.log('data is ', data)
        const requestData = {
            email: data.email,
            password: data.password
        }
        dispatch(login(requestData))
            .unwrap()
            .then((originalPromiseResult) => {
              // handle result here
              console.log('response at login component', originalPromiseResult);
              dispatch(setUserState(originalPromiseResult.user));
              navigate('/');
            })
            .catch((rejectedValueOrSerializedError) => {
              // handle error here
            console.log('err at login component', rejectedValueOrSerializedError);
            });
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
                                    Login
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
