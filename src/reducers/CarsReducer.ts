import { CarsStateType, CarType, FuelEntryType } from "../context/CarsContext";

const CarsReducer = (state: CarsStateType, action: any): CarsStateType => {
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
			const fuelEntry: FuelEntryType = action.payload;
			// TODO: Implement logic to POST to backend
			
			// Assume the following variable is returned 
			// after successfull insertion into DB
			const successfullEntryToDB: FuelEntryType = fuelEntry;
			return{
				...state,
				fuelEntries: [...state.fuelEntries, successfullEntryToDB]
			}
		default: 
			return{
				...state
			}
	}
}

export default CarsReducer;