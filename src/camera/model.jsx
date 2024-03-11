import React, { useRef, useEffect, useState } from "react";
import extractQRCode from "../QR/model";
import { scrapeWebPage, convertTextToSpeech } from "../TTS/model";

function WebcamCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [datacode, setDatacode] = useState(null);
  const [newDatacode, setNewDatacode] = useState(null);

  const handleQRScan = () => {
    if (datacode === null && newDatacode !== null) {
      setDatacode(newDatacode);
    } else if (datacode !== newDatacode && newDatacode !== null) {
      setDatacode(newDatacode);
    } else {
    }
  };

  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
    setupWebcam();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    let requestId;

    const captureFrame = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      // 여기서 이미지 데이터를 원하는 방식으로 처리할 수 있습니다.
      setNewDatacode(extractQRCode(imageData));
      handleQRScan();
      requestId = requestAnimationFrame(captureFrame);
    };

    if (video && canvas) {
      video.addEventListener("play", captureFrame);
    }

    return () => {
      cancelAnimationFrame(requestId);
      if (video) {
        video.removeEventListener("play", captureFrame);
      }
    };
  }, [videoRef, canvasRef, setNewDatacode]); // setNewDatacode를 의존성 배열에 추가

  useEffect(() => {
    if (newDatacode !== null) {
      handleQRScan(); // newDatacode가 변경될 때만 handleQRScan 호출
    }
  }, [newDatacode, handleQRScan]);

  useEffect(async () => {
    if (datacode !== null) {
      try {
        const content = await scrapeWebPage(url);
        const audioContent = await convertTextToSpeech(content);
        console.log("Audio content:", audioContent.length, "bytes");

        const audioBlob = new Blob([audioContent], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audioElement = new Audio(audioUrl);
        audioElement.play();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [datacode]);

  return (
    <div>
      <h2>Webcam Capture</h2>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} width={640} height={480} />
      <div>{datacode}</div>
    </div>
  );
}

export default WebcamCapture;
