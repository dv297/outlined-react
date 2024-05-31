let globalCanvasManager: CanvasManager;

class CanvasManager {
  __canvas: HTMLCanvasElement;

  __context: CanvasRenderingContext2D;

  __height: number;

  __width: number;

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
  }

  static getInstance(): CanvasManager {
    if (!globalCanvasManager) {
      globalCanvasManager = new CanvasManager("#outlined-canvas");
    }

    return globalCanvasManager;
  }

  clear() {
    this.__context.clearRect(0, 0, this.__width, this.__height);
  }
}

export default CanvasManager;
