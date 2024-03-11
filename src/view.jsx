import React, { useEffect } from "react";
import WebcamCapture from "./camera/model";
import speakText from "./TTS/model";

function View() {
  let { videoRef, canvasRef, datacode } = WebcamCapture();

  useEffect(() => {
    if (datacode !== null) {
      speakText(datacode);
    }
  }, [datacode]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", fontSize: 36, textAlign: "center" }}>
        TTS app for disabled
      </div>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} width={640} height={480} />
    </div>
  );
}

export default View;
