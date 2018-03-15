// JavaScript source code

function ChromaSDK() {
    var uri;
    var timerId;
}

function onTimer() {
    var request = new XMLHttpRequest();

    request.open("PUT", uri + "/heartbeat", true);

    request.setRequestHeader("content-type", "application/json");

    request.send(null);

    request.onreadystatechange = function () {
        if ((request.readyState == 4) && (request.status == 200)){
            console.log(request.responseText);
        }
    }
}

ChromaSDK.prototype = {
    init: function () {
        var request = new XMLHttpRequest();

        request.open("POST", "http://localhost:54235/razer/chromasdk", true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
            "title": "Razer Chroma SDK Sample Application",
            "description": "Razer Chroma SDK Sample Application",
            "author": {
                "name": "Chroma Developer",
                "contact": "www.razerzone.com"
            },
            "device_supported": [
                "keyboard",
                "mouse",
                "headset",
                "mousepad",
                "keypad",
                "chromalink"],
            "category": "application"
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                uri = JSON.parse(request.responseText)["uri"];
                console.log(uri);
                timerId = setInterval(onTimer, 10000);
            }
        }
    },
    uninit: function () {
        var request = new XMLHttpRequest();

        request.open("DELETE", uri, true);

        request.setRequestHeader("content-type", "application/json");

        request.send(null);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log(request.responseText);
            }
        }

        clearInterval(timerId);
    },
    createKeyboardEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        } else if (effect == "CHROMA_CUSTOM_KEY") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/keyboard", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createKeyboardEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['Result']);
    },
    preCreateKeyboardEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        } else if (effect == "CHROMA_CUSTOM_KEY") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/keyboard", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log(request.responseText);

        //console.log('preCreateKeyboardEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['Result']);

        return JSON.parse(request.responseText)['id'];
    },
    createMousematEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/mousepad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createMousematEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['Result']);
    },
    preCreateMousematEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/mousepad", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('preCreateMousematEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['Result']);

        return JSON.parse(request.responseText)['id'];
    },
    createMouseEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM2") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/mouse", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('createMouseEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['Result']);
    },
    preCreateMouseEffect: function (effect, data) {
        var jsonObj;

        if (effect == "CHROMA_NONE") {
            jsonObj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM2") {
            jsonObj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            jsonObj = JSON.stringify({ "effect": effect, "param": color });
        }

        console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("POST", uri + "/mouse", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        console.log('preCreateMouseEffect(' + effect + ', ' + data + ') returns ' + JSON.parse(request.responseText)['Result']);

        return JSON.parse(request.responseText)['id'];
    },
    setEffect: function (id) {
        var jsonObj = JSON.stringify({ "id": id });

        //console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("PUT", uri + "/effect", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        //console.log('setEffect(' + id + ') returns ' + JSON.parse(request.responseText)['Result']);
    },
    deleteEffect: function (id) {
        var jsonObj = JSON.stringify({ "id": id });

        console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("DELETE", uri + "/effect", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        console.log('deleteEffect(' + id + ') returns ' + JSON.parse(request.responseText)['Result']);
    },
    deleteEffectGroup: function (ids) {
        var jsonObj = ids;

        console.log(jsonObj);

        var request = new XMLHttpRequest();

        request.open("DELETE", uri + "/effect", false);

        request.setRequestHeader("content-type", "application/json");

        request.send(jsonObj);

        console.log('deleteEffectGroup() returns ' + JSON.parse(request.responseText));
    }
}