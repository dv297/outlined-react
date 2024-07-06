import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleNodes } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "zustand";
import MainStore from "@src/stores/MainStore.ts";

const MenuButton = ({
  children,
  onClick,
  title,
  shortcutIndicator,
}: {
  children: ReactNode;
  onClick: () => void;
  title: string;
  shortcutIndicator: string;
}) => (
  <button className="px-6" onClick={onClick} title={title}>
    {children}
    <span className="relative left-1/2 top-2 text-xs font-light text-gray-400">
      {shortcutIndicator}
    </span>
  </button>
);

const AddItem = () => {
  const store = useStore(MainStore);

  return (
    <MenuButton
      title="Add Item"
      shortcutIndicator="1"
      onClick={store.addItemMenu.open}
    >
      <FontAwesomeIcon icon={faPlus} />
    </MenuButton>
  );
};

const ConnectItem = () => {
  const store = useStore(MainStore);

  return (
    <MenuButton
      title="Connect Items"
      shortcutIndicator="2"
      onClick={() => {
        if (store.canvasItems[0]) {
          store.moveDrawable(store.canvasItems[0], {
            x: store.canvasItems[0].x + 100,
            y: store.canvasItems[0].y + 100,
          });
        }
      }}
    >
      <FontAwesomeIcon icon={faCircleNodes} />
    </MenuButton>
  );
};

const TopPanel = () => {
  return (
    <div className="absolute top-6 flex w-screen items-center justify-center">
      <div className="flex h-16 min-w-32 max-w-sm items-center justify-center rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="flex h-full divide-x divide-solid divide-slate-100">
          <AddItem />
          <ConnectItem />
        </div>
      </div>
    </div>
  );
};

export default TopPanel;
