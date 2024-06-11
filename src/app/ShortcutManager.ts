import MainStore from "@src/stores/MainStore.ts";

class ShortcutManager {
  static initialize() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Digit1": {
          MainStore.getState().addItemMenu.open();
        }
      }
    });
  }
}

export default ShortcutManager;
