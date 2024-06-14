import { v4 as uuid } from "uuid";
import CanvasManager from "@src/app/CanvasManager.ts";

abstract class BaseDrawable {
  id: string;

  abstract x: number;
  abstract y: number;

  abstract width: number;
  abstract height: number;

  text: string;

  isEditing: boolean;

  protected constructor() {
    this.id = uuid();
    this.text = "Drawable";
    this.isEditing = false;
  }

  abstract handleDraw(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasManager: CanvasManager,
  ): void;

  abstract handleTextRendering(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasManager: CanvasManager,
  ): void;

  abstract handleEditInputRendering(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasManager: CanvasManager,
  ): void;

  draw() {
    const canvasManager = CanvasManager.getInstance();

    this.handleDraw(canvasManager.context, canvasManager.canvas, canvasManager);

    if (this.isEditing) {
      this.handleEditInputRendering(
        canvasManager.context,
        canvasManager.canvas,
        canvasManager,
      );
    } else {
      this.handleTextRendering(
        canvasManager.context,
        canvasManager.canvas,
        canvasManager,
      );
    }
  }
}

export default BaseDrawable;
