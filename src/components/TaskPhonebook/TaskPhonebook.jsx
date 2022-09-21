import { useState, useEffect, useMemo } from 'react';

import { Section } from '../Section';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { ContactForm } from '../ContactForm';

import { ConfettiContainer } from '../Confetti';
import { login } from './utils';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import s from './TaskPhonebook.module.css';

export function TaskPhonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      } else {
        setContacts([
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
          { id: 'id-5', name: 'Sergey Mentor 2', number: '666-66-66' },
        ]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));

    login.submit();
  }, [contacts]);

  const onAddContact = contact => {
    const searchUnique = contact.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === searchUnique)) {
      Notify.failure(`${contact.name} is already in contacts`);

      return;
    }

    setContacts(state => [...state, contact]);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleClickDelete = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
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
