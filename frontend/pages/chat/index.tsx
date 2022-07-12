import { Spacer, Container, Flex, Text, Heading } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import FooterInput from '../../components/Chat/FooterInput'
import Header from '../../components/Chat/Header'
import Messages, { messageBag } from '../../components/Chat/Messages'
import { io, Socket } from "socket.io-client";
import userService, { ChatResponse, User } from '../../services/user.service'
import { useRouter } from 'next/router'

interface Props {
	chat: ChatResponse
}


interface ServerToClientEvents {
  'new:message': (msgResponse: {content: string, senderId: number}) => void;
}

interface ClientToServerEvents {
  'new:message': (content: string) => void
}


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3333', { autoConnect: false })

const Chat: NextPage<Props> = () => {
	const [messages, setMessages] = useState<messageBag[]>([])
	const [chat, setChat] = useState<ChatResponse|null>(null)
	const router = useRouter()

	useEffect(() => {
		async function getChatData() {
			try {
				const { userId } = router.query
				if (typeof userId != 'string') return;

				const { data: chat } = await userService.findOrCreateChat(parseInt(userId))
				console.log('got chat to', userId)
				console.log(chat)
				setChat(chat)
			} catch (err) { console.log(err) }
		}
		getChatData()

		return () => {
			console.log()
			socket.disconnect()
			socket.offAny()
		};

	}, [])


	useEffect(() => {

		if (!chat) return;

		socket.auth = { chatId: chat.uuid, senderUserId: chat.senderUserId }
		if (socket.connected) {
			console.log('already connected')
			return;
		}
		socket.connect()
		socket.on("connect", () => {
			console.log('connect', chat.uuid);
		});

		socket.onAny((event, ...args) => {
			console.log(`got ${event}`);
		});

		socket.on('new:message', ({content, senderId}) => {
			console.log('new:message received', {content, senderId})
			const isFromMe = senderId === chat.senderUserId
			setMessages(oldMessages => [...oldMessages, {content: content, isFromMe: isFromMe}])
		})

	}, [chat]);

	const sendMessage = (message: string) => {
		console.log('emmiting new:message')
		socket.emit('new:message', message);
		// setMessages(oldMessages => [...oldMessages, {content: message, isFromMe: true}])

	}

	if (!chat) {
		return (<Heading>Loading</Heading>)
	} else {
		return (<>
			<Head>
				<title>Chat </title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header user={chat.receiverUser} />
			<Flex as='main' direction='column' height='100vh'>
				<Messages messageBag={messages} />
				<FooterInput handleSendMessage={sendMessage} />
			</Flex>
		</>)
	}

}

export default Chat
