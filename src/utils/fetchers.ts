import { convertApiDataToFuelType } from "./serialize";

const fetchFuelEntryByCarID = async (url: string) => {
	const res = await fetch(url);
	// const json = await res.json();
	// console.log(json);
	// return convertApiDataToFuelType(json);
	return await res.json();
}

export {fetchFuelEntryByCarID};