import { useEffect, useRef } from "react";
import initialize from "@src/main.ts";
import TopPanel from "@src/components/TopPanel/TopPanel.tsx";
import AddItemMenu from "@src/components/AddItemMenu/AddItemMenu.tsx";

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
      <canvas className="-z-10" id="outlined-canvas" ref={canvasRef} />
      <div className="z-10">
        <TopPanel />
        <AddItemMenu />
      </div>
    </div>
  );
}

export default App;
