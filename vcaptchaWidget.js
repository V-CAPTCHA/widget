init(); //init function
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; //init voice recog
var recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
var transcript;
var vcaptcha;
var vcaptcha_status;
var vcaptcha_progress_status;
var c_Id;
var c_Dataset;
var c_DatasetQuestion;
var fail_repeat = false;
var vcaptcha_ValueDomain = window.location.hostname;
var vcaptcha_ValueKey;
var vcaptcha_devtoggle = false;
var widgetURL = 'https://widgetapi.vcaptcha.work';
var widgetDataset = 'https://dataset.vcaptcha.work';



if (location.protocol !== 'https:') {
  failDialog("This Host is't HTTPS so VCAPTCHA will won't work !");
}

function init() {
  vcaptcha = document.getElementsByTagName('vcaptcha')[0];
  vcaptcha.appendChild(createDialog(vcaptcha));
}

function failDialog(message) {
  var url = new URL(window.location.href);
  if(url.searchParams.get("dev")!=1){vcaptcha.appendChild(createFailDialog(message, vcaptcha));}
}

function createFailDialog(message) {
  let parent = document.createElement('p'); //create parent div for content

  // !!!Setup Div Dialog!!!
  parent.id = 'FaildialogActionVcaptcha';

  //Dialog Button
  let DialogButton = document.createElement('button');
  DialogButton.innerHTML = message;
  DialogButton.style.textAlign = 'center';
  DialogButton.style.backgroundColor = 'red';
  DialogButton.style.color = 'white';
  DialogButton.style.border = 'None';
  DialogButton.style.width = '100%';
  DialogButton.style.height = '50px';

  parent.appendChild(DialogButton);
  return parent;
}

function createDialog() {
  let parent = document.createElement('div'); //create parent div for content

  // !!!Setup Div Dialog!!!
  parent.id = 'dialogActionVcaptcha';
  parent.style.display = 'block';
  parent.style.width = '200px';
  parent.style.font = '12px Helvetica';
  parent.style.border = '2px solid #d3d3d3';
  parent.style.borderRadius = '3px';
  parent.style.padding = '10px';
  parent.style.margin = 'auto';
  parent.style.marginBottom = '20px';

  //Dialog Button
  let DialogButton = document.createElement('button');
  DialogButton.innerHTML = 'คลิกเพื่อเริ่มยืนยันตัวตน';
  DialogButton.id = 'buttonActionVcaptcha';
  DialogButton.style.textAlign = 'center';
  DialogButton.style.backgroundColor = '#1a73e8';
  DialogButton.style.color = 'white';
  DialogButton.style.border = 'None';
  DialogButton.style.width = '100%';
  DialogButton.style.height = '35px';

  parent.appendChild(DialogButton);
  return parent;
}

function createForms() {
  let parent = document.createElement('div'); //create parent div for content

  // !!!Setup Div Prop!!!
  parent.id = 'formVcaptcha';
  parent.style.display = 'block';
  parent.style.width = '200px';
  parent.style.font = '12px Helvetica';
  parent.style.border = '2px solid #d3d3d3';
  parent.style.borderRadius = '3px';
  parent.style.padding = '10px';
  parent.style.margin = 'auto';
  parent.style.marginBottom = '20px';

  // !!!Config block content for child prop!!!

  //question name
  let question = document.createElement('canvas');
  question.innerHTML = 'คำถาม'; //question name
  question.style.textAlign = 'center';
  question.style.maxWidth = '100%';
  question.id = 'question';

  //image for question
  let img = document.createElement('img');
  img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  img.style.maxWidth = '100%';
  img.id = 'imgId';

  //Respone Text
  let responeUser = document.createElement('h3');
  responeUser.innerHTML = '"พูดเพื่อตอบคำถาม"';
  responeUser.style.textAlign = 'center';
  responeUser.id = 'txtRespone'; //set ID for get voice recog text

  //text guide name
  let textGuide = document.createElement('p');
  textGuide.innerHTML = 'เรากำลังฟังคุณอยู่...';
  textGuide.style.textAlign = 'center';
  textGuide.id = 'textGuide';

  //Timer Banner
  let bannerTimer = document.createElement('p');
  bannerTimer.innerHTML = 'ทดสอบเวลา';
  bannerTimer.style.textAlign = 'center';
  bannerTimer.id = 'bannerTimer';
  
  // !!!Setup Div Prop!!!
  parent.appendChild(question);
  parent.appendChild(img);
  parent.appendChild(responeUser);
  parent.appendChild(textGuide);
  parent.appendChild(bannerTimer);
  //authen Core Function

  //debug_api()
  
  return parent;
}

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

