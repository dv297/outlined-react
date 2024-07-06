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
  editItemMenu: {
    isOpen: boolean;
    activeItem: BaseDrawable | null;
    open: (drawable: BaseDrawable) => void;
    close: () => void;
    editItemText: (item: BaseDrawable, text: string) => void;
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
      editItemMenu: {
        isOpen: false,
        activeItem: null,
        open: (drawable) => {
          setState((draft) => {
            draft.editItemMenu.isOpen = true;
            draft.editItemMenu.activeItem = drawable;

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
            draft.editItemMenu.isOpen = false;
            draft.editItemMenu.activeItem = null;
          });
        },
        editItemText: (item, text) => {
          setState((draft) => {
            const draftItem = draft.canvasItems.find(
              (potentialItem) => potentialItem.id === item.id,
            );

            if (draftItem) {
              draftItem.text = text;
            }
          });
        },
      },
      canvasItems: [],
      addDrawable: (item: DrawableInput) => {
        setState((draft) => {
          const itemToAdd = DrawableFactory.build(item);

          draft.canvasItems.push(itemToAdd);
          draft.addItemMenu.isOpen = false;
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
        });
      },
    })),
  ),
);

MainStore.subscribe(() => {
  CanvasManager.getInstance().redraw();
});

export default MainStore;
