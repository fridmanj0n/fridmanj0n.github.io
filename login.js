document.addEventListener('contextmenu', event => event.preventDefault());

const validCredentials = {
    "michael": "password1",
    "noamL": "password2",
    "noamO": "password3",
    "uri": "password4",
    "itamar": "password5",
    "gilad": "password6",
    "shawarma": "shawarmazetaime",
};

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
   

    console.log('Email entered:', username); // Debugging log
    console.log('Password entered:', password); // Debugging log
    const user = validCredentials[username] && validCredentials[username] === password;
    if (user) {
        const currentUser={
            username: username,
            password: password,
        };
        console.log('Login successful for:', username);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        const role = username === "shawarma" ? 'admin' : 'user';
        localStorage.setItem('userRole', role);
        window.location.href = "school_subject_picker.html";
    } else {
        console.log('Login failed for:', username);
        alert('Wrong email or password. Please try again.');
    }
});
