const userInput = document.getElementById('userInput');
var user;

userInput.addEventListener('click', e => {
    if (e.target.id === 'register') {
        if ((document.getElementById('privacy')).checked == true) {
            let passwd = (document.getElementById('Password')).value;
            let confirmPasswd = (document.getElementById('ConfirmPassword')).value;
            if (passwd === confirmPasswd){
                registerUser();
                document.location='doodlPage';
            }
        }else{
            alert("Please accept the privacy policy before creating an account!");
        }
    }  
});