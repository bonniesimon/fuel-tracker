import {
    Heading,
    VStack,
    Text,
    Box,
    Center,
    Flex,
    Spacer,
    IconButton,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarsContext, { FuelEntryType, CarType } from "../context/CarsContext";
import FuelEntry from "../components/FuelEntry";
import AddFuelEntryForm from "../components/AddFuelEntryForm";

const Car = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();

    let carid: string;
    const params = useParams();
    if (params.carid !== undefined) {
        carid = params.carid;
    }
    const { state } = useContext(CarsContext);

    const [carDetail, setCarDetail] = useState<CarType>();
    const [carFuelEntries, setCarFuelEntries] = useState<FuelEntryType[]>();

    useEffect(() => {
        // TODO: Abstract the below code to Reverse the array into a function since
        //      it is used in two places.
        const fuelEntriesOfCarFromState = state.fuelEntries.filter(
            (fuelEntry) => fuelEntry.carID === carid
        );
        const ReversedFuelEntriesOfCarFromState = fuelEntriesOfCarFromState
            .slice()
            .reverse();
        setCarFuelEntries(ReversedFuelEntriesOfCarFromState);

        const carDetailsFromState = state.cars.filter(
            (car) => car.id === carid
        );
        setCarDetail(carDetailsFromState[0]);
    }, []);

    useEffect(() => {
        const fuelEntriesOfCarFromState = state.fuelEntries.filter(
            (fuelEntry) => fuelEntry.carID === carid
        );
        const ReversedFuelEntriesOfCarFromState = fuelEntriesOfCarFromState
            .slice()
            .reverse();
        setCarFuelEntries(ReversedFuelEntriesOfCarFromState);
    }, [state.fuelEntries])

    return (
        <Box w="80%">
            <Flex w="60%" mx="auto" my="9" align="center">
                <VStack align="flex-start" justify="center">
                    <Text opacity="0.7">{carDetail?.fuelType}</Text>
                    <Heading>{carDetail?.carName}</Heading>
                </VStack>
                <Spacer />
                <IconButton onClick={onOpen} aria-label="Add fuel entry" icon={<AddIcon />} />
            </Flex>
            {carFuelEntries && carFuelEntries?.length > 0 ? (
                carFuelEntries?.map((fuelEntry, index) => (
                    <FuelEntry
						key={index}
                        carID={fuelEntry.carID}
                        entryDate={fuelEntry.entryDate}
                        amount={fuelEntry.amount}
                        kilometerReading={fuelEntry.kilometerReading}
                        litres={fuelEntry.litres}
                        pricePerLitre={fuelEntry.pricePerLitre}
                    />
                ))
            ) : (
                <Center>
                    <Text>No Entries to List</Text>
                </Center>
            )}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>Add Fuel Entry</ModalHeader>
					<ModalCloseButton/>
					<Box p="6">
						<AddFuelEntryForm carID={carDetail?.id}/>
					</Box>
				</ModalContent>
			</Modal>
        </Box>
    );
};

export default Car;
