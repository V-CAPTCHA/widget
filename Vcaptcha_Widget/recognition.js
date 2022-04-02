var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; //init voice recog
var recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
var transcript;