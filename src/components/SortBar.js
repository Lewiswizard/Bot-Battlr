import React from "react";
//Sorting
function SortBar({ onSort }) {
  const handleSort = (criteria) => {
    onSort(criteria);
  };

  return (
    <div className="ui segment">
      <div className="ui three buttons">
        <button className="ui button" onClick={() => handleSort("health")}>
          Sort by Health
        </button>
        <button className="ui button" onClick={() => handleSort("damage")}>
          Sort by Damage
        </button>
        <button className="ui button" onClick={() => handleSort("armor")}>
          Sort by Armor
        </button>
      </div>
    </div>
  );
}

export default SortBar;
