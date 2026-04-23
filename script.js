// Show the current year in the footer
document.getElementById("footerYear").textContent = new Date().getFullYear();

const themeToggle_btn = document.getElementById("themeToggle");
let isRedAlert = false;

// Elements from the registration form
const ValidationForm = {
     validForm: document.getElementById("validForm"),
     form: document.getElementById("form"),
     missionName: document.getElementById("missionName"),
     commanderName: document.getElementById("commanderName"),
     status: document.getElementById("status")
}

// Elements from the mission dashboard
const DashboardContainer = {
     dashboardContainer: document.getElementById("mainDashboard"),
     commName: document.getElementById("name"),
     liveClock: document.getElementById("liveClock"),
     currentTime: document.getElementById("currentTime"),
     buttons: document.querySelectorAll(".btnContainer button"),
     countdownDisplay: document.getElementById("countdownDisplay")
}

// Refresh the clock display every second
setInterval(() => {
     let cTime = new Date();
     let timeOptions = { hour12: true };
     DashboardContainer.currentTime.innerHTML = cTime.toLocaleTimeString('en-US', timeOptions);
}, 1000)


// Switch from the form view to the dashboard view
function dashboard() {
     ValidationForm.validForm.classList.add("hide")
     DashboardContainer.dashboardContainer.classList.add("show")
     themeToggle_btn.style.display = "flex";
}

// Get the typed values from the form fields
function getInputs() {
     return {
          missionName: ValidationForm.missionName.value.trim(),
          commanderName: ValidationForm.commanderName.value.trim()
     }
}

// Show a fake verification process, then go to the dashboard
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
let timeRemaining = 1 * 60 * 1000; // 1 minute in milliseconds
let lastTimestamp = 0;

// Turn milliseconds into a MM:SS:ms string for display
function formatTime(timeVal) {
     let minutes = Math.floor(timeVal / 60000);
     let seconds = Math.floor((timeVal % 60000) / 1000);
     let milliseconds = Math.floor((timeVal % 1000) / 10);

     let formattedMinutes = String(minutes).padStart(2, '0');
     let formattedSeconds = String(seconds).padStart(2, '0');
     let formattedMilliseconds = String(milliseconds).padStart(2, '0');

     return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

// Show the starting time on page load
DashboardContainer.countdownDisplay.innerHTML = formatTime(timeRemaining);

// Start (or restart) the countdown timer
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

// Stop the countdown and show an abort message
function abortCountdown() {
     clearInterval(countdownInterval);
     DashboardContainer.countdownDisplay.innerHTML = "MISSION ABORTED";
     DashboardContainer.countdownDisplay.style.color = "red";
}

// Stop the countdown and reset the time back to 1 minute
function resetCountdown() {
     clearInterval(countdownInterval);
     timeRemaining = 1 * 60 * 1000;

     DashboardContainer.countdownDisplay.innerHTML = formatTime(timeRemaining);
     DashboardContainer.countdownDisplay.style.color = "var(--toggle-text)";
}

// When the form is submitted, check that both fields are filled in
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

// Switch the red alert theme on or off and update the button text
themeToggle_btn.addEventListener('click', () => {
     isRedAlert = !isRedAlert;
     document.body.classList.toggle('red-alert', isRedAlert);

     if (isRedAlert) {
          themeToggle_btn.innerHTML = '<i class="fa-solid fa-circle-radiation"></i> Cancel Alert';
     } else {
          themeToggle_btn.innerHTML = '<i class="fa-solid fa-circle-radiation"></i> Engage Red Alert';
     }
})

// Connect the three buttons to their functions
DashboardContainer.buttons[0].addEventListener('click', startCountdown);
DashboardContainer.buttons[1].addEventListener('click', abortCountdown);
DashboardContainer.buttons[2].addEventListener('click', resetCountdown);