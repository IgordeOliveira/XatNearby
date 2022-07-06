import type { NextPage, } from 'next'
import { useState, useEffect  } from 'react';
import Head from 'next/head'
import { getPosition } from '../services/location.service'
import user, {Coordinates, User} from '../services/user.service';


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
    <div >
      <Head>
        <title>NearChatify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <pre> { JSON.stringify(users, null, 4) }</pre>
      </main>

      <footer >
        
      </footer>
    </div>
  )
}

export default Home
