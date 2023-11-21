document.addEventListener('DOMContentLoaded', () => {
    const storeduser = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(storeduser);
    const userName = localStorage.getItem('cubename');
    console.log(currentUser.username);
    console.log(currentUser);
    console.log(userName);
    if (currentUser.username !== userName) {
        const button = document.getElementById('show-form-btn');
        const button1 = document.getElementById('create-homework-code');
        if (currentUser.username === "shawarma") {
            button.disabled = false;
            button1.disabled = false;
        } else {
            alert('You are not authorized to make changes to this page.');
            button.disabled = true;
            button1.disabled = true;
        }
    }
    document.getElementById('show-form-btn').addEventListener('click', () => {
        document.getElementById('cube-form').style.display = 'block';
        document.getElementById('show-form-btn').style.display = 'none';
    });

    document.getElementById('create-homework-code').addEventListener('click', () =>{
        document.getElementById('set-code').style.display = 'block';
        document.getElementById('create-homework-code').style.display = 'none';
    });

    document.getElementById('sc').addEventListener('click', (event) => {
        event.preventDefault();
        const code = document.getElementById('hc').value;
        console.log(code);
        setcode(code);
    });
    function setcode(enteredCode) {
        const existingCodes = [];
        const newUserCode = {
            username: currentUser.username,
            code: enteredCode,
        };
        existingCodes.push(newUserCode)
        localStorage.setItem('codes', JSON.stringify(newUserCode));
        console.log('Code set successfully:', newUserCode);
        console.log(existingCodes);
    }

    
    
    

    document.getElementById('add-cube-btn').addEventListener('click', (event) => {
        event.preventDefault();
        addCube();
    });

    const subjectFromURL = getURLParameter('subject');
    if (subjectFromURL) {
        changeSubject(subjectFromURL);
    } else {
        changeSubject(currentSubject);
    }

    loadCubeData(`${currentSubject}`, `${userName}`); // Load cube data after DOM content is loaded
});

let currentSubject = 'none'; // Default subject

function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function changeSubject(subject) {
    const userName = localStorage.getItem('cubename');
    currentSubject = subject;
    document.getElementById('current-subject').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    loadCubeData(`${currentSubject}`, `${userName}`);
    if (currentSubject === 'homework') {
        document.getElementById('create-homework-code').style.display = 'block';
    } else {
        document.getElementById('create-homework-code').style.display = 'none';
    }
}

function addCube() {
    const storeduser = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(storeduser);
    const title = document.getElementById('cube-title').value;
    const text = document.getElementById('cube-text').value;
    const color = document.getElementById('cube-color').value;

    if (title && text) {
        const newCube = createCube(title, text, color);
        const container = document.getElementById('cubes-container');
        container.appendChild(newCube);
        const key = `${currentSubject}_${currentUser.username}`;
        saveCubeData(key, container.innerHTML);
        attachCubeEventListeners(newCube);
        clearForm();
    } else {
        alert('Please enter both a title and text for the cube.');
    }
}

function handleDelete() {
    const cube = this.closest('.cube');
    if (cube.classList.contains('full-page')) {
        cube.remove();
        const key = `${currentSubject}_${cube.dataset.username}`;
        saveCubeData(key, document.getElementById('cubes-container').innerHTML);
    }
}

function attachCubeEventListeners(cube) {
    cube.addEventListener('click', handleContextMenu);
    cube.querySelector('.delete-btn').addEventListener('click', handleDelete);
}

function createCube(title, text, color, username) {
    const cube = document.createElement('div');
    cube.classList.add('cube');
    cube.style.backgroundColor = color;
    cube.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
    cube.dataset.username = username; // Store the username as a data attribute
    cube.addEventListener('click', function(event) {
        event.preventDefault();
        toggleFullScreen(cube);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = function() {
        if (cube.classList.contains('full-page')) {
            cube.remove();
            const key = `${currentSubject}_${cube.dataset.username}`;
            saveCubeData(key, document.getElementById('cubes-container').outerHTML);
        }
    };
    cube.appendChild(deleteBtn);

    return cube;
}


function toggleFullScreen(cube) {
    cube.classList.toggle('full-page');
    const deleteBtn = cube.querySelector('.delete-btn');
    deleteBtn.style.display = cube.classList.contains('full-page') ? 'block' : 'none';
}

function saveCubeData(key, cubesHtml) {
    localStorage.setItem(key, cubesHtml);
    console.log(key, cubesHtml);
    console.log('saving cubedata');
}

function loadCubeData(subject, username) {
    console.log(`subject: ${subject}, username: ${username}`);
    const data = localStorage.getItem(`${subject}_${username}`);
    console.log(data);
    document.getElementById('cubes-container').innerHTML = data;
    document.querySelectorAll('.cube').forEach(cube => {
        cube.addEventListener('click', function(event) {
            event.preventDefault();
            toggleFullScreen(cube);
        });
    });
}




function handleContextMenu(event) {
    event.preventDefault();
    toggleFullScreen(this);
}



function clearForm() {
    document.getElementById('cube-title').value = '';
    document.getElementById('cube-text').value = '';
    document.getElementById('cube-color').value = '#ffffff';
    document.getElementById('cube-form').style.display = 'none';
    document.getElementById('show-form-btn').style.display = 'block';
} 
