import { CarsStateType, CarType, FuelEntryType } from "../context/CarsContext";
import config from '../config/config';

const CarsReducer = (state: CarsStateType, action: any): CarsStateType => {
	let fuelEntry: FuelEntryType;
	switch(action.type){
		case "TEST":
			const newTestCar: CarType = {
				id:"1231jkhjk",
				carName: "Logan",
				fuelType: "Diesel"
			}
			return{
				...state,
				cars : [...state.cars, newTestCar]
			}
		case "FETCH_CARS_SUCCESS":
			const fetchedCars = action.payload;
			return{
				...state,
				isCarsFetched: true,
				cars: fetchedCars
			}
		case "ADD_FUEL_ENTRY":
			fuelEntry = action.payload;
			// TODO: Implement logic to POST to backend
			
			// Assume the following variable is returned 
			// after successfull insertion into DB
			const successfullEntryToDB: FuelEntryType = fuelEntry;
			return{
				...state,
				fuelEntries: [...state.fuelEntries, successfullEntryToDB]
			}
		case "FETCH_FUEL_ENTRY_BY_CARID":
			const carID: string = action.payload;
			// let fetchedData;
			// const fetchDataFromAPI = async () => {
			// 	const res = await fetch(`${config.backendUrl}/api/fuelentry/${carID}`);
			// 	fetchedData = await res.json();
			// }
			
			// fetchDataFromAPI();
			// console.log(fetchedData);
			return {
				...state
			}
		case "FETCH_FUEL_ENTRY_BY_CARID_SUCCESS":
			fuelEntry = action.payload;
			return {
				...state,
				fuelEntries: [fuelEntry, ...state.fuelEntries]
			}

		default: 
			return{
				...state
			}
	}
}

export default CarsReducer;