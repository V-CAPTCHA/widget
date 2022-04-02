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
