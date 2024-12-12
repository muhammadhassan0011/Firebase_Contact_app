import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclose from "../hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  // For toggling modal : _____>
  const { isOpen, handleToggleModal } = useDisclose();

  // Function for deleting the Contact card ____ >
  async function deleteContact(id) {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between items-center rounded-lg p-2"
      >
        <div className="flex gap-2">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div className="text-black">
            <h2 className="text-xl font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-2 text-3xl">
          <RiEditCircleLine
            className="cursor-pointer"
            onClick={handleToggleModal}
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className=" text-orange cursor-pointer"
          />
        </div>
      </div>

      <AddAndUpdateContact
        contact={contact}
        isUpdate={true}
        isOpen={isOpen}
        onToggle={handleToggleModal}
      />
    </>
  );
};

export default ContactCard;
