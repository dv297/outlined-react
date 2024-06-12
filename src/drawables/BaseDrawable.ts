import { v4 as uuid } from "uuid";
import CanvasManager from "@src/app/CanvasManager.ts";

abstract class BaseDrawable {
  id: string;

  abstract x: number;
  abstract y: number;

  abstract width: number;
  abstract height: number;

  protected constructor() {
    this.id = uuid();
  }

  abstract handleDraw(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    canvasManager: CanvasManager,
  ): void;

  draw() {
    const canvasManager = CanvasManager.getInstance();

    this.handleDraw(
      canvasManager.__context,
      canvasManager.__canvas,
      canvasManager,
    );
  }
}

export default BaseDrawable;
