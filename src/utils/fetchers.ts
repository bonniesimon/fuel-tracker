import { convertApiDataToCarType, convertApiDataToFuelType } from "./serialize";

const fetchFuelEntryByCarID = async (url: string): Promise<any>=> {
	const res = await fetch(url);
	const json = await res.json();
	const formattedData = convertApiDataToFuelType(json);
	return new Promise((resolve, reject) => {
		resolve(formattedData);
	})
}

const fetchAllCars = async (url: string): Promise<any> => {
	const res = await fetch(url);
	const json = await res.json();
	const formattedData = convertApiDataToCarType(json);
	return new Promise((resolve, reject) => {
		resolve(formattedData);
	})
}

export {fetchFuelEntryByCarID, fetchAllCars};