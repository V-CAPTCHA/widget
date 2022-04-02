
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
    
    //micIcon
    let micIcon = document.createElement('img');
    micIcon.src = 'data:image/png;base64,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';
    micIcon.style.width = '35px';
    micIcon.style.marginLeft = '80px';
    micIcon.style.opacity = '0.3';
    micIcon.style.textAlign = 'center';
    micIcon.id = 'micIcon';
  
    // !!!Setup Div Prop!!!
    parent.appendChild(question);
    parent.appendChild(img);
    parent.appendChild(responeUser);
    parent.appendChild(textGuide);
    parent.appendChild(bannerTimer);
    parent.appendChild(micIcon);
    
    return parent;
  }

  
  