import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";

interface MainStoreState {
  addItemMenu: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
}

const MainStore = create<MainStoreState>()(
  devtools((setState) => ({
    addItemMenu: {
      isOpen: false,
      open: () => {
        setState(
          produce((draft) => {
            draft.addItemMenu.isOpen = true;
          }),
        );
      },
      close: () => {
        setState(
          produce((draft) => {
            draft.addItemMenu.isOpen = false;
          }),
        );
      },
    },
  })),
);

export default MainStore;
