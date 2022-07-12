import type { NextPage, } from 'next'
import { useState, useEffect } from 'react';
import Head from 'next/head'
import { Center, Button, FormControl, FormLabel, Input, Container, Box, Heading, Stack, FormHelperText, Alert, AlertIcon } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router'
import { z } from "zod";
import client from '../services/user.service';


const loginDataSchema = z.object({
	name: z.string().min(1,{ message: "Can't be empty" }),
	email: z.string().email(),
});

export type LoginData = z.infer<typeof loginDataSchema>;


const Login: NextPage = () => {
	const [error, setError] = useState(false)
	const router = useRouter()
	const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
		resolver: zodResolver(loginDataSchema)
	})

	const onSubmit = handleSubmit(async loginData => {
		try{
			const response = await client.createOrLogin(loginData)
			localStorage.setItem('token', response.data.token)
			router.replace('/dashboard')
		}catch(err){console.error(err); setError(true)}
	})

	return (
		<div >
			<Head>
				<title>NearChatif - Login</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Center h='100vh'>
					<Box padding='10' borderWidth='1px' borderRadius='lg' overflow='hidden' minW='sm'>
						<Heading>NearChatify</Heading>
						<form onSubmit={onSubmit}>
							<Stack direction='column' spacing='2' mt='4'>
								<FormControl>
									<FormLabel htmlFor='name'>Name</FormLabel>
									<Input {...register("name")} />
									{errors.name && <FormHelperText>{errors.name?.message}</FormHelperText>}
								</FormControl>
								<FormControl>
									<FormLabel htmlFor='email'>Email address</FormLabel>
									<Input {...register("email")} />
									{errors.email && <FormHelperText>{errors.email?.message}</FormHelperText>}
								</FormControl>
								<Button type='submit'>Login</Button>
								{error && <Alert status='error'>
									<AlertIcon />
									Login error, try again
								</Alert>}
							</Stack>
						</form>
					</Box>
				</Center>
			</main>
		</div>
	)
}

export default Login
