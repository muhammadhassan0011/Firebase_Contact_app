import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, handleToggleModal } = useDisclose();

  useEffect(() => {
    async function getContacts() {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, []);

  // Function for Searching card ____>
  function handleSearch(e) {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    // const contactsSnapshot = await getDocs(contactsRef);

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filterContacts);
      return filterContacts;
    });
  }

  return (
    <>
      <div className="max-w-[400px] mx-auto px-2">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-3xl text-white absolute ml-1" />
            <input
              type="search"
              placeholder="Search Contact"
              className="flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-10 text-[20px] p-6"
              onChange={handleSearch}
            />
          </div>
          <div>
            <AiFillPlusCircle
              className="text-5xl text-white cursor-pointer"
              onClick={handleToggleModal}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard contact={contact} key={contact.id} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onToggle={handleToggleModal} />
      <ToastContainer />
    </>
  );
};

export default App;
