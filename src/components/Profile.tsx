import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from '@/hooks';
import { removeLoginDetails } from '@/utils/preserved-storage';

export default function SocialProfileSimple() {
    const userData = useAppSelector(state => state.user.user);

    const logout = () => {
        removeLoginDetails()
    }

    return (
        <Center>
            <Box
                // maxW={'320px'}
                // w={'full'}
                width={{base: '320px', lg: '420px'}}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                borderColor='#d82d2b'
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQ27LXeVXjcTrk39-GEcmmaPT0l55uicaN40gMSY&s'
                    }
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {userData?.fullName}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {userData?.email}
                </Text>
                <Button mt={2} onClick={logout}>Logout</Button>
            </Box>
        </Center>
    );
}