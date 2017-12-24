
// ##################
// Notification part
// ##################
Notification.requestPermission();
chrome.notifications.onClicked.addListener(function(notificationId) {
        chrome.tabs.create({url: notificationId});
        chrome.notifications.clear(notificationId);
    });
var showNotification = function(title, message, url) {
    console.log('show notification message: ' + message + ', url: ' + url);
    var option = {
        type: 'basic',
        title: title,
        message: message,
        iconUrl: 'Liu.png',
    };
    var notificationId = url==undefined ? 'https://www.zhihu.com' : url;
    chrome.notifications.clear(notificationId);
    chrome.notifications.create(notificationId, option);
}

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
            if (currentIndex < json.index || true) { // debug
                currentIndex = json.index;
                showNotification(json.content.title, json.content.body, json.content.target_url);
            }
            queryCounter++;
            if (queryCounter > maxQueryTime) {
                console.log('query interval is ended');
                clearInterval(queryInterval);
            }
    });
};
queryCicle=20 * 60 * 1000; // twenty minus once
queryInterval=setInterval(query, queryCicle);
console.log('query interval is started');
query()