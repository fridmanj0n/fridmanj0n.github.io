document.addEventListener('DOMContentLoaded', () => {
    const storeduser = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(storeduser);
    const userName = localStorage.getItem('cubename');
    console.log(currentUser.username);
    console.log(currentUser);
    console.log(userName);
    if (currentUser.username !== userName){
        const button = document.getElementById('show-form-btn');
        if (currentUser.username === "shawarma"){
            button.disabled=false;
        } else {
            alert('You are not authorized to make changes to this page.');
            button.disabled=true;
        }
    }
    document.getElementById('show-form-btn').addEventListener('click', () => {
        document.getElementById('cube-form').style.display = 'block';
        document.getElementById('show-form-btn').style.display = 'none';
    });
    
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
});

let currentSubject = 'none'; // Default subject

function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function changeSubject(subject) {
    currentSubject = subject;
    document.getElementById('current-subject').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
    loadCubeData();
}

function addCube() {
    const title = document.getElementById('cube-title').value;
    const text = document.getElementById('cube-text').value;
    const color = document.getElementById('cube-color').value;

    if (title && text) {
        const newCube = createCube(title, text, color);
        document.getElementById('cubes-container').appendChild(newCube);
        saveCubeData(currentSubject, document.getElementById('cubes-container').innerHTML);
        clearForm();
    } else {
        alert('Please enter both a title and text for the cube.');
    }
}

function createCube(title, text, color) {
    const cube = document.createElement('div');
    cube.classList.add('cube');
    cube.style.backgroundColor = color;
    cube.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
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
            saveCubeData(currentSubject, document.getElementById('cubes-container').innerHTML);
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
}

function loadCubeData() {
    const data = localStorage.getItem(currentSubject) || '';
    document.getElementById('cubes-container').innerHTML = data;
    document.querySelectorAll('.cube').forEach(cube => {
        cube.addEventListener('click', function(event) {
            event.preventDefault();
            toggleFullScreen(cube);
        });
    });
}

function clearForm() {
    document.getElementById('cube-title').value = '';
    document.getElementById('cube-text').value = '';
    document.getElementById('cube-color').value = '#ffffff';
    document.getElementById('cube-form').style.display = 'none';
    document.getElementById('show-form-btn').style.display = 'block';
}

document.querySelectorAll('.cube').forEach(cube => {
    cube.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default context menu
        toggleFullScreen(this);
    });

    // Create and append delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.display = 'none'; // Initially hidden
    deleteBtn.onclick = () => cube.remove();
    cube.appendChild(deleteBtn);
});

function toggleFullScreen(cube) {
    if (cube.classList.contains('full-page')) {
        cube.classList.remove('full-page');
        cube.querySelector('button').style.display = 'none'; // Hide delete button
        setTimeout(() => {
            cube.style.transform = '';
        }, 300);
    } else {
        cube.classList.add('full-page');
        cube.style.transform = 'none';
        cube.querySelector('button').style.display = 'block'; // Show delete button
    }
}
