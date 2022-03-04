import { createIdentifier, idText } from "typescript";
import { CarType, FuelEntryType } from "../context/CarsContext";


const convertToFuelEntryType = (data: any): FuelEntryType => {
	return {
		id: data.id,
		carID: data.carID,
		amount: parseInt(data.amount),
		entryDate: data.entryDate,
		kilometerReading: parseInt(data.kilometerReading),
		litres: parseFloat(data.litres),
		pricePerLitre: parseFloat(data.pricePerLitre)
	}
}

const convertApiDataToCarType = (apiData: any): CarType[] => {
	const carDataFormated: CarType[] = apiData.map((data: any) => {
		return {
			id: data._id,
			carName: data.carName,
			fuelType: data.fuelType
		}
	})

	return carDataFormated;
}

const convertApiDataToFuelType = (apiData: any): FuelEntryType[] => {
	const fuelEntryDataFormatted: FuelEntryType[] = apiData.map((data: any) => {
		return{
			id: data._id,
			carID: data.carID,
			entryDate: data.entryDate,
			amount: data.amount,
			litres: data.litres,
			pricePerLitre: data.pricePerLitre,
			kilometerReading: data.kilometerReading
		}
	})

	return fuelEntryDataFormatted;
}

export {convertApiDataToCarType, convertApiDataToFuelType, convertToFuelEntryType};