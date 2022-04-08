init(); //init function

if (location.protocol !== 'https:') {
  failDialog("This Host is't HTTPS so VCAPTCHA will won't work !");
}

function init() {
  vcaptcha = document.getElementsByTagName('vcaptcha')[0];
  vcaptcha.appendChild(createDialog(vcaptcha));
}


buttonActionVcaptcha.addEventListener('click', function (event) {
  if (vcaptcha_ValueDomain == undefined || vcaptcha_ValueKey == undefined) {
    alert("Widget Module Error: don't configulation any key value");
  }
  
  getCaptcha_api();
  const div = document.getElementById('dialogActionVcaptcha');
  div.remove();
});