recognition.onspeechend = function () {
  // when user is done speaking
  console.log('SpeechRecognition is Ended..');
  recognition.stop();
};
recognition.onaudioend = function () {
  console.log('SpeechRecognition ended');
  setTimeout(function () {
    if (
      !(vcaptcha_progress_status == 'Stuck') &&
      vcaptcha_progress_status != 'Passed'
    )
      try {
        recognition.start();
      } catch (error) {
        console.log('Start recognition repeation Warning. ignored ');
      }
  }, 500);
};

function getCaptcha_api() {
  fetch(
    widgetURL+'/GetCaptcha?domain=' +
      vcaptcha_ValueDomain +
      '&key=' +
      vcaptcha_ValueKey
  )
    .then(function (response) {
      // The API call was successful!
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // This is the JSON from our response
      console.log(data);
      c_Id = data.action_id;
      c_Dataset = data.dataset_img;
      c_DatasetQuestion = data.dataset_question;

      if (fail_repeat == false) {
        vcaptcha.appendChild(createForms(vcaptcha)); //call captcha dialog
      }
      try {
        recognition.start();
      } catch (error) {
        console.log('Start recognition repeation Warning. ignored ');
      }
      updateQuestion();
      countdown(1);
    })
    .catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
      failDialog(
        "Can't Connet to VCAPTCHA server. please check Your Key or Domain."
      );
    });
 
}

function checkCaptcha_api() {
  valueActionID = c_Id;
  valueActionReply = transcript;
  fetch(
   widgetURL+'/ValidCaptcha?domain=' +
      vcaptcha_ValueDomain +
      '&key=' +
      vcaptcha_ValueKey +
      '&actionID=' +
      valueActionID +
      '&actionReply=' +
      valueActionReply
  )
    .then(function (response) {
      // The API call was successful!
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      // This is the JSON from our response

      try {
        vcaptcha_actionResult(data.valid);
      } catch (error) {
        console.log(error);
      }

      console.log(data);
      if (data.Message == 'This action is checked') {
        stuckQuestion('คุณตอบคำถามนี้ไปแล้ว กรุณารอรอบคำถามใหม่');
      } else if (!(data.valid == 'Valid')) {
        stuckQuestion('คุณตอบคำถามนี้ผิด กรุณารอรอบคำถามใหม่');
      } else {
        passingQuestion();
      }
    })
    .catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
}

//Addonn Function

document
  .getElementById('buttonActionVcaptcha')
  .addEventListener('mouseover', function () {
    this.style.backgroundColor = 'rgb(41 105 190)';
  });
document
  .getElementById('buttonActionVcaptcha')
  .addEventListener('mouseout', function () {
    this.style.backgroundColor = '#1a73e8';
  });

buttonActionVcaptcha.addEventListener('click', function (event) {
  if (vcaptcha_ValueDomain == undefined || vcaptcha_ValueKey == undefined) {
    alert("Widget Module Error: don't configulation any key value");
  }
  getCaptcha_api();
  const div = document.getElementById('dialogActionVcaptcha');
  div.remove();
});

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
  recognition.stop();
  vcaptcha_progress_status = 'Stuck';
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

 function createtextcanvas(text) {
  var c = document.getElementById("question");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.textAlign = "center";
  ctx.font = '50px Arial';
  ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);

  ctx.fillText(randomaddspacetotext(text), c.width / 2, c.height - 50, c.width);
  canvasdrawrandomline()
}

function randomaddspacetotext(text) {
  var text_length = text.length;
  var text_array = text.split('');
  var text_new = '';
  for (var i = 0; i < text_length; i++) {
    if (i == 0) {
      text_new += text_array[i];
    } else {
      var random_number = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      if (random_number == 1) {
        text_new += ' ' + text_array[i];
      } else {
        text_new += text_array[i];
      }
    }
  }
  return text_new;
}

 function canvasdrawrandomline() {
  var c = document.getElementById("question");
  var ctx = c.getContext("2d");
  var tmp = 0;
  while (tmp<10) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(' + Math.floor(Math.random() * (255 - 0 + 1)) + ',' + Math.floor(Math.random() * (255 - 0 + 1)) + ',' + Math.floor(Math.random() * (255 - 0 + 1)) + ')';

  ctx.moveTo(Math.random() * c.width, Math.random() * c.height);
  ctx.lineTo(Math.random() * c.width, Math.random() * c.height);
  ctx.stroke();
  tmp++;
  }
}

 