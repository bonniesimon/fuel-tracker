import { Box, Container, Heading, Skeleton, VStack } from "@chakra-ui/react"
import { useContext } from "react"
import CarsContext from "../context/CarsContext"
import { CarsContextProvider } from "../context/CarsContext"


const Home = () => {
	const {state} = useContext(CarsContext);
	return (
			<div>
				<Box>
					<Heading as="h1">Cars</Heading>		
					<VStack spacing="4" align="stretch">
						<Skeleton isLoaded={state.isCarsFetched} noOfLines={2} my={2} height="xl">
								{state.cars.map(car => 
									<Box w="100px" key={car.id}>{car.carName}</Box>	
									)	
								}
						</Skeleton>
					</VStack>
				</Box>	
			</div>
	)
}

export default Home
