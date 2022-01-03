import { createContext, FC, useReducer } from "react";
import { PerDirectoryResolutionCache } from "typescript";
import config from "../config/config";

type Fuel = "Diesel" | "Petrol";

interface CarsType{
	carID: string;
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

interface CarsContextType{
	cars: CarsType[];
	carDetails: CarDetailsType[];
}

const initialData: CarsContextType = {
	cars: [{
		carID: "",
		carName: "",
		fuelType: "Petrol"
	}],
	carDetails: [{
		carID: "",
		entryDate: "",
		amount: 0,
		litres: 0,
		pricePerLitre: 0,
		kilometerReading: 0
	}]
}

// const CarsContextProvider: FC = () => {

// }