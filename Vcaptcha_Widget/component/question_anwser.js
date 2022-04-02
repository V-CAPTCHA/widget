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
  