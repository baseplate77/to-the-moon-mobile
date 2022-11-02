import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Unity, useUnityContext } from 'react-unity-webgl';

function App() {


  const { unityProvider ,isLoaded ,loadingProgression  } = useUnityContext({
    loaderUrl: "build/webBuild.loader.js",
    dataUrl: "build/webBuild.data",
    frameworkUrl: "build/webBuild.framework.js",
    codeUrl: "build/webuild.wasm",
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
