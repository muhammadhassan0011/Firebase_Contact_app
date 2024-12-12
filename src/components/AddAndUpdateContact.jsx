import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email !").required("Email is required"),
});

const AddAndUpdateContact = ({ isOpen, onToggle, isUpdate, contact }) => {
  // Function to add new Card
  async function addContact(contact) {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onToggle();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  }
  // Function to update the existing Card
  async function updateContact(contact, id) {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onToggle();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal isOpen={isOpen} onToggleModal={onToggle}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email,
              }
            : {
                name: "",
                email: "",
              }
        }
        onSubmit={(values) => {
          console.log(values);

          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field name="name" className="h-10 border" />
            <div className="text-red-500">
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="h-10 border" />
            <div className="text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange px-3 py-1.5 border self-end"
          >
            {isUpdate ? "update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
