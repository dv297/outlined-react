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
  __canvas: HTMLCanvasElement;

  __context: CanvasRenderingContext2D;

  __height: number;

  __width: number;

  __activeItem: BaseDrawable | null;

  __activeItemOffsetX: number;

  __activeItemOffsetY: number;

  constructor(elementSelector: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(elementSelector);

    if (!canvas) {
      throw new Error(`Canvas not found using selector ${elementSelector}`);
    }

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get 2D context");
    }

    this.__canvas = canvas;
    this.__context = context;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.__height = canvas.height;
    this.__width = canvas.width;

    this.__activeItem = null;
    this.__activeItemOffsetX = 0;
    this.__activeItemOffsetY = 0;

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
    const drawables = MainStore.getState().canvasItems;

    requestAnimationFrame(() => {
      drawables.forEach((drawable) => drawable.draw());
    });
  }

  clear() {
    this.__context.clearRect(0, 0, this.__width, this.__height);
  }

  handleMouseDown(event: React.MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const touchedItem = MainStore.getState().canvasItems.find((item) => {
      return (
        mouseX >= item.x &&
        mouseX <= item.x + item.width &&
        mouseY >= item.y &&
        mouseY <= item.y + item.height
      );
    });

    if (!touchedItem) {
      return;
    }

    this.__activeItem = touchedItem;
    this.__activeItemOffsetX = mouseX - this.__activeItem.x;
    this.__activeItemOffsetY = mouseY - this.__activeItem.y;
  }

  handleMouseMove(event: React.MouseEvent) {
    if (!this.__activeItem) {
      return;
    }

    const mouseX = event.pageX;
    const mouseY = event.pageY;

    MainStore.getState().moveDrawable(this.__activeItem, {
      x: mouseX - this.__activeItemOffsetX,
      y: mouseY - this.__activeItemOffsetY,
    });
  }

  handleMouseUp() {
    this.__activeItem = null;
  }
}

export default CanvasManager;
