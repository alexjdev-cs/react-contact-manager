/******************************************************************************
 * File:
 *  contact-form-page
 * Author:
 *  Alex Johnson
 * Purpose:
 *  Implements the ContactFormPage component used to create or update contacts.
 *****************************************************************************/
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from '../components/contact-form';
import { flashErrorMessage } from '../components/flash-message';
import { ContactContext } from '../context/contact-context';

const ContactFormPage = ({ match }) => {
  const [state, dispatch] = useContext(ContactContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { _id } = match.params;

    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3030/contacts/${_id}`);
          dispatch({
            type: 'FETCH_CONTACT',
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [match.params, dispatch]);

  return (
    <div>
      {loading && <p></p>}
      {!loading && <ContactForm contact={state.contact} />}
    </div>
  );
};

export default ContactFormPage;
