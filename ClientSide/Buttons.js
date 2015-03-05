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
        if(request.readyState == 4 && request.status == 200){
            callback(request.responseText);
        }
    };
    request.open("GET", url, true);
    request.send(null);
}

//Generic get page method
//Takes in page name and injects HTML into body div
function getNewPage(page) {
   function callback(responseText){
       document.getElementById('body').innerHTML = responseText;
   }
    httpGet('/get' + page + 'Page', callback);
}