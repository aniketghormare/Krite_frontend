// FilterForm.js
import React, { useState } from 'react';

function FilterForm({ onFilter }) {
  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div>
      <h2>Filter Domains</h2>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}

export default FilterForm;
