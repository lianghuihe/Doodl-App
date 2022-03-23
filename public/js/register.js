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

async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('UserName').value
    const email = document.getElementById('Email').value
    const password = document.getElementById('Password').value

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        // everythign went fine
        alert('Account Created')
    } else {
        alert(result.error)
    }
}