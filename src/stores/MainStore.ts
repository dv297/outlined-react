import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";
import CanvasManager from "@src/app/CanvasManager.ts";
import ArchitectureElementIcon from "@src/drawables/ArchitectureElementIcon.ts";

interface DrawablePojo {
  x: number;
  y: number;
  type: "ArchitectureElementIcon" | "Shape";
  meta: Record<string, string>;
}

interface MainStoreState {
  addItemMenu: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  canvasItems: BaseDrawable[];
  addItem: (item: DrawablePojo) => void;
}

const MainStore = create<MainStoreState>()(
  devtools(
    immer((setState) => ({
      addItemMenu: {
        isOpen: false,
        open: () => {
          setState((draft) => {
            draft.addItemMenu.isOpen = true;
          });
        },
        close: () => {
          setState((draft) => {
            draft.addItemMenu.isOpen = false;
          });
        },
      },
      canvasItems: [],
      addItem: (item: DrawablePojo) => {
        setState((draft) => {
          let itemToAdd;
          if (item.type === "ArchitectureElementIcon") {
            itemToAdd = new ArchitectureElementIcon(
              item.meta["path"],
              item.x,
              item.y,
            );
          }

          if (!itemToAdd) {
            return;
          }

          draft.canvasItems.push(itemToAdd);
          draft.addItemMenu.isOpen = false;
          CanvasManager.getInstance().redraw();
        });
      },
    })),
  ),
);

export default MainStore;
