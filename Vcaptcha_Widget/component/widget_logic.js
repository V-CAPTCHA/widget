
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;
    function tick() {
      if (!(vcaptcha_progress_status == 'Passed')) {
        var counter = document.getElementById('bannerTimer');
        var current_minutes = mins - 1;
        seconds--;
        counter.innerHTML =
          current_minutes.toString() +
          ':' +
          (seconds < 10 ? '0' : '') +
          String(seconds);
        if (seconds > 0) {
          setTimeout(tick, 1000);
        } else {
          if (mins > 1) {
            countdown(mins - 1);
          }
        }
        if (document.getElementById('bannerTimer').innerHTML == '0:00') {
          document.getElementById('bannerTimer').style.color = 'red';
          fail_repeat = true;
          vcaptcha_status = 'Repeat';
          getCaptcha_api();
        }
      }
    }
  
    tick();
  }
  
  function updateQuestion() {
     
    createtextcanvas(c_DatasetQuestion);
    document.getElementById('imgId').src = widgetDataset +'/'+ c_Dataset;
    document.getElementById('bannerTimer').style.color = 'black';
    document.getElementById('txtRespone').innerHTML = 'พูดเพื่อตอบคำถาม';
    document.getElementById('question').style.color = 'black';
    document.getElementById('bannerTimer').style.color = 'black';
    document.getElementById('txtRespone').style.color = 'black';
    document.getElementById('textGuide').style.color = 'black';
  
  }
  
  function stuckQuestion(text) {
    createtextcanvas(text);
    document.getElementById('question').style.color = 'grey';
    document.getElementById('bannerTimer').style.color = 'grey';
    document.getElementById('txtRespone').style.color = 'grey';
    document.getElementById('textGuide').style.color = 'grey';
    vcaptcha_progress_status = 'Stuck';
    recognition.stop();
    recognition.abort();
  }
  
  function passingQuestion() {
    document.getElementById('question').style.color = 'green';
    document.getElementById('bannerTimer').style.color = 'green';
    document.getElementById('txtRespone').style.color = 'green';
    document.getElementById('textGuide').style.color = 'green';
    vcaptcha_progress_status = 'Passed';
    recognition.stop();
    recognition.abort();
  }
  