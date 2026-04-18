function openFeatures(){
 let allElems=document.querySelectorAll(".elem");
let fullElemPage=document.querySelectorAll(".fullElem")
let fullElemPageBackBtn=document.querySelectorAll(".fullElem .back")

//code for open the page 
allElems.forEach(function(elem){
    elem.addEventListener("click",function(){         
      fullElemPage[elem.id].style.display="block";
    })
})
//code to go backward
fullElemPageBackBtn.forEach(function(back){
 back.addEventListener("click",function(){
   fullElemPage[back.id].style.display="none";
 })
})
}
openFeatures()

function todoList(){
let currentTask=[]
if(localStorage.getItem('currentTask')){
currentTask=JSON.parse(localStorage.getItem('currentTask'))
}
else{
  console.log('Task list is empty')
}

function renderTask(){
let allTask=document.querySelector('.allTask')
let sum=''
currentTask.forEach(function(elem,idx){
  console.log(elem)
     sum= sum + ` <div class="task">
              <details>
              <summary>${elem.task} </summary> 
             <div class="important">
              <p class=>${elem.details}<h5 class ="${elem.imp ? 'show':"hide"}">imp</h5></p>
              </div>
              </details>
              <button id=${idx}>Mark as completed</button>
            </div>`
})
allTask.innerHTML=sum;
 localStorage.setItem('currentTask',JSON.stringify(currentTask))

 
document.querySelectorAll('.task button').forEach(function(btn){
  btn.addEventListener('click',function(){
   currentTask.splice(btn.id,1)
   renderTask()

})
})
}
renderTask()
let form=document.querySelector(".addTask form")
let taskInput=document.querySelector(".addTask form #taskInput")
let taskDetailsInput=document.querySelector(".addTask form textarea")
let taskCheckbox=document.querySelector("#check")

form.addEventListener('submit',function(e){
 e.preventDefault();
  currentTask.push(
    {
    task:taskInput.value, 
    details:taskDetailsInput.value,
     imp:taskCheckbox.checked
    }
    )
      renderTask()

    taskInput.value=''
    taskDetailsInput.value=''
    taskCheckbox.checked=false
   
})


}
todoList()


function dailyPlanner(){
  let dayPlanner=document.querySelector('.day-planner')

let dayPlanData=JSON.parse(localStorage.getItem('dayPlanData'))||{}

let hours=Array.from({length:18},(elem,idx)=>`${6+idx}:00-${7+idx}:00`)


let wholeDaySum=''
hours.forEach(function(elem,idx){

  let saveData= dayPlanData[idx] || ''

wholeDaySum = wholeDaySum + ` <div class="day-planner-time">
                <p>${elem}</p>
                <input id=${idx} type="text" placeholder="..." value=${saveData}>
              </div>`
})

dayPlanner.innerHTML=wholeDaySum

let dayPlannerInput=document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
      elem.addEventListener('input',function(){
      dayPlanData[elem.id]=elem.value
      localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
      })
})
}
dailyPlanner()

function motivationalQuote(){
  let quote = document.querySelector(".motivation-2 h1")
 let author = document.querySelector(".motivation-3 h2")

const api_url = "https://dummyjson.com/quotes/random";

async function getquote(url){
  const response = await fetch(url);
  var data = await response.json()
 
  quote.innerHTML = data.quote;
  author.innerHTML = data.author;
}
getquote(api_url)
}
motivationalQuote()
 

function pomodoroTimer(){
let totalSeconds = 25*60
let timerInterval=null;
let isWorkSession=true;
let timer = document.querySelector('.pomo-timer h1')
let startBtn = document.querySelector('.pomo-timer .start-timer')
let pauseBtn = document.querySelector('.pomo-timer .pause-timer')
let resetBtn = document.querySelector('.pomo-timer .reset-timer')
let session = document.querySelector('.session')

function updateTime(){
  let minutes = Math.floor( totalSeconds/60);
  let seconds = totalSeconds%60;
  timer.innerHTML= `${String(minutes).padStart('2',0)}:${String(seconds).padStart('2',0)}`
}
function startTimer(){
    clearInterval(timerInterval)
    if(isWorkSession){
       timerInterval =  setInterval(function(){
      if(totalSeconds>0){
    totalSeconds--
        updateTime()
      }else{
        isWorkSession=false
        clearInterval(timerInterval)
        timer.innerHTML='05:00'
        session.innerHTML='Take a Break'
        session.style.backgroundColor='var(--blue)'
        totalSeconds = 5*60
      }
      },10)
}else{
             timerInterval =  setInterval(function(){
      if(totalSeconds>0){
    totalSeconds--
        updateTime()
      }else{
        isWorkSession=true
        clearInterval(timerInterval)
        timer.innerHTML='25:00'
        session.innerHTML='Work Session'
        session.style.backgroundColor='var(--green)'
        totalSeconds = 25*60
      }
      },10)
}
    }
   
function pauseTimer(){
  clearInterval(timerInterval)
}
function resetTimer(){
    totalSeconds = 25*60
  clearInterval(timerInterval)
  updateTime()
}
startBtn.addEventListener('click',startTimer)
pauseBtn.addEventListener('click',pauseTimer)
resetBtn.addEventListener('click',resetTimer)
}
pomodoroTimer()

 function weatherfunctionality(){
  
let header1Time = document.querySelector('.header1 h1')
let header1Date = document.querySelector('.header1 h2')
let header2Temp = document.querySelector('.header2 h2')
let header2Condition = document.querySelector('.header2 h4')
let humidity = document.querySelector('.header2 .humidity')
let wind = document.querySelector('.header2 .wind')

var city = "Gurugram"
const apikey="4df4e30a73291914b9acd666ee8a8326";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

 var data = null

async function weatherAPICall(){

  const response=await fetch(apiUrl + city+ `&appid=${apikey}`);
    let data= await response.json();
    console.log(data);

  document.querySelector(".header1 h4").innerHTML = data.name;
  header2Temp.innerHTML = `${data.main.temp}°C`
  header2Condition.innerHTML = `${data.weather[0].main}`
  wind.innerHTML = `Wind: ${data.wind.speed + "km/h"}`
  humidity.innerHTML = `Humidity: ${data.main.humidity + "%"}`
  
}
weatherAPICall()

function timeDate(){
const totalDaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

let date = new Date()
let daysOfWeek = totalDaysOfWeek[date.getDay()]
let hours = date.getHours()
let minutes = date.getMinutes()
let seconds = date.getSeconds()
let tarik = date.getDate()
  let month = monthsNames[date.getMonth()]
  let year = date.getFullYear()
  header1Date.innerHTML = `${tarik} ${month} ${year}`
if(hours>12){
header1Time.innerHTML = `${daysOfWeek}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} PM`
}
else{
  header1Time.innerHTML = `${daysOfWeek}, ${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} AM`
}
}
setInterval(() => {
  timeDate()
}, 1000);
}
 weatherfunctionality()

