/******************************************************************************
 * File:
 *  contact-list
 * Author:
 *  Alex Johnson
 * Purpose:
 *  Implements the ContactList component.
 *****************************************************************************/
import React from 'react';
import { Card } from 'semantic-ui-react';
import ContactCard from './contact-card';

const ContactList = ({ contacts }) => {
  const cards = () => {
    return contacts.map((contact) => {
      return <ContactCard key={contact._id} contact={contact} />;
    });
  };

  return (
    <div>
      <Card.Group>{cards()}</Card.Group>
    </div>
  );
};

export default ContactList;
