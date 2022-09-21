import { useEffect, useMemo } from 'react';

import { Section } from '../Section';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { ContactForm } from '../ContactForm';

import { ConfettiContainer } from '../Confetti';
import { login } from './utils';

import s from './TaskPhonebook.module.css';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import { getFilter, getContacts } from '../../redux/selectors';

export function TaskPhonebook() {
  const contacts = useSelector(getContacts, shallowEqual);
  const filter = useSelector(getFilter, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    login.submit();
  }, [contacts]);

  const handleClickDelete = id => {
    dispatch(deleteContact(id));
  };

  const renderContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }, [filter, contacts]);

  return (
    <div className={s.box}>
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts">
        <Filter />

        <ContactList
          contacts={renderContacts}
          handleClickDelete={handleClickDelete}
        />
        <ConfettiContainer />
      </Section>
    </div>
  );
}
