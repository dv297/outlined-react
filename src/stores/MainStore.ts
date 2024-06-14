import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";
import CanvasManager from "@src/app/CanvasManager.ts";
import { DrawableInput } from "@src/drawables/DrawableInput.ts";
import DrawableFactory from "@src/drawables/DrawableFactory.ts";
import { Coordinate } from "@src/drawables/Coordinate.ts";

interface MainStoreState {
  addItemMenu: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
  editItemLabelMenu: {
    isOpen: boolean;
    activeItem: BaseDrawable | null;
    open: (drawable: BaseDrawable) => void;
    close: () => void;
  };
  canvasItems: BaseDrawable[];
  addDrawable: (item: DrawableInput) => void;
  moveDrawable: (item: BaseDrawable, coordinate: Coordinate) => void;
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
      editItemLabelMenu: {
        isOpen: false,
        activeItem: null,
        open: (drawable) => {
          setState((draft) => {
            draft.editItemLabelMenu.isOpen = true;
            draft.editItemLabelMenu.activeItem = drawable;

            const draftDrawable = draft.canvasItems.find(
              (item) => item.id === drawable.id,
            );
            if (draftDrawable) {
              draftDrawable.isEditing = true;
            }
          });
        },
        close: () => {
          setState((draft) => {
            draft.editItemLabelMenu.isOpen = false;
            draft.editItemLabelMenu.activeItem = null;
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
      moveDrawable: (item: BaseDrawable, coordinate: Coordinate) => {
        setState((draft) => {
          const itemToModify = draft.canvasItems.find(
            (potentialItem) => potentialItem.id === item.id,
          );

          if (!itemToModify) {
            return;
          }

          itemToModify.x = coordinate.x;
          itemToModify.y = coordinate.y;
          CanvasManager.getInstance().redraw();
        });
      },
    })),
  ),
);

export default MainStore;
