import { Badge, Box, Center, CircularProgress, Container, Heading, Skeleton, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import config from "../config/config";
import CarsContext, { CarType } from "../context/CarsContext";
import { fetchAllCars } from "../utils/fetchers";

const Home = () => {
    const { dispatch } = useContext(CarsContext);
    const {data, error} = useSWR(`${config.backendUrl}/api/car/all`, fetchAllCars);
    useEffect(() => {
        if(!data) return;
        dispatch({
            type: "FETCH_CARS_SUCCESS",
            payload: data
         })
    }, [data]);
    return (
        <VStack w="80%" minHeight="100%" align="center" justify="center">
            <Heading as="h1">Cars</Heading>
            <VStack w="40%" spacing="4" align="stretch">
                {(!error && !data) ?
                    <Center><CircularProgress isIndeterminate color="green.500"/></Center>
                :
                    (data && data.length > 0 )?
                        data.map((car: CarType) => (
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
                        ))
                    :
                        <Center>
                            <Badge variant="outline" colorScheme="red">
                                No Cars Present. Create one!
                            </Badge>
                        </Center>
                }
            </VStack>
        </VStack>
    );
};

export default Home;
