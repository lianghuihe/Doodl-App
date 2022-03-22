const userInput = document.getElementById('userInput');
var user;

userInput.addEventListener('click', e => {
    if (e.target.id === 'register') {
        let passwd = (document.getElementById('Password')).value;
        let confirmPasswd = (document.getElementById('ConfirmPassword')).value;
        if (passwd === confirmPasswd){
            user = {
                userName: (document.getElementById('UserName')).value,
                password: (document.getElementById('Password')).value,
            }
            document.location='doodlPage';
        }
    }  
});