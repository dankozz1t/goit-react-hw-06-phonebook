export const getContacts = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

export const getFilteredContacts = state => {
  const { items, filter } = state.contacts;

  return items.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase().trim())
  );
};
