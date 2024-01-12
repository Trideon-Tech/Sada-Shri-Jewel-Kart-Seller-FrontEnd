import React from "react";

import "./item.styles.scss";

const DrawerItem = ({ title, value, icon, section, clickAction }) => {
  return (
    <div
      className={value === section ? "drawer-item-selected" : "drawer-item"}
      onClick={clickAction}
    >
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
    </div>
  );
};

export default DrawerItem;