type DrawableType = "ArchitectureElementIcon" | "Shape";

interface DrawableInput {
  /**
   * A string defining what type of Drawable this is.
   */
  type: DrawableType;

  /**
   * The x coordinate
   */
  x: number;

  /**
   * The y coordinate
   */
  y: number;

  /**
   * A record defining metadata regarding this particular Drawable type.
   */
  meta: Record<string, string>;
}

export type { DrawableInput, DrawableType };
