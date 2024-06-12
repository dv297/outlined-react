import BaseDrawable from "@src/drawables/BaseDrawable.ts";

class ArchitectureElementIcon extends BaseDrawable {
  iconPath: string;

  x: number;

  y: number;

  height: number;

  width: number;

  constructor(iconPath: string, x: number, y: number) {
    super();
    this.iconPath = iconPath;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
  }

  handleDraw(context: CanvasRenderingContext2D): void {
    const { iconPath, x, y } = this;
    const image = new Image();
    image.src = window.location + `/${iconPath}`;
    image.onload = (onLoadResult) => {
      const image = onLoadResult.target as HTMLImageElement;
      this.width = image.width;
      this.height = image.height;
      context.drawImage(image, x, y, this.width, this.height);
    };
  }
}

export default ArchitectureElementIcon;
