// to store all the Alarams ... 
var arrStore = [];
//ringtone of the alram
var sound = document.getElementById('ringtone');
	sound.loop = true;
//to current time getting clock element
var h2 = document.getElementById('clock');

//goto stopwatch||clock on clicking on tools button

function goToStopwatch(stopwatch, home){
	if(home)
	{
		console.log("do nothing");
		return;
	}
	if(stopwatch&&!home){
		document.getElementById("stopwatch-section").scrollIntoView({behavior: 'smooth'});
	}
	else if(!stopwatch&&!home){
		document.getElementById("analog-clock-section").scrollIntoView({behavior: 'smooth'});
	}
	
}



// for starting alaram from startAlram function// recent alarams card

function startAlaram(Recent_alram_Time){
	arrStore.push(Recent_alram_Time);
		const ele1 = document.createElement("div");
		ele1.setAttribute("id","setalramcards-menu");	
		const span1 = document.createElement("span");
		span1.innerHTML = Recent_alram_Time;
		const button1 = document.createElement("button");
		
		const textButton = document.createTextNode("Delete");
		button1.appendChild(textButton);
		button1.setAttribute("id","delete-alram");
		span1.setAttribute("id","Alram-name");
		ele1.appendChild(span1);
		ele1.appendChild(button1);
		document.getElementById("setalramcards").appendChild(ele1);
		button1.onclick = function(){removeAlram(button1,Recent_alram_Time)};
}

// to display current time digital
var currentTime = setInterval(function(){
	let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  //because of date function gives 24 hour time
  if(hh == 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   // for appending zero to hours,sec & min
   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let currentTime = hh + ":" + mm + ":" + ss + "" + session;
	
	h2.textContent = currentTime;
	
},1000);


// function to append zero
function addZero(time) {

	return (time < 10) ? "0" + time : time;

}

// function for selecting hours from dropdown
function hoursMenu(){

	var select = document.getElementById('alarmhrs');
	var hrs = 12

	for (i=1; i <= hrs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
		
	}
}
hoursMenu();

// function for selecting minutes from dropdown
function minMenu(){

	var select = document.getElementById('alarmmins');
	var min = 59;

	for (i=0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
minMenu();

// function for selecting seconds from dropdown
function secMenu(){

	var select = document.getElementById('alarmsecs');
	var sec = 59;

	for (i=0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
secMenu();

//function for ringing alaram 
setInterval(function(){
	let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if(hh == 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let current_Time = hh + ":" + mm + ":" + ss + "" +session;

	for(let i of arrStore){
		if (i == current_Time) {
			let alram_screen = document.getElementById("Alramring");
			// document.getElementById("main-container").style.filter = "blur(3px)";
			document.getElementById("clock").style.display = "none";
			alram_screen.style.display = "block";
			sound.play();
			}
	}
},1000);

//function to delete alram from set alram screen....
function removeAlram(button1,alarmTime){
	var parent = button1.parentNode;
  var grand_father = parent.parentNode;
  grand_father.removeChild(parent);

  arrStore = arrStore.filter(e=> e!=alarmTime);
  console.log(arrStore);

}

// function for setting alaram
function alarmSet() {

	var hr = document.getElementById('alarmhrs');
	
	var min = document.getElementById('alarmmins');
	
	var sec = document.getElementById('alarmsecs');
	
	var ap = document.getElementById('ampm');
    

    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;
    var selectedAP = ap.options[ap.selectedIndex].value;

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;
    console.log('alarmTime:' + alarmTime);


 // if alram is not present in arr, add it in arr
	if(!arrStore.includes(alarmTime)){
		arrStore.push(alarmTime);
		const ele1 = document.createElement("div");
		ele1.setAttribute("id","setalramcards-menu");	
		const span1 = document.createElement("span");
		span1.innerHTML = alarmTime;
		const button1 = document.createElement("button");
		
		const textButton = document.createTextNode("Delete");
		button1.appendChild(textButton);
		button1.setAttribute("id","delete-alram");
		span1.setAttribute("id","Alram-name");
		ele1.appendChild(span1);
		ele1.appendChild(button1);
		document.getElementById("setalramcards").appendChild(ele1);
		button1.onclick = function(){removeAlram(button1,alarmTime)};
	}
}

// Stop alaram function
function alarmClear() {
	if (sound.duration > 0 && !sound.paused) {
		let alram_screen = document.getElementById("Alramring");
		document.getElementById("clock").style.display = "block";
		alram_screen.style.display = "none";
		alert("Your alaram will stop now!!!")
		sound.pause();
	} else {
		alert("There is no alaram currently ringing!!!");
	}
		
}





// for Stopwatch function

window.onload = function () {
  
	var seconds = 00; 
	var tens = 00; 
	var appendTens = document.getElementById("tens")
	var appendSeconds = document.getElementById("seconds")
	var buttonStart = document.getElementById('button-start');
	var buttonStop = document.getElementById('button-stop');
	var buttonReset = document.getElementById('button-reset');
	var Interval ;
  
	buttonStart.onclick = function() {
	  
	  clearInterval(Interval);
	   Interval = setInterval(startTimer, 10);
	}
	
	  buttonStop.onclick = function() {
		 clearInterval(Interval);
	}
	
  
	buttonReset.onclick = function() {
	   clearInterval(Interval);
	  tens = "00";
		seconds = "00";
	  appendTens.innerHTML = tens;
		appendSeconds.innerHTML = seconds;
	}
	
	 
	
	function startTimer () {
	  tens++; 
	  
	  if(tens <= 9){
		appendTens.innerHTML = "0" + tens;
	  }
	  
	  if (tens > 9){
		appendTens.innerHTML = tens;
		
	  } 
	  
	  if (tens > 99) {
		console.log("seconds");
		seconds++;
		appendSeconds.innerHTML = "0" + seconds;
		tens = 0;
		appendTens.innerHTML = "0" + 0;
	  }
	  
	  if (seconds > 9){
		appendSeconds.innerHTML = seconds;
	  }
	
	}
	
  
  }


  // for Analog watch  
setInterval(() => {
    d = new Date(); 
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;
  
    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);



// for changing theme
var flag = false;
const d1 = new Date();
document.getElementById('date').innerHTML = d1.toDateString();
function changeTheme(){

	let main_container = document.getElementById('alaram-clock-section');
	let clock = document.getElementById('clock');
    let wrapper = document.getElementById('wrapper');
	let main_container_body = document.getElementById('main-body-container');
	if(!flag)
	{
		main_container.style.backgroundColor = 'WHITE';
		main_container.style.color = 'BLACK';
		main_container_body.style.backgroundColor = 'WHITE';
		document.getElementById('date').style.color = "Black";
		main_container_body.style.color = 'BLACK';
		clock.style.color = "BLACK";
		wrapper.style.color = "BLACK";

		flag =true;
	}
	else{
		main_container.style.backgroundColor = 'BLACK';
		main_container.style.color = 'WHITE';
		main_container_body.style.backgroundColor = 'BLACK';
		document.getElementById('date').style.color = "white";
		main_container_body.style.color = 'WHITE';
		clock.style.color = "WHITE";
		wrapper.style.color = "WHITE";
		flag = false;
	}
}