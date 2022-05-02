const userInput = document.getElementById('userInput');
var user;

userInput.addEventListener('click', e => {
    if (e.target.id === 'register') {
        if ((document.getElementById('privacy')).checked == true) {
            let passwd = (document.getElementById('password')).value;
            let confirmPasswd = (document.getElementById('ConfirmPassword')).value;
            if (passwd === confirmPasswd){
                registerUser();
            }else{
                alert("Passowrds must match!");
            }
        }else{
            alert("Please accept the privacy policy before creating an account!");
        }
    }  
});