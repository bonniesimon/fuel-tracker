import { AddIcon } from "@chakra-ui/icons";
import {
    Badge,
    Box,
    Center,
    CircularProgress,
    Flex,
    Heading,
    IconButton,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AddCarEntryForm from "../components/AddCarEntryForm";
import CarsContext, { CarType } from "../context/CarsContext";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const { state } = useContext(CarsContext);
    return (
        <VStack w="80%" minHeight="100%" align="center" justify="center">
            <Flex w={{base: "90%", md: "60%", lg: "40%"}} mx="auto" my="9" align="center">
                <Heading>Cars</Heading>
                <Spacer />
                <IconButton
                    onClick={onOpen}
                    aria-label="Add Vehicle"
                    icon={<AddIcon />}
                />
            </Flex>
            <VStack w={{base: "90%", md: "60%", lg: "40%"}} spacing="4" align="stretch">
                {!state.isCarsFetched && !state.cars? (
                    <Center>
                        <CircularProgress isIndeterminate color="green.500" />
                    </Center>
                ) : state.cars && state.cars.length > 0 ? (
                    state.cars.map((car: CarType) => (
                        <Link key={car.id} to={`car/${car.id}`}>
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
                ) : (
                    <Center>
                        <Badge variant="outline" colorScheme="red">
                            No Cars Present. Create one!
                        </Badge>
                    </Center>
                )}

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Vehicle</ModalHeader>
                        <ModalCloseButton />
                        <Box p="6">
                            <AddCarEntryForm onClose={onClose} />
                        </Box>
                    </ModalContent>
                </Modal>
            </VStack>
        </VStack>
    );
};

export default Home;
