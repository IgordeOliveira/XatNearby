import { Flex, Input, Button } from "@chakra-ui/react";

export default function() {
  return (
    <Flex w="100%" p='1'>
  	<Input
    	placeholder="Type Something..."
    	borderRadius="md"
    	_focus={{
      	border: "1px solid blue.500",
    	}}
  	/>
  	<Button
    	bg="blue.500"
    	color="white"
    	borderRadius="md"
    	_hover={{
      	bg: "blue.100",
    	}}
  	>
    	Send
  	</Button>
	</Flex>
  )
}