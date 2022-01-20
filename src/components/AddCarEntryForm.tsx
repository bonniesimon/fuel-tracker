import { Input, Button, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import config from "../config/config";


interface IProps{
    onClose: () => void;
}

const AddCarEntryForm = ({onClose}: IProps) => {    
    const toast = useToast();

    const {mutate} = useSWRConfig();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onFormSubmit = async (data: any) => {
		console.log(data);
		const getAllCarsEndpoint: string = `${config.backendUrl}/api/car/all`;
        mutate(getAllCarsEndpoint, async (currentData: any) => { return [data, ...currentData] } ,false);
        try{
            const createCarResponse = await fetch(`${config.backendUrl}/api/car/create`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })  
            const jsonResponse = await createCarResponse.json();
			console.log("Server response", jsonResponse);
            toast({
                title: "Car Added",
                description: "We added the vehicle for you.",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        }catch(e: any){
            toast({
                title: "Error While Adding Vehicle.",
                description: "Some error occured. Entry not updated.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            console.log(e);
        }
        mutate(getAllCarsEndpoint);
        onClose();
    };


    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <VStack spacing="25">
                <Input
                    type="text"
                    placeholder="Enter Vehicle Name"
                    {...register("carName", {
                        required: "Please Enter Vehicle Name",
                    })}
                />
                <Input
                    type="text"
                    placeholder="Enter Fuel Type: Petrol or Diesel"
                    {...register("fuelType", {
                        required: "Plese Enter Fuel Type",
                    })}
                />
                <Button type="submit">Submit</Button>
            </VStack>
        </form>
    )
};

export default AddCarEntryForm;
