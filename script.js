document.addEventListener('DOMContentLoaded', function () {
    // The form element with id 'dataForm' should be available at this point
    const form = document.getElementById('dataForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting normally

            // Get the values of the username and password fields
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
     
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json() )  
            .then(data => {
                if(data.message === "Login SuccessFull")
                {
                    alert("Login SuccessFull");
                    window.location.href = ('dashboard.html?username=' + username) 
                }else
                {
                    alert("Invalid Login Request");
                }})
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Form not found!');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');    


    // Toggle between login and registration forms
    registerLink.addEventListener('click', function () {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    loginLink.addEventListener('click', function () {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

// // Handle login form submission
// loginButton.addEventListener('click', function (e) {
//     e.preventDefault();
//     // Simulate login check (just a demo without actual validation)
//     alert("Login Successful");
//     // Redirect to dashboard


//     window.location.href = 'dashboard.html?username=${}';
// });



// Handle registration form submission
registerButton.addEventListener('click', function (e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('newPassword').value;
    const location = document.getElementById('location').value;
    const hallLights = document.getElementById('hall').value == "" ? "0" :document.getElementById('hall').value ;
    const roomLights = document.getElementById('room').value == "" ? "0" :document.getElementById('room').value ;
    const kitchenlights = document.getElementById('kitchen').value == "" ? "0" :document.getElementById('kitchen').value ;
    var lightno = parseInt(hallLights) + parseInt(roomLights) + parseInt(kitchenlights);

    var roomno = 0;

    if(hallLights > 0)
    {
        roomno++;
    }
    if(roomLights > 0)
    {
        roomno++;
    }
    if(kitchenlights > 0)
    {
        roomno++;
    }
      
    if(newUsername.length == 0){
    alert("Enter Username");
    }
    else if(email.length == 0){
        alert("Enter Email");
    }
    else if(password.length == 0){
        alert("Enter Password");
    }
    else if(location.length == 0){
        alert("Enter location");
    }
    else if(roomno.length == 0){
        alert("Enter Lights For Your Rooms");
    }

else{
    // Simulate registration (just a demo without actual validation)
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername,  email, 
           password, location,  roomno, lightno, hallLights, roomLights, kitchenlights })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User registered successfully") {
            alert('Registration Successful');
        } else {
            alert('Registration Failure - User may already exist or failed to save user');
        }
    })
   .catch(error => console.error('Error:', error));
}
});


// if(data.message != 'User registered successfully')  
//     {
//         alert('Registration Failure - User may already exist or Failed to save user');  
//     }
//     else
//     {   
//         alert('Registration Successfull');         
//         window.location.href = ('dashboard.html?username=' + newUsername)
//     }})

// Show login form by default
loginForm.style.display = 'block';
});