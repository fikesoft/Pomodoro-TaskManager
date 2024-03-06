// Timer elements
const timerMinutes = document.querySelector(".timeMinutes");
const timerSeconds = document.querySelector(".timeSeconds");

// Start and reset buttons
const buttonStart = document.querySelector(".start");
const buttonReset = document.querySelector(".reset"); // Corrected typo: buttonRest to buttonReset

// Time variables
let timeMinutes = 0;
let timeSeconds = 0;

//change status
const statusTimer= document.querySelector(".working")

//backgrounds
const backgroundColor= document.querySelector("body")
//tasks background
const backgoroundTaskColor=document.querySelector(".addTask")

// Timer reference
let timerRef = null;
//Check the proms && pause
let proms=0
let pause=0
//alert sound


// toggleTimer the function that adds to the evntListnr
function toggleTimer() {

    // If the timer is currently running, pause it
    if (buttonStart.innerHTML.includes('pause.png')) {
        clearInterval(timerRef);
        timerRef = null;
        buttonStart.innerHTML = '<img src="video-play.png">';
    } else {
        // Timer is paused, start it
        if (timerRef === null) {
            buttonStart.innerHTML = '<img src="pause.png">';
            startTimer();
        }
    }
}

function startTimer() {
    // Reset time if starting from 25:00
    if (timeMinutes === 25 && timeSeconds === 0) {
        timeMinutes = 0;
    }
    //Set interval every second will do what is in the {}
    timerRef = setInterval(() => {
        timeSeconds++;
        if (timeSeconds === 60) {
            timeSeconds = 0;
            timeMinutes++;
        }

        // Update timer display
        timerMinutes.textContent = timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes;
        timerSeconds.textContent = timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds;

        // Check if timer reaches 25 minutes
        if (timeMinutes === 25) {
            clearInterval(timerRef);
            timerRef = null;
            buttonStart.innerHTML = '<img src="video-play.png">';
            timerMinutes.textContent = "25";
            timerSeconds.textContent = "00";
            alertSound.play()
            togglePause()
        }
    }, 1000);
}

//Resets the timer
function resetTimer() {
    clearInterval(timerRef);
    timerRef = null;
    timeMinutes = 0;
    timeSeconds = 0;
    timerMinutes.textContent = "00";
    timerSeconds.textContent = "00";
    buttonStart.innerHTML = '<img src="video-play.png">';
}

// Toggles the pause for 5 minutes 
function togglePause() {
    // Restyling
    statusTimer.innerHTML = "Chilling";
    backgroundColor.style.backgroundColor = "#45B6B6";
    backgoroundTaskColor.style.backgroundColor = 'rgba(148, 210, 210, 0.8)'; // Corrected typo: backgoroundTaskColor to backgroundTaskColor

    // Start/Pause the timer
    if (buttonStart.innerHTML.includes('pause.png')) {
        clearInterval(timerRef);
        timerRef = null;
        buttonStart.innerHTML = '<img src="video-play.png">';
    } else {
        // Timer is paused, start it
        if (timerRef === null) {
            buttonStart.innerHTML = '<img src="pause.png">';
            pauseTimer();
        }
    }
}


// function countdown from 5 minutes 
function pauseTimer() {
    // Initialize the timer for 5 minutes pause
    timeMinutes = 5;
    timeSeconds = 0; // Start from the beginning of the minute

    timerRef = setInterval(() => {
        if (timeSeconds === 0) {
            if (timeMinutes > 0) {
                timeMinutes--;
                timeSeconds = 59; // Reset seconds to 59 as we go to the next minute
            }
        } else {
            timeSeconds--;
        }

        // Update the display
        timerMinutes.textContent = timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes;
        timerSeconds.textContent = timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds;

        // Check if the pause time is over
        if (timeMinutes === 0 && timeSeconds === 0) {
            clearInterval(timerRef);
            timerRef = null;
            buttonStart.innerHTML = '<img src="video-play.png">';
            
            alertSound.play()

            statusTimer.innerHTML = "Working";
            backgroundColor.style.backgroundColor = "#BA4949";
            backgoroundTaskColor.style.backgroundColor = 'rgba(107, 45, 45, 0.8)';

            timerMinutes.textContent = "25";
            timerSeconds.textContent = "00";
        }
    }, 1000); // Corrected interval to 1000ms (1 second) for accuracy
}
//Alerts the changing
var alertSound = new Audio('ding.mp3');

//Event listners
buttonStart.addEventListener("click", toggleTimer);
buttonReset.addEventListener("click", resetTimer);

//Principal button for the add Task
const buttonAddTask=document.querySelector(".addTask")
//The form that will allow to write the task and save it
const form=document.querySelector(".form.hidden")
//input from form to get the value
const input=document.querySelector("#input")
// buttons from the form 
const buttonCancel=document.querySelector(".cancel")
const buttonSave=document.querySelector("#save")

//Tasks display
const taskMain= document.querySelector(".task.hidden")
const inputTask =document.querySelector("#inputTask")

let taskId = 1; // Initialize taskId outside of the function to ensure it increments properly

function displayMainTask(inputValues) {
    // Create the main div
    const div = document.createElement('div');
    div.className = 'task hidden display';

    // Create the span for tick
    const spanTick = document.createElement('span');
    spanTick.className = `tick-${taskId}`;

    // Create the img for tick
    const imgTick = document.createElement('img');
    imgTick.src = 'balackVeref.png';
    spanTick.appendChild(imgTick); // Append img to span

    // Create the input
    const inputTask = document.createElement('input');
    inputTask.type = 'text';
    inputTask.readOnly = true;
    inputTask.id = `inputTask-${taskId}`; // Modified to ensure unique ID
    inputTask.value = inputValues;

    // Create the span for delete
    const spanDelete = document.createElement('span');
    spanDelete.className = `delete-${taskId}`;
    

    // Create the img for delete
    const imgDelete = document.createElement('img');
    imgDelete.src = 'borrar.png';
    spanDelete.appendChild(imgDelete); // Append img to span

    // Append all elements to the div
    div.appendChild(spanTick);
    div.appendChild(inputTask);
    div.appendChild(spanDelete);

    // Add to main container
    document.querySelector('.taskProcces').appendChild(div);
    
    
    let deleteNumber = document.querySelector(`.delete-${taskId}`)
    let tickNumber = document.querySelector(`.tick-${taskId}`)
    // Delete the task
    deleteNumber.style.cursor="pointer"

    deleteNumber.addEventListener("click",()=>{
        deleteNumber.parentNode.remove()
    })
    //Tick done the task
    tickNumber.style.cursor="pointer"
    tickNumber.addEventListener("click",()=>{
        tickNumber.innerHTML='<img src="greenVeref.png">'
        conffeti()
    })

    taskId++; // Increment taskId for the next task
}

//displaying the form when add Task
function displayHiddenContent(){

    if(form.classList.contains("hidden"))
        form.classList.add("display")
    
}
// confetti object
function conffeti(){
    const canvas=document.querySelector("#confetti")
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()

}

buttonAddTask.addEventListener("click",displayHiddenContent)

// Save buttons from the form 
buttonSave.addEventListener("click",()=>{
    let inputValue =""
    form.classList.remove("display")
    inputValue=input.value
    displayMainTask(inputValue);
    inputValue=""  
})
// Cancel buttons form the form 
buttonCancel.addEventListener("click",(event)=>{
    event.preventDefault()
    form.classList.remove("display")
})







