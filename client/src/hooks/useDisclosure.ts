import { useState } from "react";

const useDisclosure = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return {
    isModalOpen,
    onModalOpen,
    onModalClose,
    toggleModal,
  };
};

export default useDisclosure;
