import BaseDrawable from "@src/drawables/BaseDrawable.ts";

class ArchitectureElementIcon extends BaseDrawable {
  iconPath: string;

  x: number;

  y: number;

  constructor(iconPath: string, x: number, y: number) {
    super();
    this.iconPath = iconPath;
    this.x = x;
    this.y = y;
  }

  handleDraw(context: CanvasRenderingContext2D): void {
    const { iconPath, x, y } = this;
    const image = new Image();
    image.src = window.location + `/icons/${iconPath}`;
    image.onload = () => {
      context.drawImage(image, x, y);
    };
  }
}

export default ArchitectureElementIcon;
