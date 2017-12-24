
// ##################
// Notification part
// ##################
Notification.requestPermission();
chrome.notifications.onClicked.addListener(
                 
                 );

// ##################
// api part
// ##################

var localApi = function(dest, callback) {
    var uri = '127.0.0.1'
    var port = 8000
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.open('GET', 'http://127.0.0.1:8000/' + dest);
    xhr.send();
};

// ################
// function main()
// ################

// TODO: use Closure to reduce global variable
var queryInterval;
var queryCounter = 0;
var maxQueryTime = 1123450;
var currentIndex = 0;
var query = function() {
    localApi('job', function(data) {
            var json = JSON.parse(data);
            if (currentIndex < json.index) {
                currentIndex = json.index;
                alert('content is: ' + json.content.text);
            }
            queryCounter++;
            if (queryCounter > maxQueryTime) {
                console.log('query interval is ended');
                clearInterval(queryInterval);
            }
    });
};
queryCicle=600;
queryInterval=setInterval(query, queryCicle);
console.log('query interval is started');
