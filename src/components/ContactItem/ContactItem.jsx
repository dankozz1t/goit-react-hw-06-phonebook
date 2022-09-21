import React from 'react';
import PropTypes from 'prop-types';

import s from './ContactItem.module.css';

export function ContactItem({ name, number, handleClickDelete }) {
  return (
    <li className={s.item}>
      <p>
        <span className={s.name}>{name}</span>: {number}
      </p>
      <button className={s.btn} onClick={handleClickDelete} type="button">
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
};
