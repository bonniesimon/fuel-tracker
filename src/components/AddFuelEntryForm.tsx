import { Input, Button, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import CarsContext, { FuelEntryType } from "../context/CarsContext";

/**
 * TODO: Implement method to calculate price per litre when entering
 * 	amount and litres 
 */

interface IProps{
    carID: number | undefined;
}

const AddFuelEntryForm = ({carID}: IProps) => {
    const {dispatch} = useContext(CarsContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = (data: any) => {
        const fuelEntryFromForm: FuelEntryType = {carID, ...data};
        dispatch({
            type: "ADD_FUEL_ENTRY",
            payload: fuelEntryFromForm
        })
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <VStack spacing="25">
                <Input
                    type="text"
                    placeholder="Enter the Date in dd/mm/yyyy"
                    value={new Date().toLocaleDateString()}
                    {...register("entryDate", {
                        required: "Please enter name",
                    })}
                />
                <Input
                    type="number"
                    placeholder="Enter Amount in ₹"
                    {...register("amount", {
                        required: "Please enter amount in ₹",
                        maxLength: 5,
                    })}
                />
                <Input
                    type="number"
                    step="any"
                    placeholder="Enter Litres in L"
                    {...register("litres", {
                        required: "Please enter litres in L",
                    })}
                />
                <Input
                    type="number"
                    step="any"
                    placeholder="Enter Price per litre in ₹"
                    {...register("pricePerLitre", {
                        required: "Please enter amount in ₹",
                    })}
                />
                <Input
                    type="number"
                    placeholder="Enter Kilometer Reading in KM"
                    {...register("kilometerReading", {
                        required: "Please enter Kilometre in KM",
                    })}
                />
                <Button type="submit">Submit</Button>
            </VStack>
        </form>
    );
};

export default AddFuelEntryForm;
