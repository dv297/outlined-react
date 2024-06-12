import { DrawableInput } from "@src/drawables/DrawableInput.ts";
import ArchitectureElementIcon from "@src/drawables/ArchitectureElementIcon.ts";
import BaseDrawable from "@src/drawables/BaseDrawable.ts";

class DrawableFactory {
  static build(input: DrawableInput): BaseDrawable {
    switch (input.type) {
      case "ArchitectureElementIcon":
        return new ArchitectureElementIcon(
          input.meta["path"],
          input.x,
          input.y,
        );
      default:
        throw new Error(`Unsupported Drawable with type: ${input.type}`);
    }
  }
}

export default DrawableFactory;
