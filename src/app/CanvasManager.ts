import PubSub from "pubsub-js";
import MainStore from "@src/stores/MainStore.ts";
import React from "react";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";

let globalCanvasManager: CanvasManager;

// window.onbeforeunload = confirmExit;
// function confirmExit() {
//   return "You have attempted to leave this page. Are you sure?";
// }

class CanvasManager {
  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  height: number;

  width: number;

  activeItem: BaseDrawable | null;

  activeItemOffsetX: number;

  activeItemOffsetY: number;

  constructor(elementSelector: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(elementSelector);

    if (!canvas) {
      throw new Error(`Canvas not found using selector ${elementSelector}`);
    }

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get 2D context");
    }

    this.canvas = canvas;
    this.context = context;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.height = canvas.height;
    this.width = canvas.width;

    this.activeItem = null;
    this.activeItemOffsetX = 0;
    this.activeItemOffsetY = 0;

    PubSub.subscribe("DRAW", (message, data) => {
      console.log(message, data);
      this.redraw();
    });
  }

  static initialize() {
    this.getInstance();

    MainStore.subscribe(() => {
      CanvasManager.getInstance().redraw();
    });
  }

  static getInstance(): CanvasManager {
    if (!globalCanvasManager) {
      globalCanvasManager = new CanvasManager("#outlined-canvas");
    }

    return globalCanvasManager;
  }

  redraw() {
    this.clear();
    this.context.font =
      '0.75rem ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    const drawables = MainStore.getState().canvasItems;

    requestAnimationFrame(() => {
      drawables.forEach((drawable) => drawable.draw());
    });
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  findItemWithCoordinateCollision(x: number, y: number) {
    return MainStore.getState().canvasItems.find((item) => {
      return (
        x >= item.x &&
        x <= item.x + item.width &&
        y >= item.y &&
        y <= item.y + item.height
      );
    });
  }

  handleMouseDown(event: React.MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const touchedItem = this.findItemWithCoordinateCollision(mouseX, mouseY);

    if (!touchedItem) {
      return;
    }

    this.activeItem = touchedItem;
    this.activeItemOffsetX = mouseX - this.activeItem.x;
    this.activeItemOffsetY = mouseY - this.activeItem.y;
  }

  handleMouseMove(event: React.MouseEvent) {
    if (!this.activeItem) {
      return;
    }

    const mouseX = event.pageX;
    const mouseY = event.pageY;

    MainStore.getState().moveDrawable(this.activeItem, {
      x: mouseX - this.activeItemOffsetX,
      y: mouseY - this.activeItemOffsetY,
    });
  }

  handleMouseUp() {
    this.activeItem = null;
    this.activeItemOffsetX = 0;
    this.activeItemOffsetY = 0;
  }

  handleMouseDoubleClick(event: React.MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const touchedItem = this.findItemWithCoordinateCollision(mouseX, mouseY);

    if (!touchedItem) {
      return;
    }

    MainStore.getState().editItemLabelMenu.open(touchedItem);
  }
}

export default CanvasManager;
