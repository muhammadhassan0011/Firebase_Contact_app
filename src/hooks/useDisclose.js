import { useState } from "react";

const useDisclose = () => {
  // For toggling modal : _____>
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleModal() {
    setIsOpen((prev) => !prev);
  }

  return { isOpen, handleToggleModal };
};

export default useDisclose;
