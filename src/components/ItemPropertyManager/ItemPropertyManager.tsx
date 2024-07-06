import { useStore } from "zustand";
import MainStore from "@src/stores/MainStore.ts";

export const ItemPropertyManager = () => {
  const store = useStore(MainStore);

  const itemId = store.editItemMenu.activeItem?.id;
  const item = store.canvasItems.find((entry) => entry.id === itemId);

  if (!item) {
    return null;
  }

  return (
    <div className="absolute bottom-6 flex w-screen items-center justify-center">
      <div className="flex h-16 min-w-32 max-w-sm items-center justify-center rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="flex h-full items-center justify-center divide-x divide-solid divide-slate-100">
          <div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={item.text}
              onChange={(e) => {
                store.editItemMenu.editItemText(item, e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
