import { Box, Container, Heading, Skeleton, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
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
                        <Link 
                            key={car.id}
                            to={`car/${car.id}`}
                        >
                            <Box
                                bgColor="brand.backgroundLight"
                                boxShadow="sm"
                                rounded="md"
                                p="6"
                                my="2"
                                _hover={{
                                    boxShadow: "lg",
                                }}
                            >
                                {car.carName}
                            </Box>
                        </Link>
                    ))}
                </Skeleton>
            </VStack>
        </VStack>
    );
};

export default Home;
