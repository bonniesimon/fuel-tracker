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
	ModalHeader,
    Badge
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarsContext, { FuelEntryType, CarType } from "../context/CarsContext";
import FuelEntry from "../components/FuelEntry";
import AddFuelEntryForm from "../components/AddFuelEntryForm";
import config from "../config/config";
import { convertApiDataToFuelType } from "../utils/serialize";

const Car = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();

    let carid: string;
    const params = useParams();
    if (params.carid !== undefined) {
        carid = params.carid;
    }
    const { state, dispatch } = useContext(CarsContext);

    const [carDetail, setCarDetail] = useState<CarType>();
    const [carFuelEntries, setCarFuelEntries] = useState<FuelEntryType[]>();

    useEffect(() => {
        // TODO: Abstract the below code to Reverse the array into a function since
        //      it is used in two places.

        const fetchDataFromAPI = async (carid: string) => {
            const res = await fetch(`${config.backendUrl}/api/fuelentry/${carid}`);
            if(res.status >= 200 && res.status <= 299){
                const jsonResponse = await res.json();
                const fuelEntryDataFormatted: FuelEntryType[] = convertApiDataToFuelType(jsonResponse);
                dispatch({
                    type: "FETCH_FUEL_ENTRY_BY_CARID_SUCCESS",
                    payload: fuelEntryDataFormatted
                });
            }else{
                console.error("Fetching network resource failed");
            }
        }

        fetchDataFromAPI(carid);

        // dispatch({
        //     type: "FETCH_FUEL_ENTRY_BY_CARID",
        //     payload: carid
        // });
        // const fuelEntriesOfCarFromState = state.fuelEntries.filter(
        //     (fuelEntry) => fuelEntry.carID === carid
        // );
        // const ReversedFuelEntriesOfCarFromState = fuelEntriesOfCarFromState
        //     .slice()
        //     .reverse();
        // setCarFuelEntries(ReversedFuelEntriesOfCarFromState);

        const carDetailsFromState = state.cars.filter(
            (car) => car.id === carid
        );
        setCarDetail(carDetailsFromState[0]);
    }, []);

    // useEffect(() => {
    //     const fuelEntriesOfCarFromState = state.fuelEntries.filter(
    //         (fuelEntry) => fuelEntry.carID === carid
    //     );
    //     const ReversedFuelEntriesOfCarFromState = fuelEntriesOfCarFromState
    //         .slice()
    //         .reverse();
    //     setCarFuelEntries(ReversedFuelEntriesOfCarFromState);
    // }, [state.fuelEntries])

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
                    <Badge variant="outline" colorScheme="red">
                        No Entries Present. Create one!
                    </Badge>
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
