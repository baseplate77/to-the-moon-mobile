import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Unity, useUnityContext } from 'react-unity-webgl';

function App() {


  const { unityProvider ,isLoaded ,loadingProgression  } = useUnityContext({
    loaderUrl: "Build/webBuild.loader.js",
    dataUrl: "Build/webBuild.data",
    frameworkUrl: "Build/webBuild.framework.js",
    codeUrl: "Build/webBuild.wasm",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);
  return (
    <div className="container" >
    {isLoaded === false && (
      // We'll conditionally render the loading overlay if the Unity
      // Application is not loaded.
      <div className="loading-overlay">
        <p>Loading... ({loadingPercentage}%)</p>
      </div>
    )}
    <Unity className="unity" unityProvider={unityProvider} />
  </div>
  );
}

export default App;
