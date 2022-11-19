
const userAgent = require('user-agent');
function getExtraData() {
    return {
        title: document.title,
        url: location.href, 
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent),
    }
}

class SendTracker {
    constructor() {
        this.url = "";
        this.xhr = new XMLHttpRequest();
    }
    send(data = {}) {
        // this.xhr.open("POST", this.url, true);
        // let log = { ...getExtraData(), ...data }
        // let body = JSON.stringify(log);
        // this.xhr.setRequestHeader('Content-Type', 'application/json');
        // this.xhr.onload = function () {

        // }
        // this.xhr.onerror = function () {

        // }
        // this.xhr.send(body);
    }
}

export default new SendTracker();