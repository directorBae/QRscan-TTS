function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = speechSynthesis.getVoices()[0];
  utterance.rate = 1;

  window.speechSynthesis.speak(utterance);
}

export default speakText;
