import { CarsStateType, CarType } from "../context/CarsContext";

const CarsReducer = (state: CarsStateType, action: any) => {
	switch(action.type){
		case "TEST":
			const newTestCar: CarType = {
				id: 111,
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
		default: 
			return{
				...state
			}
	}
}

export default CarsReducer;