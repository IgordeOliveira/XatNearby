import { Spacer, Container, Flex, Text } from '@chakra-ui/react'
import type { NextPage, } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import FooterInput from '../../components/Chat/FooterInput'
import Header from '../../components/Chat/Header'
import Messages from '../../components/Chat/Messages'
import Navbar from '../../components/Navbar'

const Chat: NextPage = () => {
	const [messages, setMessages] = useState([
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Myself Ferin Patel" },
		{ from: "me", text: "Myself Ferin Patel" },
		{ from: "me", text: "Myself Ferin Patel" },
		{ from: "me", text: "Myself Ferin Patel" },
		{ from: "me", text: "Myself Ferin Patel" },
		{
			from: "computer",
			text: "Nice to meet you. You can send me message and i'll reply you with same message.",
		},
	]);
	return (<>
		<Head>
			<title>Chat</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Header />
		<Flex as='main' direction='column' height='100vh'>
			<Messages messageBag={messages} />
			<FooterInput />
		</Flex>
	</>)
}

export default Chat
