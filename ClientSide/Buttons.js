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

//Get's the checked radio button of the inputed type and returns it's value
function getCheckedButton(type){
    var buttons = document.getElementsByName(type);
    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].checked) {
            return buttons[i].value;
        }
    }
}
