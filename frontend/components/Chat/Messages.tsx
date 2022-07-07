import { Avatar, Flex, Text } from '@chakra-ui/react'

export type messageBag = {
  from: string,
  text: string
}

interface Props {
  messageBag: messageBag[];
}
export default function ({ messageBag }: Props) {
  return (
    <Flex overflowY="scroll" flexDirection="column" alignContent='flex-end' p="3" flex='1'>
      {messageBag.map((item, index) => {
        if (item.from === "me") {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="black"
                color="white"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                rounded='full'
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w="100%">
              <Flex
                rounded='full'
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
    </Flex>
    )
}