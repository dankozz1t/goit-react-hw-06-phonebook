import { Section } from '../Section';
import { ContactForm } from '../ContactForm';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { ConfettiContainer } from '../Confetti/Confetti';

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
        <ConfettiContainer />
      </Section>
    </div>
  );
}
