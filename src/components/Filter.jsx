import React from "react";
import PropTypes from "prop-types";

function Filter({ filter, setFilter }) {
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <input
      type="text"
      placeholder="Wyszukaj..."
      value={filter}
      onChange={(e) => handleFilterChange(e.target.value)}
    />
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
