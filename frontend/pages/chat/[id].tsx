import { Spacer, Container, Flex, Text } from '@chakra-ui/react'
import type { NextPage, } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import FooterInput from '../../components/Chat/FooterInput'
import Header from '../../components/Chat/Header'
import Messages from '../../components/Chat/Messages'
import { io } from "socket.io-client";


const socket = io('http://localhost:3333')


const Chat: NextPage = () => {
	const [messages, setMessages] = useState([])


  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

		socket.on('pong', () => {
      console.log('pong')
    });


    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

	const sendPing = (data: string) => {
		console.log(data)
		setMessages(oldMessages => [...oldMessages, { from: "me", text: data }	])
    socket.emit('ping');
  }
	
	return (<>
		<Head>
			<title>Chat</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Header />
		<Flex as='main' direction='column' height='100vh'>
			<Messages messageBag={messages}/>
			<FooterInput handleSendMessage={sendPing}  />
		</Flex>
	</>)
}

export default Chat
