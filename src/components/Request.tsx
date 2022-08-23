import { Box, Heading, Text, Stack, Badge } from "@chakra-ui/react";
import React from "react";

export interface IRequest {
    request: string;
    isApproved: boolean;
    dateFrom: string;
    dateTo: string;
    reason: string;
    requestState: string;
}

type requestProp = {
    requestCard: IRequest;
}

const RequestCard = (props: requestProp) => {
    const requestData = props.requestCard;

    return (
        <Box p={5} width={'100%'} shadow='md' borderWidth='1px'>
            <Stack mb={2} spacing={2} direction='column' >
                <Heading fontSize='xl' style={{textTransform: 'capitalize'}}>{requestData.request}</Heading>
                <Badge ml='1' fontSize='12px'
                    width={'max-content'}
                    height='max-content'
                    colorScheme={getRequestColorScheme(requestData.requestState)}>
                    {requestData.requestState}
                </Badge>
            </Stack>
            {
                requestData.requestState === 'COMPLETED' &&
                <Text>Your request is {requestData.isApproved ? 'approved' : 'declined'}</Text>
            }
            <Text mt={4} color={'gray.500'}>From: </Text><Text>{requestData.dateFrom}</Text>
            <Text mt={4} color={'gray.500'}>To: </Text><Text>{requestData.dateTo}</Text>
            <Text mt={4} color={'gray.500'}>Reason:</Text>
            <Text>{requestData.reason}</Text>
        </Box>
    )
}

export default RequestCard

const getRequestColorScheme = (state: string) => {
    switch (state) {
        case 'PENDING':
           return 'red'
        case 'PROCESSING':
            return 'blue'
        case 'COMPLETED':
            return 'green'
        default: 
            return 'red';
    }
}
