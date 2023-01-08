import { useState } from "react";

const useModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return { isOpen, closeModal, openModal };
};

export default useModal;
