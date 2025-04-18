import React, { useState, useEffect } from "react";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";
import YourBotArmy from "./YourBotArmy";
import SortBar from "./SortBar";
import FilterBar from "./FilterBar";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [selectedBots, setSelectedBots] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Fetch data from backend after loading
    fetch("http://localhost:8002/bots")
      .then((response) => response.json())
      .then((data) => {
        setBots(data);
        console.log("fetched");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShowDetails = (bot) => {
    setSelectedCard(bot);
  };

  const handleGoBack = () => {
    setSelectedCard(null);
  };

  const handleBotSelect = (bot) => {
    if (!selectedBots.some((selectedBot) => selectedBot.id === bot.id)) {
      setSelectedBots([...selectedBots, bot]);
      setBots(bots.filter((b) => b.id !== bot.id)); // Remove bot from BotCollection
    }
  };

  const handleBotDeselect = (bot) => {
    setSelectedBots(selectedBots.filter((selectedBot) => selectedBot.id !== bot.id));
    setBots([bot, ...bots]); // Add bot back to BotCollection
  };

     const handleDelete = (id) => {
        fetch(`http://localhost:8002/bots/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              setSelectedBots(selectedBots.filter((selectedBot) => selectedBot.id !== id));
              setBots(bots.filter((bot) => bot.id !== id));
              setSelectedCard(null);
            } else {
              console.error("Failed to delete bot");
            }
          })
          .catch((error) => {
            console.error("Error deleting bot:", error);
          });
      };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <div>
      <YourBotArmy selectedBots={selectedBots} onBotDeselect={handleBotDeselect} onDelete={handleDelete} />
      <FilterBar botClasses={["Assault", "Defender", "Support", "Medic", "Witch", "Captain"]} onFilter={handleFilter} />
      <SortBar onSort={handleSort} />
      {selectedCard ? (
        <BotSpecs bot={selectedCard} onGoBack={handleGoBack} onEnlist={handleBotSelect} />
      ) : (
        <BotCollection bots={bots} onShowDetails={handleShowDetails} onDelete={handleDelete} sortCriteria={sortCriteria} filters={filters} onEnlist={handleBotSelect} />
      )}
    </div>
  );
}

export default BotsPage;
