import { Input, Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import config from "../config/config";
import { FuelEntryType } from "../context/CarsContext";

/**
 * TODO: Implement method to calculate price per litre when entering
 * 	amount and litres 
 */

interface IProps{
    carID: string | undefined;
    onClose: () => void;
}

const AddFuelEntryForm = ({carID, onClose}: IProps) => {
    const toast = useToast();
    const carByIDEndpoint: string = `${config.backendUrl}/api/fuelentry/${carID}`;

    const {mutate} = useSWRConfig();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = async (data: any) => {
        let {amount, kilometerReading, litres, pricePerLitre} = data;
        amount = parseInt(amount);
        kilometerReading = parseInt(kilometerReading);
        litres = parseFloat(litres);
        pricePerLitre = parseFloat(pricePerLitre);
        const updatedFormDataDataTypes = {...data, amount, kilometerReading, litres, pricePerLitre};
        const fuelEntryFromForm: FuelEntryType = {carID, ...updatedFormDataDataTypes};

        mutate(carByIDEndpoint, async (currentData: any) => { return [fuelEntryFromForm, ...currentData] } ,false);
        try{
            const updateFuelEntryResponse = await fetch(`${config.backendUrl}/api/fuelentry/create`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(fuelEntryFromForm)
            })  
            const jsonResponse = await updateFuelEntryResponse.json();
            toast({
                title: "Fuel Entry Added.",
                description: "We added the fuel entry for you.",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        }catch(e: any){
            toast({
                title: "Error While Adding Fuel Entry.",
                description: "Some error occured. Entry not updated.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            console.log(e);
        }
        mutate(carByIDEndpoint);
        onClose();
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
