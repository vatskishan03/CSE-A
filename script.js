const usns = [
    "4NI22CS001", "4NI22CS002", "4NI22CS003", "4NI22CS004","4NI22CS005", "4NI22CS006", "4NI22CS007", "4NI22CS008", 
    "4NI22CS009","4NI22CS010", "4NI22CS011", "4NI22CS012",  "4NI22CS013", "4NI22CS014", "4NI22CS015", "4NI22CS016", 
    "4NI22CS017", "4NI22CS018", "4NI22CS019", "4NI22CS020", "4NI22CS021", "4NI22CS022", "4NI22CS023", "4NI22CS024", 
    "4NI22CS025", "4NI22CS026", "4NI22CS027", "4NI22CS028","4NI22CS029", "4NI22CS030", "4NI22CS031", "4NI22CS032", 
    "4NI22CS033", "4NI22CS035", "4NI22CS036", "4NI22CS037", "4NI22CS038", "4NI22CS039", "4NI22CS040", "4NI22CS041", 
    "4NI22CS042", "4NI22CS043", "4NI22CS044", "4NI22CS045", "4NI22CS046", "4NI22CS047", "4NI22CS048", 
    "4NI22CS049","4NI22CS050", "4NI22CS051", "4NI22CS052", "4NI22CS053", "4NI22CS054", "4NI22CS055", "4NI22CS056", 
    "4NI22CS057", "4NI22CS058", "4NI22CS059", "4NI22CS060", "4NI22CS061","4NI22CS066","4NI22CS075", "4NI22CS122","4NI22CS234"
];

const typingText = document.getElementById('typing-text');
const welcomeHeader = document.getElementById('welcome-header');
const numStudentsLabel = document.getElementById('numStudentsLabel');

const welcomeText = "Here we go again";

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        typingText.innerHTML += text.charAt(i);
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback);
        }, 100);
    } else if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 1000);
    }
}

function startTextAnimation() {
    typeWriter(welcomeText, 0, function () {
        typingText.innerHTML = '';
    });
}

document.addEventListener('DOMContentLoaded', startTextAnimation);

function generateRandomUSNs() {
    const numStudents = parseInt(document.getElementById("numStudents").value, 10);
    const resultDiv = document.getElementById("result");

    if (isNaN(numStudents) || numStudents <= 0 || numStudents > usns.length) {
        alert("Please enter a valid number of students.");
        return;
    }
    resultDiv.innerHTML = "";

    const shuffledUSNs = usns.sort(() => Math.random() - 0.5);
    const selectedUSNs = shuffledUSNs.slice(0, numStudents);

    const card = document.createElement('div');
    card.classList.add('card');

    const usnList = document.createElement('ul');
    usnList.classList.add('usn-list'); 

    selectedUSNs.forEach(usn => {
        const listItem = document.createElement('li');
        listItem.textContent = usn;
        usnList.appendChild(listItem);
    });

    card.appendChild(usnList);
    resultDiv.appendChild(card);
}

function startCountdown() {
    const numStudentsInput = document.getElementById("numStudents");
    const numStudents = parseInt(numStudentsInput.value, 10);

    if (isNaN(numStudents) || numStudents <= 0 || numStudents > usns.length) {
        alert("Please enter a valid number of students.");
        return;
    }
    const countdownDiv = document.getElementById("countdown");
    const generateButton = document.querySelector(".button");
    


    typingText.style.display = "none";
    numStudentsLabel.style.display = "none";
    welcomeHeader.style.display = "none";
    generateButton.style.display = "none";
    document.getElementById("numStudents").style.display = "none";


 
    document.getElementById("result").innerHTML = "";

    countdownDiv.style.display = "block"; // Display the countdown
    countdownDiv.innerHTML = '<div class="base-timer" id="app">' +
        '<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<g class="base-timer__circle">' +
        '<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>' +
        '<path id="base-timer-path-remaining" stroke-dasharray="283" ' +
        'class="base-timer__path-remaining" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>' +
        '</g>' +
        '</svg>' +
        '<span id="base-timer-label" class="base-timer__label"></span>' +
        '</div>';

    const remainingPath = document.getElementById("base-timer-path-remaining");
    remainingPath.style.stroke = 'rgb(65, 184, 131)';

    let seconds = 3;
    const countdownInterval = setInterval(function() {
        const timerLabel = document.getElementById("base-timer-label");

        const circumference = 283; 
        const progressPerSecond = circumference / 4;

        const strokeDashArrayValue = Math.max(0, (progressPerSecond * seconds));
        remainingPath.setAttribute("stroke-dasharray", `${strokeDashArrayValue} ${circumference}`);

        timerLabel.textContent = seconds >= 0 ? seconds : "0";
        seconds--;

        if (seconds < -1) {
            clearInterval(countdownInterval);
            countdownDiv.style.display = "none"; 
            generateRandomUSNs(); 
            generateButton.style.display = "block"; 
          
            typingText.style.display = "block";
            numStudentsLabel.style.display = "block";
            welcomeHeader.style.display = "block";
            document.getElementById("numStudents").style.display = "block";
        }
    }, 1000);
}
