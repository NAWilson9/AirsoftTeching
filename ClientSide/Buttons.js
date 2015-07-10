/*
 * Created by Alec on 3/4/2015
 *
 * Listener for the main buttons on the page.
 */

//Generic HTTP GET method
//Takes in a url and a callback function and injects responseText into callback
function httpGet(url, callback)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            if(request.status == 200) {
                callback(request.responseText);
            }
            else {
                alert("Get Request Error | URL: " + url + " | Request Status: " + request.status);
            }
        }
    };
    request.open("GET", url, true);
    request.send(null);
}

//Generic HTTP JSON POST method
//Takes in a url, a data object, and a callback function and injects responseText into callback
function httpPost(url, data, callback)
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
            if(request.status == 200) {
                callback(request.responseText);
            }
            else {
                alert("Post Request Error | URL: " + url + " | Request Status: " + request.status);
            }
        }
    };
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
}

//Generic get page method
//Takes in page name and injects HTML into body div
function getNewPage(page) {
   function callback(responseText){
       document.getElementById('body').innerHTML = responseText;
   }
    httpGet('/get' + page + 'Page', callback);
}

//Calculates the estimated rof based on the values selected
function calculateRof(){
    var gearRatio = getCheckedButton('gearRatio');
    var batteryVoltage = getCheckedButton('batteryVoltage');
    var motorTpa = getCheckedButton('motorTpa');
    var optimalConstant = 809.5135;
    var averageConstant = 675;
    var optimalRof = (batteryVoltage * optimalConstant)/(motorTpa*gearRatio);
    var averageRof = (batteryVoltage * averageConstant)/(motorTpa*gearRatio);
    document.getElementById('optimal').innerText = 'Optimal: ' + optimalRof.toFixed(2) + 'rps';
    document.getElementById('average').innerText = 'Average: ' + averageRof.toFixed(2) + 'rps';
}

function calculateSSLoss(){
    var initialFps = document.getElementsByName('initialFPS')[0].value;
    var teethRemoved = document.getElementsByName('teethRemoved')[0].value;
    var temp = Math.pow((initialFps/3.2808399), 2);
    var joules = ((0.5*(0.2*0.001)*temp/16)*(16-teethRemoved));
    var ms = Math.pow(((joules*2)/ (.001 *.2)), .5);
    var fps = ms*3.2808399;
    document.getElementById('power').innerText = joules.toFixed(2) + 'J';
    document.getElementById('ms').innerText = ms.toFixed(2) + 'm/s';
    document.getElementById('fps').innerText = fps.toFixed(2) + 'FPS';
}

function calculateBatteryLife(){
    var power = document.getElementsByName('batteryLifePower')[0].value;
    var capacity = document.getElementsByName('batteryMah')[0].value;
    var voltage = document.getElementsByName('batteryLifeVoltage')[0].value;
    var rateOfFire = document.getElementsByName('rof')[0].value;
    var optimalCurrent = (power*rateOfFire*5)/voltage;
    var ideal = (capacity *.72*voltage)/power;
    var auto = ((capacity-300)*.648*voltage)/power;
    var semi = ((capacity-300) -.36-voltage)/power;
    document.getElementById('optimalCurrent').innerText = optimalCurrent.toFixed(2) + ' shots';
    document.getElementById('ideal').innerText = ideal.toFixed(2) + ' shots';
    document.getElementById('fullAuto').innerText = auto.toFixed(2) + ' shots';
    document.getElementById('semiOnly').innerText = semi.toFixed(2) + ' shots';
}

//Get's the checked radio button of the inputed type and returns it's value
function getCheckedButton(type){
    var buttons = document.getElementsByName(type);
    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].checked) {
            return buttons[i].value;
        }
    }
}
