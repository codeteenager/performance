import getLastEvent from '../utils/getLastEvent.js';
import getSelector from '../utils/getSelector.js';
import tracker from '../utils/tracker.js';

export function injectJsError() {
    //捕获全局未捕获的异常
    window.addEventListener('error', function (event) {
        console.log('error' + event);
        let lastEvent = getLastEvent(); //最后一个交互事件
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({
                kind: "stability",//监控指标的大类
                type: "error", //监控指标的小类，这是一个错误
                errorType: "resourceError",  //JS或css资源加载错误
                filename: event.target.src || event.target.href, //哪个文件报错了
                tagName: event.target.tagName, //script
                stack: getlines(event.error.stack),
                selector: getSelector(event.target)//代表最后一个操作的元素
            });
        } else {
            tracker.send({
                kind: "stability",//监控指标的大类
                type: "error", //监控指标的小类，这是一个错误
                errorType: "jsError",  //JS执行错误
                message: event.message,//报错信息
                filename: event.filename, //哪个文件报错了
                position: `${event.lineno}:${event.colno}`,
                stack: getlines(event.error.stack),
                selector: lastEvent ? getSelector(lastEvent.path) : ''//代表最后一个操作的元素
            });
        }
    }, true);
    //捕获Promise异常
    window.addEventListener('unhandledrejection', (event) => {
        console.log('unhandledrejection' + event);
        let lastEvent = getLastEvent(); //最后一个交互事件
        let message;
        let filename;
        let colno;
        let lineno;
        let stack;
        let reason = event.reason;
        if (typeof reason === 'string') {
            message = reason;
        } else if (typeof reason === 'object') {
            message = reason.message;
            if (reason.stack) {
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                filename = matchResult[1];
                lineno = matchResult[2];
                colno = matchResult[3];
            }

            stack = getlines(reason.stack);
        }
        let log = {
            kind: "stability",//监控指标的大类
            type: "error", //监控指标的小类，这是一个错误
            errorType: "promiseError",  //JS执行错误
            message: message,//报错信息
            filename: filename, //哪个文件报错了
            position: `${lineno}:${colno}`,
            stack,
            selector: lastEvent ? getSelector(lastEvent.path) : ''//代表最后一个操作的元素
        };
        console.log(log);
        tracker.send(log);
    }, true);

}

function getlines(stack) {
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, ""))
}