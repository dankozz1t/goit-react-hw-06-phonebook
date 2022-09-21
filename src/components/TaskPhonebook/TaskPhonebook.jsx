import { Section } from '../Section';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { ContactForm } from '../ContactForm';

import s from './TaskPhonebook.module.css';

export function TaskPhonebook() {
  return (
    <div className={s.box}>
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts">
        <Filter />

        <ContactList />
      </Section>
    </div>
  );
}
