import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDepleteGremlin } from './hooks';

export default function MainSection(props) {
  const [gremlins, setGemlins] = useState([]);

useDepleteGremlin(gremlins,d => setGemlins(d));

  useEffect(() => {
    axios.get('http://[::1]:3000/gremlins')
    .then(res => {
      setGemlins(res.data);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  console.log(gremlins);

  const handleClick = (item) => {
    props.history.push({
      pathname: '/gremlin',
      state: item
    })
  };

  return (
    <>
      <Stack style={{}} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            
            
            <Text color={'red.400'} as={'span'}>
              Your Gremlins
            </Text>{' '}
          </Heading>
          <Flex align={'center'} textAlign="left">
            
          </Flex>
        </Stack>
      </Flex>
      <Flex flex={1}>
        
      </Flex>
    </Stack>
    <ul>
    {gremlins && gremlins.map(gem => {

      return (
        <li key={gem.id} onClick={() => handleClick(gem)} style={{cursor: 'pointer'}}>
          <div>Name: {gem.name}</div>
          <div>Hunger: {gem.hunger}</div>
          <div>Satisfaction: {gem.satisfaction}</div>
          <hr />
        </li>
      );
    })}
    </ul>
    <button onClick={async ()=>{
          for (const gremlin of gremlins) {
            await axios.put(`http://[::1]:3000/gremlins/${gremlin.id}`, {
              hunger:100,
              satisfaction: 100,
            });
          }
          const { data } = await axios.get('http://[::1]:3000/gremlins');
          setGemlins(data);
    }}>RESET</button>
    </>
  );
}
