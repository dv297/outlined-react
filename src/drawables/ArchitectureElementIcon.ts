import BaseDrawable from "@src/drawables/BaseDrawable.ts";

class ArchitectureElementIcon extends BaseDrawable {
  iconPath: string;

  x: number;

  y: number;

  height: number;

  width: number;

  image: HTMLImageElement;

  hasImageResolved: boolean;

  constructor(iconPath: string, x: number, y: number) {
    super();
    this.iconPath = iconPath;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;

    this.hasImageResolved = false;

    const image = new Image();
    image.src = window.location + `/${iconPath}`;

    image.onload = (onLoadResult) => {
      const resolvedImage = onLoadResult.target as HTMLImageElement;
      this.width = resolvedImage.width;
      this.height = resolvedImage.height;
      this.hasImageResolved = true;

      this.draw();
    };

    this.image = image;
  }

  handleDraw(context: CanvasRenderingContext2D): void {
    const { x, y } = this;
    if (!this.hasImageResolved) {
      return;
    }

    context.drawImage(this.image, x, y, this.width, this.height);
  }
}

export default ArchitectureElementIcon;
