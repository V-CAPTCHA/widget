var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
var transcript;

 