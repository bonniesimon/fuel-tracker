import { createContext, FC, useEffect, useReducer } from "react";
import CarsReducer from "../reducers/CarsReducer";
import config from "../config/config";
import useLocalStorage from "../hooks/useLocalStorage";
import { Divider } from "@chakra-ui/react";
import {convertApiDataToCarType} from "../utils/serialize";

type Fuel = "Diesel" | "Petrol";

interface CarType{
	id: string;
	carName: string;
	fuelType: Fuel;
}

interface FuelEntryType{
	carID: string;
	entryDate: string;
	amount: number;
	litres: number;
	pricePerLitre: number;
	kilometerReading: number;
}

interface CarsStateType{
	cars: CarType[];
	isCarsFetched: boolean;
	fuelEntries: FuelEntryType[];
}

const initialState: CarsStateType = {
	cars: [],
	// [{
	// 	id: 0,
	// 	carName: "Logan",
	// 	fuelType: "Diesel"
	// },
	// {
	// 	id: 1,
	// 	carName: "Kwid",
	// 	fuelType: "Petrol"
	// }],
	isCarsFetched: true,
	fuelEntries: [
		{
			carID: 0,
			entryDate: "1/11/2022",
			amount: 1000,
			litres: 10.68,
			pricePerLitre: 93.63,
			kilometerReading: 69572
		},
		{
			carID: 0,
			entryDate: "1/15/2022",
			amount: 1000,
			litres: 10.68,
			pricePerLitre: 93.63,
			kilometerReading: 69700
		},
		{
			carID: 0,
			entryDate: "1/17/2022",
			amount: 1000,
			litres: 10.68,
			pricePerLitre: 93.63,
			kilometerReading: 69572
		},
	]
}

const CarsContext = createContext<{state: CarsStateType, dispatch: Function}>({
	state: initialState,
	dispatch: () => 0
});


const CarsContextProvider: FC = ({children}) => {
	const [state, dispatch] = useReducer(CarsReducer, initialState);


	useEffect(() => {
		const getCarsFromAPI = async (url: string) => {
			try{
				const res = await fetch(url);
				let results = await res.json();

				/**
				 * Done to convert the api data to the CarType
				 */
				const carDataFormated: CarType[] = convertApiDataToCarType(results);

				dispatch({
					type: "FETCH_CARS_SUCCESS",
					payload: carDataFormated
				 })
			}catch(e: any){
				console.error("Error", e);
			}
		}

		getCarsFromAPI(`${config.backendUrl}/api/car/all`);
	}, []);	
	
	return(
		<CarsContext.Provider value={{state, dispatch}}>
			{children}
		</CarsContext.Provider>
	)
};



export {CarsContextProvider};

export default CarsContext;
export type {CarsStateType, FuelEntryType, CarType};