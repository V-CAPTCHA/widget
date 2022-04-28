//Voice Recog Function

recognition.onresult = function (event) {
    console.log('SpeechRecognition is get Result..');
    transcript = event.results[0][0].transcript;
    document.getElementById('txtRespone').innerHTML = transcript;
    document.getElementById('textGuide').innerHTML = 'เราได้ยินคุณแล้ว';
    checkCaptcha_api();
    //vcaptcha_actionResult("Success");
  };
  recognition.onstart = function () {
    console.log('SpeechRecognition is Starting..');
    document.getElementById('textGuide').innerHTML = 'เรากำลังฟังคุณอยู่...';
  };
  
  recognition.addEventListener('speechend', function() {
    console.log('SpeechRecognition is Stopped..');
  });
  
  
  recognition.onspeechend = function () {
    // when user is done speaking
    console.log('SpeechRecognition is Ended..');
    recognition.stop();
  };
  
  recognition.onaudioend = function () {
    console.log('SpeechRecognition ended');
    setTimeout(function () {
      if (
        (vcaptcha_progress_status == 'Waiting') 
      )
        try {
          recognition.start();
        } catch (error) {
          console.log('Start recognition repeation Warning. ignored ');
        }
    }, 3000);
  };