import { useEffect, useRef } from "react";
import initialize from "@src/main.ts";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      initialize();
    }
  }, []);

  return <canvas id="outlined-canvas" ref={canvasRef} />;
}

export default App;
