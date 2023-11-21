document.addEventListener('contextmenu', event => event.preventDefault());

function decodePasswords(obj) {
    const decodedPasswords = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const decodedValue = atob(obj[key]);
        decodedPasswords[key] = decodedValue;
      }
    }
    return decodedPasswords;
  }
  
  // Obfuscated passwords
  const obfuscatedPasswords = {
    michael: 'cGFzc3dvcmQx',
    noamL: 'cGFzc3dvcmQy',
    noamO: 'cGFzc3dvcmQz',
    uri: 'cGFzc3dvcmQ0',
    itamar: 'cGFzc3dvcmQ1',
    gilad: 'cGFzc3dvcmQ2',
    shawarma: 'c2hhd2FybWF6ZXRhaW1l'
  };
  
  // Decoded passwords
  const validCredentials = decodePasswords(obfuscatedPasswords);

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
