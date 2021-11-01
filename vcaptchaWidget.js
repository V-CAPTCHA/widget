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

  //image for question
  let img = document.createElement('img');
  img.src = 'https://dataset.vcaptcha.work/q'+c_Dataset+'.jpg';
  img.style.maxWidth = '100%';

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

  // !!!Setup Div Prop!!!
  parent.appendChild(question);
  parent.appendChild(img);
  parent.appendChild(responeUser);
  parent.appendChild(textGuide);
  //authen Core Function
  recognition.start();
  //debug_api()
  return parent;
}

//Voice Recog Function

recognition.onresult = function (event) {
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
  recognition.stop();
};



function getCaptcha_api() {
  valueDomain = 'clienttest.com';
  valueKey = '1150123vcaptcha';
  fetch(
    'http://widgetapi.vcaptcha.work/GetCaptcha?domain=' +
      valueDomain +
      '&key=' +
      valueKey
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
      c_Id = data.action_id;
      c_Dataset = data.dataset_img;
      c_DatasetQuestion = data.dataset_question;
      vcaptcha.appendChild(createForms(vcaptcha)) //call captcha dialog
    })
    .catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
}

function checkCaptcha_api() {
  valueDomain = 'clienttest.com';
  valueKey = '1150123vcaptcha';
  valueActionID = c_Id;
  valueActionReply = transcript;
  fetch(
    'http://widgetapi.vcaptcha.work/ValidCaptcha?domain=' +
      valueDomain +
      '&key=' +
      valueKey +
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
  getCaptcha_api();
  const div = document.getElementById('dialogActionVcaptcha');
  div.remove();
});
