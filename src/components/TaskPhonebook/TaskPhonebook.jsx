import { useEffect, useMemo } from 'react';

import { Section } from '../Section';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { ContactForm } from '../ContactForm';

import { ConfettiContainer } from '../Confetti';
import { login } from './utils';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './TaskPhonebook.module.css';

import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  setFilter,
} from '../../redux/contactsSlice';

export function TaskPhonebook() {
  const contacts = useSelector(state => state.contacts.items, shallowEqual);
  const filter = useSelector(state => state.contacts.filter, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    login.submit();
  }, [contacts]);

  const onAddContact = contact => {
    const searchUnique = contact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === searchUnique)) {
      Notify.failure(`${contact.name} is already in contacts`);
      return;
    }
    dispatch(addContact([contact]));
  };

  const handleClickDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  const renderContacts = useMemo(() => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }, [filter, contacts]);

  return (
    <div className={s.box}>
      <Section title="Phonebook">
        <ContactForm onAddContact={onAddContact} />
      </Section>

      <Section title="Contacts">
        <Filter handleFilter={handleFilter} value={filter} />

        <ContactList
          contacts={renderContacts}
          handleClickDelete={handleClickDelete}
        />
        <ConfettiContainer />
      </Section>
    </div>
  );
}
