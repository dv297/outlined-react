import "./styles/style.css";

import ShortcutManager from "@src/app/ShortcutManager.ts";
import CanvasManager from "@src/app/CanvasManager.ts";

function initialize() {
  ShortcutManager.initialize();
  CanvasManager.initialize();
}

export default initialize;
