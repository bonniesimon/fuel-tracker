import { createContext, FC, useEffect, useReducer } from "react";
import CarsReducer from "../reducers/CarsReducer";
import config from "../config/config";
import useLocalStorage from "../hooks/useLocalStorage";
import { Divider } from "@chakra-ui/react";

type Fuel = "Diesel" | "Petrol";

interface CarType{
	id: number;
	carName: string;
	fuelType: Fuel;
}

interface CarDetailsType{
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
	carDetails: CarDetailsType[];
}

const initialState: CarsStateType = {
	cars: [{
		id: 0,
		carName: "Logan",
		fuelType: "Diesel"
	},
	{
		id: 1,
		carName: "Kwid",
		fuelType: "Petrol"
	}],
	isCarsFetched: true,
	carDetails: [{
		carID: "",
		entryDate: "",
		amount: 0,
		litres: 0,
		pricePerLitre: 0,
		kilometerReading: 0
	}]
}

const CarsContext = createContext<{state: CarsStateType, dispatch: Function}>({
	state: initialState,
	dispatch: () => 0
});


const CarsContextProvider: FC = ({children}) => {
	const [state, dispatch] = useReducer(CarsReducer, initialState);

	const [isDataFetchedLS, setIsDataFetchedLS] = useLocalStorage("isDataFetched", false);
	const [fetchedDataCache, setFetchedDataCache] = useLocalStorage("fetchedData",initialState);

	/**
	 * Commented out since Sheety free quota expired.
	 *  */	
	// useEffect(() => {
	// 	if(!isDataFetchedLS){
	// 		setIsDataFetchedLS(false);
	// 		setFetchedDataCache(initialState);
	// 	}
	// 	const getCarsFromAPI = async (url: string) => {
	// 		try{
	// 			const res = await fetch(url);
	// 			let data = await res.json();
	// 			data = data.cars;
	// 			console.log(data);
	// 			dispatch({
	// 				type: "FETCH_CARS_SUCCESS",
	// 				payload: data
	// 			 })
	// 			setCacheData(data);
	// 		}catch(e: any){
	// 			console.log("Error", e);
	// 		}
	// 	}

	// 	const setCacheData = (data: CarsStateType) => {
	// 		if(state.isCarsFetched){
	// 			setFetchedDataCache(data);
	// 			setIsDataFetchedLS(true);
	// 		}
	// 	}

	// 	if(isDataFetchedLS){
	// 		dispatch({
	// 			type: "FETCH_CARS_SUCCESS",
	// 			payload: fetchedDataCache
	// 		})
	// 		console.log("Using cached data");
	// 	}else{
	// 		getCarsFromAPI(config.carsApiUrl);
	// 	}
	// }, []);	
	
	return(
		<CarsContext.Provider value={{state, dispatch}}>
			{children}
		</CarsContext.Provider>
	)
};



export {CarsContextProvider};

export default CarsContext;
export type {CarsStateType, CarDetailsType, CarType};