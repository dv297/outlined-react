import { useEffect, useRef } from "react";
import initialize from "@src/main.ts";
import TopPanel from "@src/components/TopPanel.tsx";

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
    <div>
      <canvas id="outlined-canvas" ref={canvasRef} />
      <TopPanel />
    </div>
  );
}

export default App;
