import {
    Button,
    Circle,
    Divider,
    Flex,
    HStack,
    Spacer,
    Text,
    VStack,
    useToast
} from "@chakra-ui/react";
import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { FuelEntryType } from "../context/CarsContext";
import config from "../config/config";
import { useSWRConfig } from "swr";

const FuelEntry: FC<FuelEntryType> = ({
        id,
        carID,
        amount,
        kilometerReading,
        entryDate,
        litres,
        pricePerLitre,
    }) => {
    const toast = useToast();
    const {mutate} = useSWRConfig();

    const deleteFuelEntryHandler = async (fuelEntryID: string) => {
        const deleteFuelEntryEndPoint: string = `${config.backendUrl}/api/fuelentry/delete/${fuelEntryID}`;
        const carByIDEndpoint: string = `${config.backendUrl}/api/fuelentry/${carID}`;
        
        mutate(carByIDEndpoint, async(currentData: any) => {
            const filteredData: any = currentData.filter((fuelEntry:any) => fuelEntry.id !== id);
            return [...filteredData];
        }, false);

        try {
            const deleteFuelEntryResponse = await fetch(deleteFuelEntryEndPoint, {
                method: 'DELETE'
            });

            const jsonResponse = deleteFuelEntryResponse.json();
            toast({
                title: "Fuel Entry Deleted",
                description: "We have deleted the fuel entry",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } catch (e: any) {
            toast({
                title: "Fuel entry cannot be deleted",
                description: "Some error",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        mutate(carByIDEndpoint);
    };

    return (
        <VStack
            p="6"
            my="5"
            w="60%"
            mx="auto"
            bgColor="brand.backgroundLight"
            boxShadow="base"
            _hover={{
                boxShadow: "2xl",
            }}
        >
            <HStack w="100%" justify="space-between">
                <Text>{entryDate}</Text>
                <Text>{kilometerReading} Km</Text>
            </HStack>
            <Circle size="125px" bgColor="brand.background">
                <VStack>
                    <Text fontWeight="bold">₹{amount}</Text>
                    <Divider size="xl" />
                    <Text fontWeight="bold">{litres} L</Text>
                </VStack>
            </Circle>
            <Text>₹{pricePerLitre} / L</Text>
            <Flex w="100%">
                <Button
                    px="3"
                    py="1"
                    variant="outline"
                    bgColor="brand.backgroundLight"
                    color="brand.primary"
                    _hover={{
                        bgColor: "gray.400",
                        color: "brand.background",
                    }}
                    rightIcon={<FaRegEdit/>}
                >
                    Edit
                </Button>
                <Spacer />
                <Button
                    px="3"
                    py="1"
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={() => deleteFuelEntryHandler(id)}
                >
                    Delete
                </Button>
            </Flex>
        </VStack>
    );
};

export default FuelEntry;
