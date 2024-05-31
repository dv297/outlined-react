import "./styles/style.css";

import CanvasManager from "@src/app/CanvasManager.ts";
import ShortcutManager from "@src/app/ShortcutManager.ts";
import ArchitectureElementIcon from "@src/drawables/ArchitectureElementIcon.ts";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";

const canvasManager = CanvasManager.getInstance();
const shortcutManager = new ShortcutManager();

let x = 0;
let y = 100;

const drawables: Array<BaseDrawable> = [
  new ArchitectureElementIcon(
    "Architecture-Group-Icons_01312024/Auto-Scaling-group_32.svg",
    x,
    y,
  ),

  new ArchitectureElementIcon(
    "Architecture-Group-Icons_01312024/Auto-Scaling-group_32.svg",
    x,
    y + 500,
  ),
];

function draw() {
  canvasManager.clear();

  requestAnimationFrame(() => {
    drawables.forEach((drawable) => drawable.draw());
  });
}

shortcutManager.onDigit1KeyDown(() => {
  draw();
});
