import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
const Modal = ({ isOpen, onToggleModal, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 h-screen z-40 w-screen backdrop-blur grid place-items-center">
          <div className=" min-w-[80%] relative z-50 m-auto bg-white rounded-lg p-2">
            <div className="flex justify-end">
              <AiOutlineClose
                className="text-2xl self-end cursor-pointer"
                onClick={onToggleModal}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
