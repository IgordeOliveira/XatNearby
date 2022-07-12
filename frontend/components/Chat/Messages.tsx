import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

export type messageBag = {
  // id?:         number;
  content:    string;
  // created_at?: Date;
  isFromMe:   boolean;
}

export type messageBagResponse = {
  id?:         number;
  content:    string;
  created_at?: Date;
  isFromMe:   boolean;
}

export interface Props {
  messageBag: messageBag[];
}

export default function ({ messageBag }: Props) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      console.log('scroll')
      const element = messageRef.current;
      messageRef.current.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }
  }, [messageBag])
  
  return (
    <Flex overflowY="scroll" flexDirection="column" alignContent='flex-end' p="3" flex='1' ref={messageRef} pt='60px'>
      {messageBag.map((item, index) => {
        if (item.isFromMe) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="orange.100"
                color="orange.900"
                maxW="95%"
                rounded='lg'
                py='1'
                px='2'
                mt='2'
              >
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Flex
                rounded='lg'
                bg="gray.200"
                color="grey.900"
                maxW="95%"
                py='1'
                px='2'
                mt='2'

              >
                <Text>{item.content}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
    </Flex>
    )
}