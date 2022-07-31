import { ReactNode } from 'react';
import {
    Box,
    Stack,
    HStack,
    Heading,
    Text,
    VStack,
    useColorModeValue,
    List,
    ListItem,
    ListIcon,
    Button,
    Spinner,
} from '@chakra-ui/react';
import TodosList, { TodosList1, TodosList2, TodosList3 } from './TodosList';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTodosData } from '../../redux/Todos/actions';


function PriceWrapper({ children }) {
    return (
        <Box
            minW={'sm'}
            minH={'600px'}
            maxH={'650px'}
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius={'xl'}>
            {children}
        </Box>
    );
}

export default function ThreeTierPricing() {

    const dispatch = useDispatch();
    const { loading, todos, error } = useSelector((store) => store.todos);

    useEffect(() => {
        if (todos.length <= 0) {
            dispatch(getTodosData())
        }
    }, [dispatch])

    return (
        <Box py={12} >
            <Stack
                direction={{ base: 'column', md: 'row' }}
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}>
                <PriceWrapper>
                    <Box position="relative">
                        <Box

                            position="absolute"
                            top="-16px"
                            left="50%"
                            style={{ transform: 'translate(-50%)' }}>
                            <Text
                                textTransform="uppercase"
                                bg={useColorModeValue('red.300', 'red.700')}
                                px={3}
                                py={1}
                                color={useColorModeValue('gray.900', 'gray.300')}
                                fontSize="sm"
                                fontWeight="600"
                                rounded="xl">
                                To DO
                            </Text>

                        </Box>
                        {
                            loading &&
                            <Box justifyItems={"center"}>
                                <br />
                                <Spinner color='white' size='xl' />
                            </Box>
                        }
                        {
                            todos.data && <TodosList1 data={todos.data} />
                        }
                        {
                            error && <Heading color={'red'}>Something went wrong..</Heading>
                        }
                    </Box>
                </PriceWrapper>
                <PriceWrapper>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            top="-16px"
                            left="50%"
                            style={{ transform: 'translate(-50%)' }}>
                            <Text
                                textTransform="uppercase"
                                bg={useColorModeValue('red.300', 'red.700')}
                                px={3}
                                py={1}
                                color={useColorModeValue('gray.900', 'gray.300')}
                                fontSize="sm"
                                fontWeight="600"
                                rounded="xl">
                                In progress
                            </Text>
                        </Box>
                        {
                            loading &&
                            <Box justifyItems={"center"}>
                                <br />
                                <Spinner color='white' size='xl' />
                            </Box>
                        }
                        {
                            todos.data && <TodosList2 data={todos.data} />
                        }
                        {
                            error && <Heading color={'red'}>Something went wrong..</Heading>
                        }
                    </Box>
                </PriceWrapper>
                <PriceWrapper>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            top="-16px"
                            left="50%"
                            style={{ transform: 'translate(-50%)' }}>
                            <Text
                                textTransform="uppercase"
                                bg={useColorModeValue('red.300', 'red.700')}
                                px={3}
                                py={1}
                                color={useColorModeValue('gray.900', 'gray.300')}
                                fontSize="sm"
                                fontWeight="600"
                                rounded="xl">
                                Done
                            </Text>

                        </Box>
                        {
                            loading &&
                            <Box justifyItems={"center"}>
                                <br />
                                <Spinner color='white' size='xl' />
                            </Box>
                        }
                        {
                            todos.data && <TodosList3 data={todos.data} />
                        }
                        {
                            error && <Heading color={'red'}>Something went wrong..</Heading>
                        }
                    </Box>
                </PriceWrapper>
            </Stack>
        </Box>

    );
}