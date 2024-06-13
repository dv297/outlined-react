import { v4 as uuid } from "uuid";
import CanvasManager from "@src/app/CanvasManager.ts";

abstract class BaseDrawable {
  id: string;

  abstract x: number;
  abstract y: number;

  abstract width: number;
  abstract height: number;

  labelText: string;

  protected constructor() {
    this.id = uuid();
    this.labelText = "Drawable";
  }

  abstract handleDraw(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasManager: CanvasManager,
  ): void;

  abstract handleLabel(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasManager: CanvasManager,
  ): void;

  draw() {
    const canvasManager = CanvasManager.getInstance();

    this.handleDraw(canvasManager.context, canvasManager.canvas, canvasManager);
    this.handleLabel(
      canvasManager.context,
      canvasManager.canvas,
      canvasManager,
    );
  }
}

export default BaseDrawable;
