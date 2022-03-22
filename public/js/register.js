const userInput = document.getElementById('userInput');
var user;

userInput.addEventListener('click', e => {
    if (e.target.id === 'register') {
        let passwd = (document.getElementsByName('Password')).value;
        let confirmPasswd = (document.getElementsByName('ConfirmPassword')).value;
        if (passwd === confirmPasswd){
            user = {
                userName: (document.getElementsByName('UserName')).value,
                password: (document.getElementsByName('Password')).value,
            }
            document.location='doodlPage';
        }
    }  
});