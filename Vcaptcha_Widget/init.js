init(); //init function

if (location.protocol !== 'https:') {
  failDialog("This Host is't HTTPS so VCAPTCHA will won't work !");
}

function init() {
  vcaptcha = document.getElementsByTagName('vcaptcha')[0];
  vcaptcha.appendChild(createDialog(vcaptcha));
}



