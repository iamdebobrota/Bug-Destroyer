import React from 'react'
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FiServer } from 'react-icons/fi';
import { RiTodoLine } from 'react-icons/ri';
import { AiOutlineFileDone } from 'react-icons/ai';
import axios from 'axios';
import { getTodosData } from '../../redux/Todos/actions';
import CrudOperations from './CrudOperations';


function TodosList1({ data }) {




    return (
        <Box p={4}>
            <Container maxH={'550px'} mt={10} overflowY={'scroll'} scrollbar='red' overscrollBehaviorY='auto'>
                <SimpleGrid columns={{ base: 1 }} spacing={10}>
                    {
                        data && data.map((elem) => (

                            <React.Fragment key={elem._id}>
                                {
                                    elem.status.todo && elem.delete === false &&
                                    <>
                                        <HStack justifyContent={'space-between'} border='1px solid white' bg={'gray.800'} p='1rem' borderRadius='lg' key={elem._id} align={'center'}>
                                            <HStack bg={'gray.800'} p='1rem' align={'top'}>
                                                <Box color={'green.400'} px={2}>
                                                    <Icon as={CheckIcon} />
                                                </Box>
                                                <VStack align={'start'}>
                                                    <Text color={'white'} fontWeight={600}>{elem.title}</Text>
                                                    <Text textAlign={'left'} color={'gray.600'}>{elem.Description}</Text>
                                                    <Box>
                                                        <CrudOperations id={elem._id} />
                                                    </Box>
                                                </VStack>
                                            </HStack>
                                            < Box
                                                my={'auto'}
                                                color={"white"}
                                                alignContent={'center'}>
                                                {<RiTodoLine size={'3em'} />}
                                            </Box>
                                        </HStack>

                                    </>
                                }
                            </React.Fragment>
                        ))
                    }
                </SimpleGrid>
            </Container>
        </Box >
    );
}

function TodosList2({ data }) {

    return (
        <Box p={4}>
            <Container maxH={'550px'} mt={10} overflowY={'scroll'} overscrollBehaviorY='contain'>
                <SimpleGrid columns={{ base: 1 }} spacing={10}>
                    {
                        data && data.map((elem) => (
                            <React.Fragment key={elem._id}>

                                {
                                    elem.status.inPogress && elem.delete === false &&

                                    <HStack justifyContent={'space-between'} bg={'gray.800'} border='1px solid white' p='1rem' borderRadius='lg' key={elem._id} align={'center'}>
                                        <HStack bg={'gray.800'} p='1rem' align={'top'}>
                                            <Box color={'green.400'} px={2}>
                                                <Icon as={CheckIcon} />
                                            </Box>
                                            <VStack align={'start'}>
                                                <Text color={'white'} fontWeight={600}>{elem.title}</Text>
                                                <Text textAlign={'left'} color={'gray.600'}>{elem.Description}</Text>
                                                <Box>
                                                    <CrudOperations id={elem._id} />
                                                </Box>
                                            </VStack>
                                        </HStack>
                                        < Box
                                            my={'auto'}
                                            color={"pink.400"}
                                            alignContent={'center'}>
                                            {<FiServer size={'3em'} />}
                                        </Box>
                                    </HStack>
                                }
                            </React.Fragment>

                        ))
                    }
                </SimpleGrid>
            </Container>
        </Box >
    );
}


function TodosList3({ data }) {

    return (
        <Box p={4}>
            <Container maxH={'550px'} mt={10} overflowY={'scroll'} >
                <SimpleGrid columns={{ base: 1 }} spacing={10}>
                    {
                        data && data.map((elem) => (
                            <React.Fragment key={elem._id}>

                                {elem.status.done && elem.delete === false &&
                                    <HStack justifyContent={'space-between'} bg={'gray.800'} border='1px solid white' p='1rem' borderRadius='lg' key={elem._id} align={'center'}>
                                        <HStack bg={'gray.800'} p='1rem' align={'top'}>
                                            <Box color={'green.400'} px={2}>
                                                <Icon as={CheckIcon} />
                                            </Box>
                                            <VStack align={'start'}>
                                                <Text color={'white'} fontWeight={600}>{elem.title}</Text>
                                                <Text textAlign={'left'} color={'gray.600'}>{elem.Description}</Text>
                                                <Box>
                                                    <CrudOperations id={elem._id} />
                                                </Box>
                                            </VStack>
                                        </HStack>
                                        < Box
                                            my={'auto'}
                                            color={"whatsapp.400"}
                                            alignContent={'center'}>
                                            {<AiOutlineFileDone size={'3em'} />}
                                        </Box>
                                    </HStack>
                                }
                            </React.Fragment>
                        ))
                    }
                </SimpleGrid>
            </Container>
        </Box >
    );
}


export { TodosList1, TodosList2, TodosList3 }

