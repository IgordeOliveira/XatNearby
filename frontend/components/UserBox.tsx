import { Box, Heading, Text, VStack, chakra, Spacer, Flex } from '@chakra-ui/react'
import { User } from '../services/user.service'
import Image from 'next/image'
import Link from 'next/link';
import crypto from 'crypto';

interface Props {
  content: User;
}

const ChakraNextImage = chakra(Image);

const myLoader = ({src}) => {
  return src + crypto.randomBytes(20).toString('hex')

}

export default function ({ content: userInfo }: Props) {
  return (
    <Link href={'/chat/' + userInfo.id} >
      <Box boxShadow='base' style={{ 'aspectRatio': '1/1' }} position='relative' >
        <ChakraNextImage loader={myLoader} src='https://api.lorem.space/image/face?w=500&h=500&hash=' layout='fill' objectFit='cover' />
        <Flex align='flex-end' bgGradient='linear(to-b, blackAlpha.50, black)' blur='sm' position='absolute' bottom='0' h='20' w='100%' p='2' >
          <Flex direction='column'>
            <Text noOfLines={1} fontSize='lg' color='brand.white'>{userInfo.name}</Text>
            <Text fontSize='xs' mt='0' color='brand.white'>{userInfo.distance}</Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}