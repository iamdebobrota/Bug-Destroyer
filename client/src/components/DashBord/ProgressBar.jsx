import {
    Avatar,
    Box,
    chakra,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    HStack,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { RiTodoLine } from 'react-icons/ri';
import { FiServer } from 'react-icons/fi';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTodosData } from '../../redux/Todos/actions';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';



function StatsCard(props) {
    const { title, stat, icon, bg, iconColor, percentile, progress } = props;
    return (
        <Stat
            bg={bg}
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('#FFFFFFEB', '#FFFFFFEB')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'} color='#FFFFFFEB'>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'}  >
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                {progress ? <Box my={'auto'} alignContent={'center'}>
                    <CircularProgress value={percentile} color='green.400'>
                        <CircularProgressLabel>{percentile}%</CircularProgressLabel>
                    </CircularProgress>
                </Box> :
                    <HStack spacing={4}>
                        <Tag size={'lg'} variant='subtle' colorScheme='pink'>
                            <TagLeftIcon boxSize='12px' as={AddIcon} />
                            <TagLabel>Do your best</TagLabel>
                        </Tag>
                    </HStack>
                }
                <Box
                    my={'auto'}
                    color={useColorModeValue(iconColor)}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

export default function ProgressBar() {

    const dispatch = useDispatch();
    const { lading, todos, error } = useSelector((store) => store.todos);
    const [todosData, setTodosData] = useState(0);
    const [all, setAll] = useState(0)
    const [todosDoneData, setTodosDoneData] = useState(0);
    const [todosInProgressData, setTodosInProgresData] = useState(0);

    useEffect(() => {
        if (todos.length <= 0) {
            dispatch(getTodosData())
        }
    }, [dispatch])


    useEffect(() => {
        let data = todos.data && todos.data.filter((elem, index) => {
            if (elem.status.todo && elem.delete === false) {
                return { ...elem }
            }
        })
        setTodosData(data && data.length)

        let data4 = todos.data && todos.data.filter((elem, index) => {
            if (elem.delete === false) {
                return { ...elem }
            }
        })
        setAll(data4 && data4.length)

        let data2 = todos.data && todos.data.filter((elem, index) => {
            if (elem.status.inPogress && elem.delete === false) {
                return { ...elem }
            }
        })
        setTodosInProgresData(data2 && data2.length)

        let data3 = todos.data && todos.data.filter((elem, index) => {
            if (elem.status.done && elem.delete === false) {
                return { ...elem }
            }
        })
        setTodosDoneData(data3 && data3.length)
    }, [todos.data])

    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard
                    percentile='100'
                    title={'To do'}
                    stat={todosData}
                    icon={<RiTodoLine size={'3em'} />}
                />
                <StatsCard

                    percentile={Math.ceil((todosInProgressData / all) * 100)}
                    title={'In progress'}
                    stat={todosInProgressData}
                    icon={<FiServer size={'3em'} />}
                    progress={true}
                    iconColor={'pink.400'}
                />

                <StatsCard
                    percentile={Math.ceil((todosDoneData / all) * 100)}
                    title={'Done'}
                    stat={todosDoneData}
                    progress={true}
                    icon={<AiOutlineFileDone size={'3em'} />}
                    iconColor={'whatsapp.400'}
                />

            </SimpleGrid>
        </Box >

    );
}