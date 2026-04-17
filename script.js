//Get the Element ID's
const ValidationForm = {
     validForm: document.getElementById("validForm"),
     form:document.getElementById("form"),
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


setInterval(()=>{
     let cTime = new Date();
     let timeOptions = { hour12: true };
     DashboardContainer.currentTime.innerHTML = cTime.toLocaleTimeString('en-US', timeOptions);
},1000)


//functions
function dashboard(){
     ValidationForm.validForm.classList.add("hide")

     DashboardContainer.dashboardContainer.classList.add("show")
}

function getInputs(){
     return {
          missionName: ValidationForm.missionName.value.trim(),
          commanderName: ValidationForm.commanderName.value.trim()
     }
}

function logInStatus(){
     ValidationForm.status.innerHTML = '<p style="color: gray;">Verifying...</p>';
        
          setTimeout(()=>{
               ValidationForm.status.innerHTML = '<p style="color: green;"><i class="fas fa-check-circle"> </i> Verify Complete </i></p>';
               setTimeout(()=>{
                    ValidationForm.status.innerHTML = '<p style="color: gray;">Redirecting</p>';
               }, 2000)       
          }, 1000)
}

let countdownInterval; 
let timeRemaining = 1*60; 

function startCountdown() {
     clearInterval(countdownInterval); 
     countdownInterval = setInterval(() => {
          timeRemaining--; 
          

          let hours = Math.floor(timeRemaining / 3600);
          let minutes = Math.floor((timeRemaining % 3600) / 60);
          let seconds = timeRemaining % 60;

          let formattedHours = String(hours).padStart(2, '0');
          let formattedMinutes = String(minutes).padStart(2, '0');
          let formattedSeconds = String(seconds).padStart(2, '0');

     
          DashboardContainer.countdownDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

          if (timeRemaining <= 0) {
               clearInterval(countdownInterval); 
               DashboardContainer.countdownDisplay.innerHTML = "LIFTOFF!";
               DashboardContainer.countdownDisplay.style.color = "green";
          }
     }, 1000);
}

function abortCountdown() {
     clearInterval(countdownInterval); // Stops the timer
     DashboardContainer.countdownDisplay.innerHTML = "MISSION ABORTED";
     DashboardContainer.countdownDisplay.style.color = "red";
}

function resetCountdown() {
     clearInterval(countdownInterval); 
     timeRemaining = 1 * 60;
     
     // Resets the display text and color
     DashboardContainer.countdownDisplay.innerHTML = "00:01:00"; 
     DashboardContainer.countdownDisplay.style.color = "black"; 
}


ValidationForm.form.addEventListener("submit", (e)=>{
     e.preventDefault()
     const {missionName, commanderName} = getInputs();   
     if (missionName === "" || commanderName === ""){
          ValidationForm.status.innerHTML = '<p style="color: red;">Input Required</p>';
     } else{
          logInStatus(); 
          dashboard();
     }
})

DashboardContainer.buttons[0].addEventListener('click', startCountdown);
DashboardContainer.buttons[1].addEventListener('click', abortCountdown);
DashboardContainer.buttons[2].addEventListener('click', resetCountdown);