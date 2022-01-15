import { Input, Button, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

/**
 * TODO: Implement method to calculate price per litre when entering
 * 	amount and litres 
 */

const AddFuelEntryForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <VStack spacing="25">
                <Input
                    type="text"
                    placeholder="Enter the Date in dd/mm/yyyy"
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
