import React, { useEffect, useMemo } from 'react';

import { useSelector, shallowEqual } from 'react-redux';

import { getFilter, getContacts } from '../../redux/selectors';

import { ConfettiContainer } from '../Confetti/Confetti';
import { login } from '../Confetti/utils';

import { ContactItem } from '../ContactItem/ContactItem';

import s from './ContactList.module.css';

export function ContactList() {
  const contacts = useSelector(getContacts, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);

  useEffect(() => {
    login.submit();
  }, [contacts]);

  const renderContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }, [filter, contacts]);

  if (renderContacts.length === 0) {
    return <></>;
  }

  const elements = renderContacts.map(({ id, name, number }) => (
    <ContactItem key={id} id={id} name={name} number={number} />
  ));

  return (
    <>
      <ul className={s.list}>{elements}</ul>
      <ConfettiContainer />
    </>
  );
}
