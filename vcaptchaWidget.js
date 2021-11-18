init(); //init function
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; //init voice recog
var recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
var transcript;
var vcaptcha;
var vcaptcha_status;
var c_Id;
var c_Dataset;
var c_DatasetQuestion;
var fail_repeat = false;
var vcaptcha_ValueDomain;
var vcaptcha_ValueKey;
function init() {
  vcaptcha = document.getElementsByTagName('vcaptcha')[0];
  vcaptcha.appendChild(createDialog(vcaptcha));

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
  let question = document.createElement('h2');
  question.innerHTML = c_DatasetQuestion; //question name
  question.style.textAlign = 'center';
  question.id = 'question';


  //image for question
  let img = document.createElement('img');
  img.src = 'https://dataset.vcaptcha.work/q'+c_Dataset+'.jpg';
  img.style.maxWidth = '100%';
  img.id = 'imgId';

  //Respone Text
  let responeUser = document.createElement('h3');
  responeUser.innerHTML = '"พูดเพื่อตอบคำถาม"';
  responeUser.style.textAlign = 'center';
  responeUser.id = 'txtRespone'; //set ID for get voice recog text

  //text guide name
  let textGuide = document.createElement('p');
  textGuide.innerHTML = "เรากำลังฟังคุณอยู่...";
  textGuide.style.textAlign = 'center';
  textGuide.id = "textGuide"
  

  //Timer Banner
  let bannerTimer = document.createElement('p');
  bannerTimer.innerHTML = "ทดสอบเวลา";
  bannerTimer.style.textAlign = 'center';
  bannerTimer.id = "bannerTimer"

  

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
  document.getElementById("textGuide").innerHTML = "เราได้ยินคุณแล้ว"
  checkCaptcha_api()
  //vcaptcha_actionResult("Success");
};
recognition.onstart = function () {
  
  console.log('SpeechRecognition is Starting..');
  document.getElementById("textGuide").innerHTML = "เรากำลังฟังคุณอยู่..."
};

recognition.onspeechend = function () {
  // when user is done speaking
  console.log('SpeechRecognition is Ended..');
  recognition.stop();
};
recognition.onaudioend = function() {
  console.log('SpeechRecognition ended');
  setTimeout(function(){ 

    try {
      recognition.start();
    } catch (error) {
      console.log("Start recognition repeation Warning. ignored ");
    }

   }, 500);
}



function getCaptcha_api() {
  vcaptcha_status = "Repeat";
  fetch(
    'http://widgetapi.vcaptcha.work/GetCaptcha?domain=' +
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
      
      if(fail_repeat==false){
        vcaptcha.appendChild(createForms(vcaptcha)) //call captcha dialog
      }
      try {
        recognition.start();
      } catch (error) {
        console.log("Start recognition repeation Warning. ignored ");
      }
      updateQuestion();
      countdown(1)
    })
    .catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
}

function checkCaptcha_api() {

  
  valueActionID = c_Id;
  valueActionReply = transcript;
  fetch(
    'http://widgetapi.vcaptcha.work/ValidCaptcha?domain=' +
      vcaptcha_ValueDomain +
      '&key=' +
      vcaptcha_ValueKey +
      '&actionID=' +
      valueActionID+
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
      if(data.Message == "This action is checked"){
        document.getElementById('question').innerHTML = "คุณตอบคำถามนี้ไปแล้ว กรุณารอรอบคำถามใหม่"
      }
      if(data.valid == "Not valid"){
        document.getElementById('question').innerHTML = "คุณตอบคำถามผิด กรุณารอรอบคำถามใหม่"
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
  if(vcaptcha_ValueDomain == undefined||vcaptcha_ValueKey ==undefined ){
    alert("Widget Module Error: don't configulation any key value")
  }
  getCaptcha_api();
  const div = document.getElementById('dialogActionVcaptcha');
  div.remove();
});



function countdown(minutes) {
  var seconds = 20;
  var mins = minutes
  function tick() {
    var counter = document.getElementById("bannerTimer");
    var current_minutes = mins-1
    seconds--;
    counter.innerHTML =
      current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
    if( seconds > 0 ) {
      setTimeout(tick, 1000);
      
    } else {
      if(mins > 1){
        countdown(mins-1);  
      }
    }
    if(document.getElementById("bannerTimer").innerHTML == "0:00"){
      document.getElementById("bannerTimer").style.color = "red";
      fail_repeat=true;
      getCaptcha_api();
      
    }
  }
  tick();
}


function updateQuestion() {
  document.getElementById('question').innerHTML = c_DatasetQuestion;
  document.getElementById('imgId').src = 'https://dataset.vcaptcha.work/q'+c_Dataset+'.jpg';
  document.getElementById('bannerTimer').style.color = "black";
  document.getElementById('txtRespone').innerHTML = "พูดเพื่อตอบคำถาม";

 
  
}
 