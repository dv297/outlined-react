import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";
import CanvasManager from "@src/app/CanvasManager.ts";
import { DrawableInput } from "@src/drawables/DrawableInput.ts";
import DrawableFactory from "@src/drawables/DrawableFactory.ts";

interface MainStoreState {
  addItemMenu: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  canvasItems: BaseDrawable[];
  addDrawable: (item: DrawableInput) => void;
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
      addDrawable: (item: DrawableInput) => {
        setState((draft) => {
          const itemToAdd = DrawableFactory.build(item);

          draft.canvasItems.push(itemToAdd);
          draft.addItemMenu.isOpen = false;
          CanvasManager.getInstance().redraw();
        });
      },
    })),
  ),
);

export default MainStore;
