import { Box, Heading, Text, VStack, chakra, Spacer, Flex } from '@chakra-ui/react'
import userService, { User } from '../services/user.service'
import Image from 'next/image'
import crypto from 'crypto';
import { useRouter } from 'next/router'

interface Props {
  content: User;
}

const ChakraNextImage = chakra(Image);

const myLoader = ({ src }) => {
  return src + crypto.randomBytes(20).toString('hex')
}

export default function ({ content: userInfo }: Props) {
  const router = useRouter()

  const openChat = async (userId: number) => {
    try{
      router.push({pathname: '/chat', query: {userId: userId}} , '/chat')
    }catch(err){console.error(err)}
  }

  return (
    <Box boxShadow='base' style={{ 'aspectRatio': '1/1' }} position='relative' onClick={() => openChat(userInfo.id)}>
      <ChakraNextImage loader={myLoader} src='https://api.lorem.space/image/face?w=500&h=500&hash=' layout='fill' objectFit='cover' />
      <Flex align='flex-end' bgGradient='linear(to-b, blackAlpha.50, black)' blur='sm' position='absolute' bottom='0' h='20' w='100%' p='2' >
        <Flex direction='column'>
          <Text noOfLines={1} fontSize='lg' color='brand.white'>{userInfo.name}</Text>
          <Text fontSize='xs' mt='0' color='brand.white'>{userInfo.distance}</Text>
        </Flex>
      </Flex>
    </Box>
  )
}