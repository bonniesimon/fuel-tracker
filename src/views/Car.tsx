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
    Badge,
    CircularProgress
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import CarsContext, { FuelEntryType, CarType } from "../context/CarsContext";
import FuelEntry from "../components/FuelEntry";
import AddFuelEntryForm from "../components/AddFuelEntryForm";
import config from "../config/config";
import { convertApiDataToFuelType } from "../utils/serialize";
import { fetchFuelEntryByCarID } from "../utils/fetchers";


const Car = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();

    let carid: string = '';
    const params = useParams();
    if (params.carid !== undefined) {
        carid = params.carid;
    }
    const { state } = useContext(CarsContext);

    const [carDetail, setCarDetail] = useState<CarType>();

    const carByIDEndpoint: string = `${config.backendUrl}/api/fuelentry/${carid}`;
    const {data, error} = useSWR(carByIDEndpoint, fetchFuelEntryByCarID); 
    useEffect(() => {
        const carDetailsFromState = state.cars.filter(
            (car) => car.id === carid
        );
        setCarDetail(carDetailsFromState[0]);
    }, []);

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
            {(!error && !data) ? 
                <Center><CircularProgress isIndeterminate color="green.500"/></Center>
            : 
                (data.length === 0) ?
                        <Center>
                            <Badge variant="outline" colorScheme="red">
                                No Entries Present. Create one!
                            </Badge>
                        </Center> 
                :
                        convertApiDataToFuelType(data).map((fuelEntry, index) => (
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
                
            }

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
