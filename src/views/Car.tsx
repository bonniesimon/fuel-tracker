import { Heading, VStack, Text, Box, Center } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FuelEntry from "../components/FuelEntry";
import CarsContext, { FuelEntryType, CarType } from "../context/CarsContext";

	const Car = () => {
		let carid: number;
		const params = useParams();
		if(params.carid !== undefined){
			carid = parseInt(params.carid);	
		}
		const {state} = useContext(CarsContext);

		const [carDetail, setCarDetail] = useState<CarType>();
		const [carFuelEntries, setCarFuelEntries] = useState<FuelEntryType[]>();

		useEffect(() => {
			const fuelEntriesOfCarFromState = state.fuelEntries.filter(fuelEntry=> fuelEntry.carID === carid);
			const ReversedFuelEntriesOfCarFromState = fuelEntriesOfCarFromState.slice().reverse();
			setCarFuelEntries(ReversedFuelEntriesOfCarFromState);	

			const carDetailsFromState = state.cars.filter(car => car.id === carid);
			setCarDetail(carDetailsFromState[0]);
		}, []);


		return (
			<Box w="80%">
				<Center my="5">
				<VStack align="flex-start" justify="center">
					<Text opacity="0.7">{carDetail?.fuelType}</Text>
					<Heading>{carDetail?.carName}</Heading>
				</VStack>
				</Center>
				{carFuelEntries?.map(fuelEntry =>
						<FuelEntry
							carID={fuelEntry.carID}
							entryDate={fuelEntry.entryDate}
							amount={fuelEntry.amount}
							kilometerReading={fuelEntry.kilometerReading}
							litres={fuelEntry.litres}
							pricePerLitre={fuelEntry.pricePerLitre}
						/>
					)}
			</Box>
		)
	}
	
	export default Car
	