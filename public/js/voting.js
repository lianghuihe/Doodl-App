var btn1 = document.querySelector('#green');
var btn2 = document.querySelector('#red');

btn1.addEventListener('click', function() {
  
    if (btn2.classList.contains('red')) {
      btn2.classList.remove('red');
    } 
  this.classList.toggle('green');
  
});



btn2.addEventListener('click', function() {
  
    if (btn1.classList.contains('green')) {
      btn1.classList.remove('green');
    } 
  this.classList.toggle('red');
  
});

try {
  let bkgTemp = sessionStorage.getItem('backColorOption');
  //console.log(bkgTemp);
  selectBackground();
} catch (error) {
  console.log(error);
  //console.log("no bkgCol stored.");
}

function selectBackground() {
  let settingsSelect = parseInt(sessionStorage.getItem('backColorOption'));
  var bkgCol = "#f67570";
  var btnCol = "#1565c0";
  let txtCol = "#ededed";
  switch (settingsSelect) {
    case 0:
      bkgCol = "#f67570";
      btnCol = "#1565c0";
      txtCol = "#171717";
      break;
    case 1:
      bkgCol = "#171717";
      btnCol = "#ededed";
      txtCol = "#ededed";
      break;
    case 2:
      bkgCol = "#ededed";
      btnCol = "#171717";
      txtCol = "#171717";
      break;
    case 3:
      bkgCol = "#1565c0";
      btnCol = "#f67570";
      txtCol = "#171717";
      break;
  }
  document.body.style.backgroundColor = bkgCol;
  //document.body.style.color = txtCol;

  document.getElementById('votingHeader').style.color = txtCol;
}