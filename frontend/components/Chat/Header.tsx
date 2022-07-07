import { Flex, Box, Spacer, Heading, Center, chakra} from '@chakra-ui/react'
import { HiCog } from "react-icons/hi";

const ChakraHiCog = chakra(HiCog);


export default function () {
	return (
		<Flex as="header" position="fixed" top='0' 
			bgGradient='linear-gradient(90deg, rgba(17,80,122,1) 9%, rgba(230,122,0,0.6674019949776786) 92%)'
			boxShadow='0px 3px 3px -2px rgba(0, 0, 0, 0.2)'
			backdropFilter='saturate(100%) blur(8px)'
			zIndex='sticky'
			w="100%"
			pl='2'
			>
			<Center>
				<Heading fontSize='xl' fontWeight="400" color="brand.white">
					Testing
				</Heading>
			</Center>
			<Spacer />
			<Box p='4'>
				<ChakraHiCog size='25px' color='brand.white'/>
			</Box>
		</Flex>
	)
}