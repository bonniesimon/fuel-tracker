import { convertApiDataToFuelType } from "./serialize";

const fetchFuelEntryByCarID = async (url: string): Promise<any>=> {
	const res = await fetch(url);
	// const json = await res.json();
	// console.log(json);
	// return convertApiDataToFuelType(json);
	// return await res.json();
	const json = await res.json();
	const formattedData = convertApiDataToFuelType(json);
	return new Promise((resolve, reject) => {
		resolve(formattedData);
	})
}

export {fetchFuelEntryByCarID};