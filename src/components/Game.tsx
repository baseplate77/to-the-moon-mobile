import { log } from "console";
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../styles/game.css";

type GameProps = {};

function Game({}: GameProps) {
const [score, setScore ] = useState(0);

  const { unityProvider, isLoaded, loadingProgression, addEventListener,removeEventListener } = useUnityContext({
    loaderUrl: "Build/webBuild.loader.js",
    dataUrl: "Build/webBuild.data",
    frameworkUrl: "Build/webBuild.framework.js",
    codeUrl: "Build/webBuild.wasm",
  });
 const handleGameOver = useCallback((score:any) => {
    setScore(score);
  }, []);
  const loadingPercentage = Math.round(loadingProgression * 100);


  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  },[addEventListener,removeEventListener,handleGameOver])

  console.log("score",score);
  

  return (
    <div className="container">
      {isLoaded === false && (
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity className="unity" unityProvider={unityProvider} />
    </div>
  );
}

export default Game;
