import { Box, Button, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface Props{
    isOpen: boolean;
    onClose: () => void;
}

const EditFuelEntryModal: FC<Props> = ({isOpen, onClose}) => {
	const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


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
                                    <Input
                                        type="text"
                                        placeholder="Enter the Date in dd/mm/yyyy"
                                        defaultValue={new Date().toLocaleDateString()}
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
                        </Box>
                    </ModalContent>
                </Modal>
        </>
    );
};

export default EditFuelEntryModal;
