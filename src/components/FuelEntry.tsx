import { Box, Circle, Divider, HStack, Spacer, Text, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { FuelEntryType } from "../context/CarsContext"

const FuelEntry: FC<FuelEntryType> = ({carID, amount, kilometerReading, entryDate, litres, pricePerLitre}) => {
	return (
		<VStack p="6" w="60%" mx="auto" bgColor="brand.backgroundLight">
			<HStack w="100%" justify="space-between">
				<Text>{entryDate}</Text>
				<Text>{kilometerReading} Km</Text>
			</HStack>
			<Circle size="125px" bgColor="brand.background">
				<VStack>
					<Text fontWeight="bold">₹{amount}</Text>
					<Divider size="xl"/>
					<Text fontWeight="bold">{litres} L</Text>
				</VStack>
			</Circle>
			<Text>₹{pricePerLitre} / L</Text>
		</VStack>
	)
}

export default FuelEntry
