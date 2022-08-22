import Profile from "@/components/Profile";
import RequestCard, { IRequest } from "@/components/Request";
import RequestForm from "@/components/RequestForm";
import {
    Box,
    Stack,
    Text,
    Heading,
    SimpleGrid
} from "@chakra-ui/react";

export function Home() {
    const requestList: IRequest[] = [
        {
            "isApproved": true,
            "request": "sick leave",
            "dateFrom": "2022-08-21",
            "dateTo": "2022-08-21",
            "reason": "some reason to leave",
            "requestState": "COMPLETED"
        },
        {
            "isApproved": false,
            "request": "sick leave",
            "dateFrom": "2022-08-25",
            "dateTo": "2022-08-28",
            "reason": "some reason to leave",
            "requestState": "PROCESSING"
        },
        {
            "isApproved": false,
            "request": "casual leave",
            "dateFrom": "2022-8-15",
            "dateTo": "2022-08-16",
            "reason": "some reason to leave",
            "requestState": "COMPLETED"
        },
        {
            "isApproved": false,
            "request": "casual leave",
            "dateFrom": "2022-09-1",
            "dateTo": "2022-08-5",
            "reason": "some reason to leave",
            "requestState": "PENDING"
        }
    ]
    return (
        <>
            <Box m={2}>
                <Stack mb={4} spacing={5} direction={{ base: 'column', md: 'row' }}>
                    <Box py={6}>
                        <Profile />
                    </Box>
                    <Box py={6} px={3} width={'100%'}>
                        <Box>
                            <Text fontWeight={'bold'}>Overview</Text>
                        </Box>
                        <Stack spacing={4} direction={'row'}>
                            <Box p={5} width={'50%'}
                                backgroundColor="#d82d2b"
                                color="white"
                                shadow='md' borderWidth='1px'>
                                <Heading fontSize='xl'>Sick Leave</Heading>
                                <Text mt={4}>Remaining: 8</Text>
                                <Text>Used: 4</Text>
                            </Box>
                            <Box p={5} width={'50%'} shadow='md' borderWidth='1px'>
                                <Heading fontSize='xl'>Casual Leave</Heading>
                                <Text mt={4}>Remaining: 10</Text>
                                <Text>Used: 2</Text>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
                <Box>
                    <Stack mb={4} direction={'row'} justifyContent={'space-between'}>
                        <Heading mb={4} fontSize={'xl'}>My Requests</Heading>
                        <RequestForm />
                    </Stack>
                    <SimpleGrid columns={{ base: 1, sm:2, md: 3, lg: 4 }} spacing={5}>
                        {requestList.map((data, key) => {
                            return <RequestCard key={'requestCard' + key} requestCard={data} />
                        })}
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    )
}
