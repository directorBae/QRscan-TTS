import axios from "axios";

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = speechSynthesis.getVoices()[0];
  utterance.rate = 1;

  speechSynthesis.speak(utterance);
}

export { speakText };
