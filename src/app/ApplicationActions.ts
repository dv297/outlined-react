import MainStore from "@src/stores/MainStore.ts";

const ApplicationActions = {
  addItemMenu: {
    open: () => {
      MainStore.getState().addItemMenu.open();
    },
    close: () => {
      MainStore.getState().addItemMenu.close();
    },
  },
  startConnectingItems: () => {},
};

export default ApplicationActions;
