import React, { useState } from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';

import s from './ContactForm.module.css';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts, shallowEqual);
  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();

    if (isUniqueName(name)) {
      dispatch(addContact({ id: nanoid(), name, number }));
    }

    clearInput();
  };

  const isUniqueName = newName => {
    const searchUnique = newName.toLowerCase();

    if (contacts.find(({ name }) => name.toLowerCase() === searchUnique)) {
      Notify.failure(`"${newName}" is already in contacts`);
      return false;
    }
    return true;
  };

  const clearInput = () => {
    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleInputChange}
          required
        />
      </label>

      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
