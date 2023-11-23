document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
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
    const userrole = localStorage.getItem('userRole');
    const storeduser = localStorage.getItem('currentUser');
    const codes = localStorage.getItem('codes');
    const currentUser = JSON.parse(storeduser);
    console.log(currentUser);
    document.getElementById('hamburger').addEventListener('click', function() {
        toggleMenu(document.getElementById('nameOptions'));
    });

    document.querySelectorAll('#nameOptions button').forEach(button => {
        button.addEventListener('click', () => {
            const userName = button.id;
            toggleMenu(document.getElementById('nameOptions'), () => {
                showSubjectSelection(userName);
            });
        });
    });
});

function showSubjectSelection(userName) {
    // Assuming you have a similar setup for subjects like you have for users
    const subjectSelection = document.getElementById('subjectSelection') || document.createElement('div');
    if (!subjectSelection.id) {
        subjectSelection.id = 'subjectSelection';
        subjectSelection.classList.add('menu', 'hidden');
        document.body.appendChild(subjectSelection);
    }

    subjectSelection.innerHTML = `
        <h2>Select a subject for ${userName}:</h2>
        <button onclick="redirectToCubeManagement('${userName}', 'math')">Math</button>
        <button onclick="redirectToCubeManagement('${userName}', 'english')">English</button>
        <button onclick="redirectToCubeManagement('${userName}', 'science')">Science</button>
        <button onclick="showentercodewindow('${userName}')">Homework</button>
    `;
    toggleMenu(subjectSelection);
}

function showentercodewindow(userName){
    const storeduser = localStorage.getItem('currentUser');
    const userrole = localStorage.getItem('userRole');
    const currentUser = JSON.parse(storeduser);
    if (userName === currentUser.username || userrole === 'admin') {
        redirectToCubeManagement(userName, 'homework')
    }
    const homeworkcodeinput = document.getElementById('homeworkcode') || document.createElement('div');
    if (!homeworkcodeinput.id) {
        homeworkcodeinput.id = 'homeworkcode';
        homeworkcodeinput.classList.add('menu', 'hidden');
        document.body.appendChild(homeworkcodeinput);
    }
    homeworkcodeinput.innerHTML = `
        <h2>Enter the code for the user's homework</2h>
        <input type="hwc" id="hwc" placeholder="Enter code">
        <button onclick="redirectTohomeworkManagement('${userName}', 'homework')">Confirm</button>
    `;
    toggleMenu(homeworkcodeinput);
}

function redirectTohomeworkManagement(userName, subject) {
    const storeduser = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(storeduser);

    const storedcodes = localStorage.getItem('codes');
    const currentcode = JSON.parse(storedcodes);
    console.log('currentcode:', currentcode);

    const enteredCode = document.getElementById('hwc').value;
    console.log(enteredCode);
    if (enteredCode === currentcode.code || currentUser.username === userName){
        window.location.href = `test.html?user=${userName}&subject=${subject}&code=${enteredCode}`;
    } else {
        alert('Invalid code or code does not belong to the user');
    }
}


function redirectToCubeManagement(userName, subject) {
    localStorage.setItem('cubename', userName);
    window.location.href = `test.html?user=${userName}&subject=${subject}`;
}

function toggleMenu(element, callback = () => {}) {
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('slide-in'), 10);
    } else {
        element.classList.remove('slide-in');
        setTimeout(() => {
            element.classList.add('hidden');
            callback();
        }, 300); // Duration should match the CSS transition
    }
}
