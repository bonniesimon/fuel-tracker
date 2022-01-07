import { Box, Heading, VStack } from "@chakra-ui/react"
import { CarsContextProvider } from "../context/CarsContext"

const Home = () => {
	return (
		<CarsContextProvider>
			<div>
				<Box>
					<Heading as="h1">Cars</Heading>		
					<VStack spacing="4">

					</VStack>
				</Box>	
			</div>
		</CarsContextProvider>
	)
}

export default Home
