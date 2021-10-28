init(); //init function
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; //init voice recog
var recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
var transcript;

var vcaptcha;
function init() {



  vcaptcha = document.getElementsByTagName('vcaptcha')[0];
  //vcaptcha.appendChild(createForms(vcaptcha));
  vcaptcha.appendChild(createDialog(vcaptcha));
  
}



function createDialog() {
  let parent = document.createElement('div'); //create parent div for content

  // !!!Setup Div Dialog!!!
  parent.id='dialogActionVcaptcha';
  parent.style.display = 'block';
  parent.style.width = '200px';
  parent.style.font = '12px Helvetica';
  parent.style.border = '2px solid #d3d3d3';
  parent.style.borderRadius = '3px';
  parent.style.padding = '10px';
  parent.style.margin = 'auto';
  parent.style.marginBottom="20px";
  

  //Dialog Button
  let DialogButton = document.createElement('button');
  DialogButton.innerHTML = 'คลิกเพื่อเริ่มยืนยันตัวตน';
  DialogButton.id = 'buttonActionVcaptcha';
  DialogButton.style.textAlign = 'center';
  DialogButton.style.backgroundColor = '#8ebf42';
  DialogButton.style.color = 'white';
  DialogButton.style.border = 'None';
  DialogButton.style.width = '100%';
  DialogButton.style.height = '35px';
  parent.appendChild(DialogButton);
  return parent;
}

buttonActionVcaptcha.addEventListener('click', function(event) {
  vcaptcha.appendChild(createForms(vcaptcha));
  const div = document.getElementById("dialogActionVcaptcha");
div.remove();
});

function createForms() {
  let parent = document.createElement('div'); //create parent div for content

  // !!!Setup Div Prop!!!
  parent.id='formVcaptcha';
  parent.style.display = 'block';
  parent.style.width = '200px';
  parent.style.font = '12px Helvetica';
  parent.style.border = '2px solid #d3d3d3';
  parent.style.borderRadius = '3px';
  parent.style.padding = '10px';
  parent.style.margin = 'auto';
  parent.style.marginBottom="20px"
  

  // !!!Config block content for child prop!!!

  //question name
  let question = document.createElement('h2');
  question.innerHTML = '"คำถาม"'; //question name
  question.style.textAlign = 'center';

  //image for question
  let img = document.createElement('img');
  img.src = 'https://dataset.vcaptcha.work/q1.jpg';
  img.style.maxWidth = '100%';

  //Respone Text
  let responeUser = document.createElement('h3');
  responeUser.innerHTML = '"คำตอบ"';
  responeUser.style.textAlign = 'center';
  responeUser.id="txtRespone"; //set ID for get voice recog text

  //text guide name
  let textGuide = document.createElement('p');
  textGuide.innerHTML = 'พูดเพื่อตอบคำถาม';
  textGuide.style.textAlign = 'center';

  // !!!Setup Div Prop!!!
  parent.appendChild(question);
  parent.appendChild(img);
  parent.appendChild(responeUser);
  parent.appendChild(textGuide);
  recognition.start();
  return parent;
}

//Voice Recog Function

recognition.onresult = function(event) {
    transcript = event.results[0][0].transcript;
    document.getElementById("txtRespone").innerHTML=transcript;
};
recognition.onstart = function() {
    console.log("SpeechRecognition is Starting..");
};

recognition.onspeechend = function() {
    // when user is done speaking
    recognition.stop();
}

//debug_api()

function debug_api(){
  fetch('http://widgetapi.vcaptcha.work/').then(function (response) {
	// The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
  alert(data);
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
}