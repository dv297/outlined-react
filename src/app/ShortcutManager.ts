class ShortcutManager {
  onDigit1KeyDown(callback: () => void) {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Digit1") {
        callback();
      }
    });
  }
}

export default ShortcutManager;
