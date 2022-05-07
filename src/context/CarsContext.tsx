import { createContext, FC, useEffect, useReducer } from "react";
import useSWR from "swr";
import config from "../config/config";
import CarsReducer from "../reducers/CarsReducer";
import { fetchAllCars } from "../utils/fetchers";

type Fuel = "Diesel" | "Petrol";

interface CarType{
	id: string;
	carName: string;
	fuelType: Fuel;
}

interface FuelEntryType{
	id: string;
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
	isCarsFetched: false,
	fuelEntries: []
}

const CarsContext = createContext<{state: CarsStateType, dispatch: Function}>({
	state: initialState,
	dispatch: () => 0
});


const CarsContextProvider: FC = ({children}) => {
	const [state, dispatch] = useReducer(CarsReducer, initialState);
	
	const { data } = useSWR(
        `${config.API_URL}/api/car/all`,
        fetchAllCars
    );

    useEffect(() => {
        if (!data) return;
        dispatch({
            type: "FETCH_CARS_SUCCESS",
            payload: data,
        });
    }, [data]);

	return(
		<CarsContext.Provider value={{state, dispatch}}>
			{children}
		</CarsContext.Provider>
	)
};



export {CarsContextProvider};

export default CarsContext;
export type {CarsStateType, FuelEntryType, CarType};