import PubSub from "pubsub-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleNodes } from "@fortawesome/free-solid-svg-icons";

import "./TopPanel.css";
import { ReactNode } from "react";

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
  return (
    <MenuButton
      title="Add Item"
      shortcutIndicator="1"
      onClick={() => {
        console.log("click");
        PubSub.publish("DRAW");
      }}
    >
      <FontAwesomeIcon icon={faPlus} />
    </MenuButton>
  );
};

const ConnectItem = () => {
  return (
    <MenuButton
      title="Connect Items"
      shortcutIndicator="2"
      onClick={() => {
        console.log("click");
        PubSub.publish("DRAW");
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