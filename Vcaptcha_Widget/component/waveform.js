
function waveform_display() {
 
    console.log("starting waveform display ...");
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true },
      function (stream) {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = function () {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;
          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += array[i];
          }
          var average = values / length;
          if(vcaptcha_progress_status == 'Waiting'){document.getElementById("micIcon").style.opacity = (average / 50);}else{
            document.getElementById("micIcon").style.opacity = 0;
          }
          //console.log(vcaptcha_progress_status);
          
          //console.log (average);
        }; // end fn stream
      },
      function (err) {
        console.log("The following error occured: " + err.name);
      });
    } else {
      console.log("getUserMedia not supported");
    }
   
  }