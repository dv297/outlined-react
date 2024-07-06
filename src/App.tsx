import { useEffect, useRef } from "react";
import initialize from "@src/main.ts";
import TopPanel from "@src/components/TopPanel/TopPanel.tsx";
import AddItemMenu from "@src/components/AddItemMenu/AddItemMenu.tsx";
import CanvasManager from "@src/app/CanvasManager.ts";
import { ItemPropertyManager } from "@src/components/ItemPropertyManager/ItemPropertyManager.tsx";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      initialize();
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <canvas
        id="outlined-canvas"
        ref={canvasRef}
        tabIndex={1}
        onMouseDown={(event) =>
          CanvasManager.getInstance().handleMouseDown(event)
        }
        onMouseMove={(event) =>
          CanvasManager.getInstance().handleMouseMove(event)
        }
        onMouseUp={() => CanvasManager.getInstance().handleMouseUp()}
        onDoubleClick={(event) =>
          CanvasManager.getInstance().handleMouseDoubleClick(event)
        }
      />
      <div className="z-10">
        <TopPanel />
        <AddItemMenu />
        <ItemPropertyManager />
      </div>
    </div>
  );
}

export default App;
