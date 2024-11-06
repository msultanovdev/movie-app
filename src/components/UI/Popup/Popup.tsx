import React from "react";
import cl from "./Popup.module.css";

interface IPopupMenuProps {
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
}

const PopupMenu: React.FC<IPopupMenuProps> = ({
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <div className={cl.menu} onMouseLeave={onClose}>
      <button onClick={onClose} className={cl.closeBtn}>
        x
      </button>
      <button onClick={onEdit} className={cl.menuItem}>
        Edit
      </button>
      <button onClick={onDelete} className={`${cl.menuItem} ${cl.removeBtn}`}>
        Delete
      </button>
    </div>
  );
};

export default PopupMenu;
