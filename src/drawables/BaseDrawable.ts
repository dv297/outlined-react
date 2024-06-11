import CanvasManager from "@src/app/CanvasManager.ts";

abstract class BaseDrawable {
  abstract x: number;
  abstract y: number;

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
