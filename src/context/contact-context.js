/******************************************************************************
 * File:
 *  contact-context
 * Author:
 *  Alex Johnson
 * Purpose:
 *  Provides the Context for the contacts app using the createContext hook
 *  and local reducers.
 *****************************************************************************/

import React, { useReducer, createContext } from 'react';

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  contact: {},
  message: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case 'FETCH_CONTACT': {
      return {
        ...state,
        contact: action.payload,
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'CREATE_CONTACT': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New contact created',
        },
      };
    }
    case 'UPDATE_CONTACT': {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map((item) => (item._id === contact._id ? contact : item)),
        message: {
          type: 'success',
          title: 'Update successful',
          content: `Contact "${contact.email}" has been updated.`,
        },
      };
    }
    case 'DELETE_CONTACT': {
      const { _id, email } = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter((item) => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete successful',
          content: `Contact "${email} successfully deleted`,
        },
      };
    }
    default:
      throw new Error();
  }
}

export const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return <ContactContext.Provider value={[state, dispatch]}>{children}</ContactContext.Provider>;
};
