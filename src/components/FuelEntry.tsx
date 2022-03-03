import {
    Button,
    Circle,
    Divider,
    Flex,
    HStack,
    Spacer,
    Text,
    VStack,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogHeader,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { FuelEntryType } from "../context/CarsContext";
import config from "../config/config";
import { useSWRConfig } from "swr";
import { FocusableElement } from "@chakra-ui/utils";
import EditFuelEntryModal from "./EditFuelEntryModal";

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
    const { mutate } = useSWRConfig();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
    const cancelRef: any = useRef();

    const deleteFuelEntryHandler = async (fuelEntryID: string) => {
        const deleteFuelEntryEndPoint: string = `${config.API_URL}/api/fuelentry/delete/${fuelEntryID}`;
        const carByIDEndpoint: string = `${config.API_URL}/api/fuelentry/${carID}`;

        mutate(
            carByIDEndpoint,
            async (currentData: any) => {
                const filteredData: any = currentData.filter(
                    (fuelEntry: any) => fuelEntry.id !== id
                );
                return [...filteredData];
            },
            false
        );

        try {
            const deleteFuelEntryResponse = await fetch(
                deleteFuelEntryEndPoint,
                {
                    method: "DELETE",
                }
            );

            const jsonResponse = deleteFuelEntryResponse.json();
            toast({
                title: "Fuel Entry Deleted",
                description: "We have deleted the fuel entry",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (e: any) {
            toast({
                title: "Fuel entry cannot be deleted",
                description: "Some error",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
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
                    rightIcon={<FaRegEdit />}
                    onClick={onEditOpen}
                >
                    Edit
                </Button>
                <EditFuelEntryModal isOpen={isEditOpen} onClose={onEditClose}/>
                <Spacer />
                <Button
                    px="3"
                    py="1"
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<DeleteIcon />}
                    onClick={onOpen}
                >
                    Delete
                </Button>

                <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Delete?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to delete the fuel entry?<br/>
                            This action cannot be reverted!
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => deleteFuelEntryHandler(id)}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Flex>
        </VStack>
    );
};

export default FuelEntry;
