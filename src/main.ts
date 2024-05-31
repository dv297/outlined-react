import "./styles/style.css";

import PubSub from "pubsub-js";
import CanvasManager from "@src/app/CanvasManager.ts";
import ArchitectureElementIcon from "@src/drawables/ArchitectureElementIcon.ts";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";

function initialize() {
  const canvasManager = CanvasManager.getInstance();

  const x = 0;
  const y = 100;

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

  PubSub.subscribe("DRAW", (message, data) => {
    console.log(message, data);
    draw();
  });
}

export default initialize;
