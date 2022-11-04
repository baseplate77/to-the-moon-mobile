import { Unity, useUnityContext } from "react-unity-webgl";
import "../styles/game.css";

type GameProps = {};

function Game({}: GameProps) {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/webBuild.loader.js",
    dataUrl: "Build/webBuild.data",
    frameworkUrl: "Build/webBuild.framework.js",
    codeUrl: "Build/webBuild.wasm",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

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
