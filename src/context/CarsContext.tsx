import { createContext, FC, useReducer } from "react";
import CarsReducer from "../reducers/CarsReducer";

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
	
	return(
		<CarsContext.Provider value={{state, dispatch}}>
			{children}
		</CarsContext.Provider>
	)
};



export {CarsContextProvider};

export default CarsContext;
export type {CarsStateType, FuelEntryType, CarType};