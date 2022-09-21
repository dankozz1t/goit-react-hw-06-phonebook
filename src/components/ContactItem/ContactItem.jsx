import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import s from './ContactItem.module.css';

export function ContactItem({ id, name, number }) {
  const dispatch = useDispatch();
  return (
    <li className={s.item}>
      <p>
        <span className={s.name}>{name}</span>: {number}
      </p>
      <button
        className={s.btn}
        type="button"
        onClick={() => {
          dispatch(deleteContact(id));
        }}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
