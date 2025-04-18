import React from "react";

const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star",
};
//Delete
function BotCard({ bot, onShowDetails, onDelete,isYourArmy}) {
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bot?");
    if (confirmDelete) {
      onDelete(bot.id);
    }
  };

  function deleteButton(){
    return(
      <span className="ui right floated left aligned segment basic">
        <button className="ui mini red button" onClick={handleDelete}>
          x
        </button>
      </span>
    )
  }

  return (
    <div className="ui column">
      <div className="ui card"
         key={bot.id}
         onClick={() => onShowDetails(bot)}>
        <div className="image">
          <img alt="oh no!" src={bot.avatar_url} />
        </div>
        <div className="content">
          <div className="header">
            {bot.name}
            <i className={botTypeClasses[bot.bot_class]} />
          </div>
          <div className="meta text-wrap">
            <small>{bot.catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat" />
            {bot.health}
          </span>
          <span>
            <i className="icon lightning" />
            {bot.damage}
          </span>
          <span>
            <i className="icon shield" />
            {bot.armor}
          </span>
          {isYourArmy? deleteButton():null}
        </div>
      </div>
    </div>
  );
}

export default BotCard;