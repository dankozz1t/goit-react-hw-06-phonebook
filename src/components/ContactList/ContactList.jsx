import React from 'react';
import PropTypes from 'prop-types';

import { ContactItem } from '../ContactItem/ContactItem';

import s from './ContactList.module.css';

export function ContactList({ contacts, handleClickDelete }) {
  return (
    <>
      {contacts.length > 0 && (
        <ul className={s.list}>
          {contacts.map(({ id, name, number }) => (
            <ContactItem
              key={id}
              name={name}
              number={number}
              handleClickDelete={() => {
                handleClickDelete(id);
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleClickDelete: PropTypes.func.isRequired,
};
