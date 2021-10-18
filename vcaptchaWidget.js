init(); //init function
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; //init voice recog
var recognition = new SpeechRecognition();
recognition.lang = 'th-TH';
var transcript;

function init() {



  let vcaptcha = document.getElementsByTagName('vcaptcha')[0];
  vcaptcha.appendChild(createForms(vcaptcha));
  
}

function createForms() {
  let parent = document.createElement('div'); //create parent div for content

  // !!!Setup Div Prop!!!
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

  return parent;
}

//Voice Recog Function

recognition.onresult = function(event) {
    transcript = event.results[0][0].transcript;
    document.getElementById("txtRespone").innerHTML=transcript;
};
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

recognition.onspeechend = function() {
    // when user is done speaking
    recognition.stop();
}
recognition.start();