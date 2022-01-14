import { Box, Container, Heading, Skeleton, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import CarsContext from "../context/CarsContext";
import { CarsContextProvider } from "../context/CarsContext";

const Home = () => {
    const { state } = useContext(CarsContext);
    return (
        <VStack w="80%" minHeight="100%" align="center" justify="center">
            <Heading as="h1">Cars</Heading>
            <VStack w="40%" spacing="4" align="stretch">
                <Skeleton
                    isLoaded={state.isCarsFetched}
                    noOfLines={2}
                    my={2}
                    height="xl"
                >
                    {state.cars.map((car) => (
                        <Box 
							key={car.id}
							bgColor="white"
							boxShadow="base"
							rounded="md"
							p="6"
							my="2"
							_hover={{
								boxShadow: "lg"
							}}
						>
							{car.carName}
						</Box>
                    ))}
                </Skeleton>
            </VStack>
        </VStack>
    );
};

export default Home;
