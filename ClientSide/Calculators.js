/*
 * Created by Alec on 7/9/2015
 *
 * Backend processing for all calculators
 */

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