import React from "react";
import BotCard from "./BotCard";
//Filtering 
function BotCollection({ bots, onShowDetails, onDelete, sortCriteria, filters, onEnlist }) {
  const filteredBots = bots.filter((bot) => {
    if (filters.length === 0) return true; 
    return filters.includes(bot.bot_class);
  });

  const sortedBots = filteredBots.sort((a, b) => {
    if (!sortCriteria) return 0;
    return b[sortCriteria] - a[sortCriteria];
  });
//Enlist
  const handleEnlist = (bot) => {
    onEnlist(bot);
  };

  return (
    <div className="ui four column grid">
      <h2>Collection of all bots</h2>
      <div className="row">
        {sortedBots.map((bot) => (
          <BotCard key={bot.id} bot={bot} onShowDetails={onShowDetails} onDelete={onDelete} isYourArmy={false} onEnlist={handleEnlist} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;

