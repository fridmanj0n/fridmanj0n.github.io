document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  darkModeToggle.addEventListener('click', function() {/*animation*/
    body.classList.toggle('dark-mode');
    updateDarkModeSymbol();
  });
  function updateDarkModeSymbol() {
    const darkModeSymbol = document.querySelector('.dark-mode-button');
    darkModeSymbol.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
    darkModeSymbol.style.transform = 'rotate(0deg)';
    setTimeout(() => {
      darkModeSymbol.style.transform = 'rotate(360deg)';
    }, 50);
  }
  updateDarkModeSymbol();
});
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
    michael: 'cnVhdGF4bw==',
    noamL: 'cGFzc3dvcmQy',
    noamO: 'cGFzc3dvcmQz',
    uri: 'Z2F5c2V4Njk=',
    itamar: 'cGFzc3dvcmQ1',
    gilad: 'cGFzc3dvcmQ2',
    shawarma: 'Z29hdHRocm93ZXI2OQ==',
    guest: 'Z3Vlc3Q=',
    michaelmom: 'bWljaGFlbG1vbQ=='
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
        if (user === 'michaelmom') {
          alert("I love michael's mom");
        }
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