function Goals(){
  let currentGoal = []
if(localStorage.getItem('currentGoal')){
  currentGoal= JSON.parse(localStorage.getItem('currentGoal'))
}
else{
  console.log("Goal list is empty")
}

function renderGoals(){
   let dailyGoals = document.querySelector('.box2')
let add=''
currentGoal.forEach(function(eelem,iidx){
  console.log(eelem)
  add = add + ` 
            <div class="innerbox">
            <details>
                <summary>${eelem.goal}</summary>
                <p>${eelem.desc}</p>
                </details>
                <button id= ${iidx} class="deleteButton">-</button>
            </div>
        </div> `
        
})
dailyGoals.innerHTML = add;
localStorage.setItem('currentGoal',JSON.stringify(currentGoal))

document.querySelectorAll('.box2 button').forEach(function(bbtn){
  bbtn.addEventListener('click',function(){
    currentGoal.splice(bbtn.id,1)
    renderGoals()
  })
})
}
renderGoals()

let form2 = document.querySelector('.box1 form')
let title = document.querySelector('.box1 form #title')
let description = document.querySelector('.box1 form #description')
let okBtn = document.querySelector('.box form #ok')


form2.addEventListener('submit',function(e){
  e.preventDefault()
  currentGoal.push({
    goal:title.value,
    desc:description.value,
  })
renderGoals()
title.value='',
description.value=''
})
}
Goals()

function Theme(){

var theme = document.querySelector('.theme')

var rootElement = document.documentElement

let flag=0;
theme.addEventListener('click',function(){

  if (flag == 0){
      rootElement.style.setProperty('--pri1','#87B6BC') //main screen
      rootElement.style.setProperty('--tri','#B7BDF7') //goal
      rootElement.style.setProperty('--eleven','#FEFFAC')  //daily planner full page
      rootElement.style.setProperty('--ten','#FFFF80')
      rootElement.style.setProperty('--eight','#FBFFDC')
      rootElement.style.setProperty('--c','#94A378') //pomodoro
      rootElement.style.setProperty('--a','#D25353')// motivation
      rootElement.style.setProperty('--b','#C63C51')
      rootElement.style.setProperty('--five','#3852B4')//todo
      rootElement.style.setProperty('--six','#5E7AC4')
      rootElement.style.setProperty('--sec','#1B0C0C') //shadow
     theme.addEventListener("click",function(){
      document.body.style.backgroundColor ="yellow"
     })
     flag=1;
  }
else if(flag == 1){
     rootElement.style.setProperty('--pri1','#EEF1FF')
     rootElement.style.setProperty('--tri','#EEF1FF')
     rootElement.style.setProperty('--eleven','#d8f3dc')
     rootElement.style.setProperty('--ten','#95d5b2')
     rootElement.style.setProperty('--eight','#b7e4c7')
     rootElement.style.setProperty('--c','#ced4da')
     rootElement.style.setProperty('--a','#FFD68A')
     rootElement.style.setProperty('--b','#e85d04')
     rootElement.style.setProperty('--five','#ad8cce')
     rootElement.style.setProperty('--six','#c8b6ff')
     rootElement.style.setProperty('--sec','#0C2B4E')
     
     flag=2;
}
else if(flag == 2){
        rootElement.style.setProperty('--pri1','#87B6BC') //main screen
      rootElement.style.setProperty('--tri','#B7BDF7') //goal
      rootElement.style.setProperty('--eleven','#FEFFAC')  //daily planner full page
      rootElement.style.setProperty('--ten','#FFFF80')
      rootElement.style.setProperty('--eight','#FBFFDC')
      rootElement.style.setProperty('--c','#D2C1B6') //pomodoro
      rootElement.style.setProperty('--a','#D25353')// motivation
      rootElement.style.setProperty('--b','#C63C51')
      rootElement.style.setProperty('--five','#3852B4')//todo
      rootElement.style.setProperty('--six','#5E7AC4')
      rootElement.style.setProperty('--sec','#1B0C0C') //shadow
   
     flag=0;
}
})
}
Theme()
