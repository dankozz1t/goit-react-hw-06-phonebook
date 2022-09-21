import React from 'react';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/selectors';

export function Filter() {
  const filter = useSelector(getFilter, shallowEqual);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>
        Find contacts by name
        <input
          onChange={handleFilterChange}
          value={filter}
          type="text"
          name="filter"
          title="Find contacts by name"
        />
      </label>
    </div>
  );
}
