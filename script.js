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
     buttons: document.querySelectorAll("btnContainer")
}

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


setInterval(()=>{
     let cTime = new Date();
     let timeOptions = { hour12: true };
     DashboardContainer.currentTime.innerHTML = cTime.toLocaleTimeString('en-US', timeOptions);
},1000)
