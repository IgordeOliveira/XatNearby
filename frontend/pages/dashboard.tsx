import type { NextPage, } from 'next'
import { useState, useEffect  } from 'react';
import Head from 'next/head'
import { getPosition } from '../services/location.service'
import user, {Coordinates, User} from '../services/user.service';
import { SimpleGrid, Box, Container  } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import UserBox from '../components/UserBox';


const Home: NextPage = () => {
  const [coords, setCoords] = useState<Coordinates|null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    //ask for location permission and get actual position of user on load of dashboard
    getPosition().then(position => {
      setCoords({lat: position.coords.latitude, lon: position.coords.longitude})
      console.log('Get coordinates from location')
    }).catch(console.error)
  }, [])

  useEffect(() => {
      (async () =>{
        if(!coords) return
        try{
          console.log('updateMySelfAndGetNearUsers')
          const response = await user.updateMySelfAndGetNearUsers(coords)
          setUsers(response.data)
        }catch(err){console.error(err)}
      })()
  }, [coords])
  
  if (!users) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>NearChatify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container as="main" mt='56px' size='container.sm' p={0}>
        <SimpleGrid spacing={1} columns={2}>
        { users.map(user => (
          <UserBox content={user}/>
        )) 
      }
        </SimpleGrid>
      </Container>
      <footer >
        
      </footer>
    </>
  )
}

export default Home
