// ===== HORLOGE =====
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// ===== MINUTEUR =====
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

const timerDisplay = document.getElementById('timer-display');
const timerBtn = document.getElementById('timer-btn');
const timerHours = document.getElementById('timer-hours');
const timerMinutes = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerSeconds);
}

function startTimer() {
    if (!timerRunning) {
        if (timerSeconds === 0) {
            const hours = parseInt(timerHours.value) || 0;
            const minutes = parseInt(timerMinutes.value) || 0;
            const seconds = parseInt(timerSecondsInput.value) || 0;
            timerSeconds = hours * 3600 + minutes * 60 + seconds;
            
            if (timerSeconds === 0) {
                alert('Veuillez entrer un temps valide');
                return;
            }
        }
        
        timerRunning = true;
        timerBtn.textContent = 'Arrêter';
        
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                timerBtn.textContent = 'Démarrer';
                alert('⏰ Le temps est écoulé !');
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
        timerBtn.textContent = 'Démarrer';
    }
}

function adjustTimer(direction) {
    const increment = direction === 'increase' ? 60 : -60;
    timerSeconds = Math.max(0, timerSeconds + increment);
    updateTimerDisplay();
}

// ===== CHRONOMÈTRE =====
let stopwatchInterval = null;
let stopwatchSeconds = 0;
let stopwatchRunning = false;

const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchBtn = document.getElementById('stopwatch-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapsList = document.getElementById('laps-list');

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
}

function toggleStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchBtn.textContent = 'Arrêter';
        
        stopwatchInterval = setInterval(() => {
            stopwatchSeconds++;
            updateStopwatchDisplay();
        }, 1000);
    } else {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        stopwatchBtn.textContent = 'Démarrer';
    }
}

function addLap() {
    if (stopwatchSeconds > 0) {
        const lapItem = document.createElement('li');
        const lapNumber = lapsList.children.length + 1;
        lapItem.innerHTML = `<span>Tour ${lapNumber}</span><span>${formatTime(stopwatchSeconds)}</span>`;
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchSeconds = 0;
    stopwatchBtn.textContent = 'Démarrer';
    updateStopwatchDisplay();
    lapsList.innerHTML = '';
}

// ===== RÉVEIL =====
let alarms = [];

const alarmTime = document.getElementById('alarm-time');
const alarmMessage = document.getElementById('alarm-message');
const addAlarmBtn = document.getElementById('add-alarm-btn');
const alarmsList = document.getElementById('alarms-list');

function addAlarm() {
    const time = alarmTime.value;
    const message = alarmMessage.value.trim() || 'Alarme';
    
    if (!time) {
        alert('Veuillez entrer une heure pour l\'alarme');
        return;
    }
    
    alarms.push({ time, message, triggered: false });
    alarmTime.value = '';
    alarmMessage.value = '';
    updateAlarmsList();
}

function deleteAlarm(index) {
    alarms.splice(index, 1);
    updateAlarmsList();
}

function updateAlarmsList() {
    alarmsList.innerHTML = '';
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    alarms.forEach((alarm, index) => {
        const [hours, minutes] = alarm.time.split(':').map(Number);
        const alarmTimeInMinutes = hours * 60 + minutes;
        const diff = alarmTimeInMinutes - currentTime;
        
        let statusText;
        let statusClass;
        
        if (alarm.triggered) {
            statusText = 'Passée';
            statusClass = 'passed';
        } else if (diff < 0) {
            statusText = 'Passée';
            statusClass = 'passed';
        } else if (diff === 0) {
            statusText = 'Maintenant';
            statusClass = 'pending';
        } else {
            const hoursLeft = Math.floor(diff / 60);
            const minutesLeft = diff % 60;
            statusText = hoursLeft > 0 
                ? `Dans ${hoursLeft}h ${minutesLeft}min` 
                : `Dans ${minutesLeft}min`;
            statusClass = 'pending';
        }
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="alarm-info">
                <div class="alarm-time-display">${alarm.time}</div>
                <div class="alarm-message">${alarm.message}</div>
            </div>
            <span class="alarm-status ${statusClass}">${statusText}</span>
            <button class="delete-alarm" onclick="deleteAlarm(${index})">✕</button>
        `;
        alarmsList.appendChild(li);
    });
}

function checkAlarms() {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    alarms.forEach(alarm => {
        if (alarm.time === currentTime && !alarm.triggered) {
            alarm.triggered = true;
            alert(`⏰ ${alarm.message}`);
            updateAlarmsList();
        }
    });
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Horloge
    updateClock();
    setInterval(updateClock, 1000);
    
    // Minuteur
    updateTimerDisplay();
    timerBtn.addEventListener('click', startTimer);
    
    document.getElementById('timer-reset-btn').addEventListener('click', () => {
        clearInterval(timerInterval);
        timerRunning = false;
        timerSeconds = 0;
        timerBtn.textContent = 'Démarrer';
        updateTimerDisplay();
    });
    
    document.querySelectorAll('.arrow-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            adjustTimer(btn.dataset.action);
        });
    });
    
    // Chronomètre
    updateStopwatchDisplay();
    stopwatchBtn.addEventListener('click', toggleStopwatch);
    lapBtn.addEventListener('click', addLap);
    resetBtn.addEventListener('click', resetStopwatch);
    
    // Réveil
    addAlarmBtn.addEventListener('click', addAlarm);
    setInterval(() => {
        updateAlarmsList();
        checkAlarms();
    }, 1000);
});
