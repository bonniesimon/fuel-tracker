import { createIdentifier } from "typescript";
import { CarType, FuelEntryType } from "../context/CarsContext";


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

export {convertApiDataToCarType, convertApiDataToFuelType};