import ApplicationActions from "@src/app/ApplicationActions.ts";

class ShortcutManager {
  static initialize() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Digit1": {
          ApplicationActions.addItemMenu.open();
        }
      }
    });
  }
}

export default ShortcutManager;
