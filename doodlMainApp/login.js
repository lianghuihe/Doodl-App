const userInput = document.getElementById('userInput');
var user;

userInput.addEventListener('click', e => {
    if (e.target.id === 'login') {
        user = {
            userName: (document.getElementsByName('UserName')).value,
            password: (document.getElementsByName('Password')).value,
        }
        document.location='doodlPage.html';
    }  
});