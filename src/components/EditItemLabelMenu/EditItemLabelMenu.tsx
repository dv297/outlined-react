import { useStore } from "zustand";
import MainStore from "@src/stores/MainStore.ts";

const EditItemLabelMenu = () => {
  const store = useStore(MainStore);
  const { editItemLabelMenu } = store;

  if (!editItemLabelMenu.isOpen || !editItemLabelMenu.activeItem) {
    return null;
  }
  const { activeItem } = editItemLabelMenu;

  return (
    <input
      type="text"
      className="absolute text-xs"
      style={{
        left: activeItem.x,
        top: activeItem.y + activeItem.height,
      }}
      value={activeItem.text}
    />
  );
};

export default EditItemLabelMenu;
