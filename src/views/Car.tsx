import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import CarsContext, { FuelEntryType, CarType } from "../context/CarsContext";

	const Car = () => {
		let carid: number;
		const params = useParams();
		if(params.carid !== undefined){
			carid = parseInt(params.carid);	
		}
		const {state} = useContext(CarsContext);

		const [carDetail, setCarDetail] = useState<CarType[]>();
		const [carFuelEntries, setCarFuelEntries] = useState<FuelEntryType[]>();

		useEffect(() => {
			const fuelEntriesOfCarFromState = state.fuelEntries.filter(fuelEntry=> fuelEntry.carID === carid);
			setCarFuelEntries(fuelEntriesOfCarFromState);	

			const carDetailsFromState = state.cars.filter(car => car.id === carid);
			setCarDetail(carDetailsFromState);
		}, []);


		return (
			<div>
				<h1>Hey car page here</h1>	
				{carFuelEntries?.map(fuelEntry =>
						<h1 key={fuelEntry.carID}>{fuelEntry.amount}</h1>	
					)}
			</div>
		)
	}
	
	export default Car
	