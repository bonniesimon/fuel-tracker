import { CarsStateType, CarType } from "../context/CarsContext";

const CarsReducer = (state: CarsStateType, action: any) => {
	switch(action.type){
		case "TEST":
			const newTestCar: CarType = {
				carID: "asdlfkjasldkfjalskdj",
				carName: "Logan",
				fuelType: "Diesel"
			}
			return{
				...state,
				cars : [...state.cars, newTestCar]
			}
		default: 
			return{
				...state
			}
	}
}

export default CarsReducer;