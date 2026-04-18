document.getElementById("footerYear").textContent = new Date().getFullYear();

const themeToggle_btn = document.getElementById("themeToggle");
let isRedAlert = false;


const ValidationForm = {
     validForm: document.getElementById("validForm"),
     form: document.getElementById("form"),
     missionName: document.getElementById("missionName"),
     commanderName: document.getElementById("commanderName"),
     status: document.getElementById("status")
}

const DashboardContainer = {
     dashboardContainer: document.getElementById("mainDashboard"),
     commName: document.getElementById("name"),
     liveClock: document.getElementById("liveClock"),
     currentTime: document.getElementById("currentTime"),
     buttons: document.querySelectorAll(".btnContainer button"),
     countdownDisplay: document.getElementById("countdownDisplay")
}


setInterval(() => {
     let cTime = new Date();
     let timeOptions = { hour12: true };
     DashboardContainer.currentTime.innerHTML = cTime.toLocaleTimeString('en-US', timeOptions);
}, 1000)


//functions
function dashboard() {
     ValidationForm.validForm.classList.add("hide")
     DashboardContainer.dashboardContainer.classList.add("show")
     themeToggle_btn.style.display = "flex";
}

function getInputs() {
     return {
          missionName: ValidationForm.missionName.value.trim(),
          commanderName: ValidationForm.commanderName.value.trim()
     }
}

function logInStatus() {
     ValidationForm.status.innerHTML = '<p style="color: gray;">Verifying...</p>';

     setTimeout(() => {
          ValidationForm.status.innerHTML = '<p style="color: green;"><i class="fas fa-check-circle"> </i> Verify Complete </i></p>';

          setTimeout(() => {
               ValidationForm.status.innerHTML = '<p style="color: gray;">Redirecting</p>';

               setTimeout(() => {
                    dashboard();
               }, 500);

          }, 2000)
     }, 1000)
}

let countdownInterval;
let timeRemaining = 1 * 60 * 1000;
let lastTimestamp = 0;

function formatTime(timeVal) {
     let minutes = Math.floor(timeVal / 60000);
     let seconds = Math.floor((timeVal % 60000) / 1000);
     let milliseconds = Math.floor((timeVal % 1000) / 10);

     let formattedMinutes = String(minutes).padStart(2, '0');
     let formattedSeconds = String(seconds).padStart(2, '0');
     let formattedMilliseconds = String(milliseconds).padStart(2, '0');

     return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

DashboardContainer.countdownDisplay.innerHTML = formatTime(timeRemaining);

function startCountdown() {
     clearInterval(countdownInterval);
     lastTimestamp = Date.now();

     countdownInterval = setInterval(() => {
          let now = Date.now();
          timeRemaining -= (now - lastTimestamp);
          lastTimestamp = now;

          let displayTime = timeRemaining;

          if (displayTime <= 0) {
               displayTime = 0;
               clearInterval(countdownInterval);
               DashboardContainer.countdownDisplay.innerHTML = "LIFTOFF!";
               DashboardContainer.countdownDisplay.style.color = "green";
               return;
          }

          DashboardContainer.countdownDisplay.innerHTML = formatTime(displayTime);

     }, 10);
}

function abortCountdown() {
     clearInterval(countdownInterval);
     DashboardContainer.countdownDisplay.innerHTML = "MISSION ABORTED";
     DashboardContainer.countdownDisplay.style.color = "red";
}

function resetCountdown() {
     clearInterval(countdownInterval);
     timeRemaining = 1 * 60 * 1000;

     DashboardContainer.countdownDisplay.innerHTML = formatTime(timeRemaining);
     DashboardContainer.countdownDisplay.style.color = "var(--toggle-text)";
}

ValidationForm.form.addEventListener("submit", (e) => {
     e.preventDefault()
     const { missionName, commanderName } = getInputs();
     if (missionName === "" || commanderName === "") {
          ValidationForm.status.innerHTML = '<p style="color: red;">Input Required</p>';
     } else {
          logInStatus();
     }

     DashboardContainer.commName.innerHTML = commanderName
})


themeToggle_btn.addEventListener('click', () => {
     isRedAlert = !isRedAlert;
     document.body.classList.toggle('red-alert', isRedAlert);

     if (isRedAlert) {
          themeToggle_btn.innerHTML = '<i class="fa-solid fa-circle-radiation"></i> Cancel Alert';
     } else {
          themeToggle_btn.innerHTML = '<i class="fa-solid fa-circle-radiation"></i> Engage Red Alert';
     }
})


DashboardContainer.buttons[0].addEventListener('click', startCountdown);
DashboardContainer.buttons[1].addEventListener('click', abortCountdown);
DashboardContainer.buttons[2].addEventListener('click', resetCountdown);