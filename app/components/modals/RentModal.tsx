'use client';
import Modal from "./modal";
import useRentalModal from "@/app/hooks/useRentModal";

const RentModal = ()=>{
    const RentModal =useRentalModal();
    return (
        <Modal
        isOpen ={RentModal.isOpen}
        onClose={RentModal.onClose}
        onSubmit={RentModal.onClose}
        actionLabel="Submit"
        title="Kiray YOur Home"
        />
    );
}

export default RentModal;