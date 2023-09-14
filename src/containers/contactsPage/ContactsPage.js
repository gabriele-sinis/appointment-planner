import React, { useState, useEffect } from "react";

import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";

export const ContactsPage = ({ contacts, addContact }) => {
  //Define state variables for contact info and duplicate check
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  //Check for duplicates whenever the name in the form changes and indicate the name is a duplicate
  const [isDuplicate, setIsDuplicate] = useState(false); 


  const handleSubmit = (e) => {
    e.preventDefault();  

  // Check for duplicate contact names
   const isNameDuplicate = contacts.some((contacts) => contacts.name === name);

   if (!isNameDuplicate){
    // Add contact and clear form data
    addContact({ name, phone, email });
    setName('');
    setPhone('');
    setEmail('');
    setIsDuplicate(false);
  } else {
    // Alert user to duplicate contact name
    setIsDuplicate(true);
   }
  };

  useEffect(() => {
    // Reset multiple check when the name changes
    setIsDuplicate(false);
  }, [name]);

  return (
    <div>
      <section>
        <h2>Add Contact</h2> 
        <ContactForm 
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        isDuplicate={isDuplicate}
        />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList contacts={contacts} />
      </section>
    </div>
  );
};
