import { useStore } from "zustand";
import MainStore from "@src/stores/MainStore.ts";

import {
  faMagnifyingGlass,
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useDeferredValue, useMemo, useState } from "react";
import clsx from "clsx";
import ApplicationActions from "@src/app/ApplicationActions.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import supportedIcons from "@src/data/supported_icons.json";

const AddItemMenu = () => {
  const {
    addItemMenu: { isOpen },
  } = useStore(MainStore);

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isLoading = query !== deferredQuery;

  const filteredItems = useMemo(() => {
    if (!deferredQuery) {
      return [];
    }

    const filteredList = supportedIcons
      .filter((entry) =>
        entry.path.toLowerCase().includes(deferredQuery.toLowerCase()),
      )
      .slice(0, 20);

    return filteredList.map((entry) => {
      const entrySegments = entry.path.split("/");
      const sanitizedName = entrySegments[entrySegments.length - 1]
        .replace(/[-_]/g, " ")
        .replace(".svg", "")
        .replace(/\d/g, "");

      return {
        id: entry.path,
        name: sanitizedName,
        description: "",
        url: "#",
        color: "bg-white",
        icon: <img src={`/${entry.path}`} alt={entry.path} />,
      };
    });
  }, [deferredQuery]);

  if (!isOpen) {
    return null;
  }

  return (
    <Transition show={isOpen} afterLeave={() => setQuery("")} appear>
      <Dialog
        className="relative z-10"
        onClose={ApplicationActions.addItemMenu.close}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(item) => {
                  console.log("Item Selected", item);
                }}
              >
                <div>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <ComboboxInput
                      autoFocus
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => {
                        setQuery(event.target.value);
                      }}
                      onBlur={() => setQuery("")}
                    />
                  </div>

                  {filteredItems.length > 0 && (
                    <ComboboxOptions
                      static
                      className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                    >
                      {filteredItems.map((item) => (
                        <ComboboxOption
                          key={item.id}
                          value={item}
                          className={({ focus }) =>
                            clsx(
                              "flex cursor-default select-none rounded-xl p-3",
                              focus && "bg-gray-100",
                            )
                          }
                        >
                          {({ focus }) => (
                            <>
                              <div
                                className={clsx(
                                  "flex h-10 w-10 flex-none items-center justify-center rounded-lg",
                                  item.color,
                                )}
                              >
                                {item.icon}
                                {/*<item.icon*/}
                                {/*  // className="h-6 w-6 text-white"*/}
                                {/*aria-hidden="true"*/}
                                {/*/>*/}
                              </div>
                              <div className="ml-4 flex-auto">
                                <p
                                  className={clsx(
                                    "text-sm font-medium",
                                    focus ? "text-gray-900" : "text-gray-700",
                                  )}
                                >
                                  {item.name}
                                </p>
                                <p
                                  className={clsx(
                                    "text-sm",
                                    focus ? "text-gray-700" : "text-gray-500",
                                  )}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </>
                          )}
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  )}

                  {query !== "" && isLoading && filteredItems.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="fa-spin mx-auto h-6 w-6 text-gray-400"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        Loading...
                      </p>
                    </div>
                  )}
                  {query !== "" && !isLoading && filteredItems.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        type="outline"
                        name="exclamation-circle"
                        className="mx-auto h-6 w-6 text-gray-400"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        No results found
                      </p>
                      <p className="mt-2 text-gray-500">
                        No components found for this search term. Please try
                        again.
                      </p>
                    </div>
                  )}
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddItemMenu;
