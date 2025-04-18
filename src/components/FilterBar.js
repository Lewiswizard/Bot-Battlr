// Filter.js
import React, { useState } from "react";

function FilterBar({ botClasses, onFilter }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const applyFilters = () => {
    onFilter(selectedFilters);
  };

  return (
    <div className="filter">
      <h4>Filter by Class:</h4>
      {botClasses.map((botClass) => (
        <div key={botClass}>
          <label>
            <input type="checkbox" value={botClass} checked={selectedFilters.includes(botClass)} onChange={handleCheckboxChange} />
            {botClass}
          </label>
        </div>
      ))}
      <button className="ui button" onClick={applyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default FilterBar;
