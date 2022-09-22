import React from 'react';

import { useSelector, shallowEqual } from 'react-redux';

import { getFilteredContacts } from '../../redux/selectors';

import { ContactItem } from '../ContactItem/ContactItem';

import s from './ContactList.module.css';

export function ContactList() {
  const filteredContacts = useSelector(getFilteredContacts, shallowEqual);

  if (filteredContacts.length === 0) {
    return <></>;
  }

  const elements = filteredContacts.map(({ id, name, number }) => (
    <ContactItem key={id} id={id} name={name} number={number} />
  ));

  return (
    <>
      <ul className={s.list}>{elements}</ul>
    </>
  );
}
