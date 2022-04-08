function getCaptcha_api() {
  loading();
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
        vcaptcha_progress_status = 'Waiting';
        console.log(vcaptcha_progress_status)
        waveform_display()
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