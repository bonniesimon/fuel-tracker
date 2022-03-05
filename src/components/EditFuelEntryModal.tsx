import { Box, Button, FormControl, FormLabel, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FuelEntryType } from "../context/CarsContext";

interface Props{
    isOpen: boolean;
    onClose: () => void;
    currentFuelEntry: FuelEntryType;
}

const EditFuelEntryModal: FC<Props> = ({isOpen, onClose, currentFuelEntry}) => {
	const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: currentFuelEntry
    });


	const onEditFormSubmit = () => {

	};

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>Edit Fuel Entry</ModalHeader>
					<ModalCloseButton/>
					<Box p="6">
                    
                            <form onSubmit={handleSubmit(onEditFormSubmit)}>
                                <VStack spacing="25">
                                    <FormControl>
                                        <FormLabel htmlFor="entryDate">Entry Date</FormLabel>
                                        <Input
                                            id="entryDate"
                                            type="text"
                                            placeholder="Enter the Date in dd/mm/yyyy"
                                            {...register("entryDate", {
                                                required: "Please enter name",
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="amount">Amount</FormLabel>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter Amount in ₹"
                                            {...register("amount", {
                                                required: "Please enter amount in ₹",
                                                maxLength: 5,
                                            })}
                                    />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="litres">Litres</FormLabel>
                                        <Input
                                            id="litres"
                                            type="number"
                                            step="any"
                                            placeholder="Enter Litres in L"
                                            {...register("litres", {
                                                required: "Please enter litres in L",
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="pricePerLitre">Price Per Litre</FormLabel>
                                        <Input
                                            id="pricePerLitre"
                                            type="number"
                                            step="any"
                                            placeholder="Enter Price per litre in ₹"
                                            {...register("pricePerLitre", {
                                                required: "Please enter amount in ₹",
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="kilometerReading">Kilometer Reading</FormLabel>
                                        <Input
                                            id="kilometerReading"
                                            type="number"
                                            placeholder="Enter Kilometer Reading in KM"
                                            defaultValue={currentFuelEntry.kilometerReading}
                                            {...register("kilometerReading", {
                                                required: "Please enter Kilometre in KM",
                                            })}
                                            />
                                        </FormControl>
                                    <Button type="submit" disabled>Update</Button>
                                </VStack>
                            </form>
                        </Box>
                    </ModalContent>
                </Modal>
        </>
    );
};

export default EditFuelEntryModal;
