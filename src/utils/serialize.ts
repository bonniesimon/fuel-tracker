import { CarType } from "../context/CarsContext";


const convertApiDataToCarType = (apiData: any): CarType[] => {
	const carDataFormated: CarType[] = apiData.map((data: any) => {
		return {
			id: data._id,
			carName: data.carName,
			fuelType: data.fuelType
		}
	})

	return carDataFormated;
}

export {convertApiDataToCarType};