var chromaSDK = new ChromaSDK();
var keyboardEffect = new KeyboardEffects();
var settings = new Settings();

function sleep(ms) {
    var currentTime = new Date().getTime();
    while(currentTime + ms >= new Date().getTime()){}
}

function police(lvl) {
    if(!settings.getWanted())
        lvl = 0;
    
    if(lvl != window.currentWantedLevel){
        window.currentWantedLevel = lvl;
        if(undefined != window.wantedLevelIntervalID)
            clearInterval(window.wantedLevelIntervalID);

        keyboardEffect.setWantedLevel(lvl);
    }
}

function health(amount) {
    if(!settings.getHealth())
        amount = -1;
    if(amount != window.healthAmount){
        window.healthAmount = amount;
        keyboardEffect.setHealthBar(amount);
    }
}

function framerate(fps) {
    if(!settings.getFPS())
        fps = -1;

    if(fps != window.fps) {
        window.fps = fps;
        keyboardEffect.setFrameRate(fps);
    }
    
}

/** Checks the connection to Razer Chroma SDK */
function checkChromaSDKConnection() {
    $.get("http://localhost:54235/razer/chromasdk").done(function () {
            chromaSDK.init();
            callback(true, false);
        })
        .fail(function () {
            callback(false, false);
        });
}

/** Checks the connection to WebScriptHook */
function checkConnectionToGTA() {
    $.get("/connected").done(function (data) {
            callback(data, true);
        })
        .fail(function () {
            callback(false, true);
        });
}

/** Handles the callbacks from connection checks */
function callback(data, webscript) {
    if (webscript) {
        if (data == "true") {
            $("#gameConnection").html('<i class="fa fa-check-circle"></i> Connected');
            $("#gameConnection").css("color", "green");
        } else {
            $("#gameConnection").html('<i class="fa fa-exclamation-triangle"></i> Not Connected');
            $("#gameConnection").css("color", "red");
        }
        setTimeout(checkConnectionToGTA, 1500);
    } else {
        if (data) {
            $("#chromaConnection").html('<i class="fa fa-check-circle"></i> Connected');
            $("#chromaConnection").css("color", "green");
        } else {
            $("#chromaConnection").html('<i class="fa fa-exclamation-triangle"></i> Not Connected');
            $("#chromaConnection").css("color", "red");
        }
    }
}

function setStaticKeys() {
    keyboardEffect.setStaticKeys();
}

function checkData() {
    $.get("/pull").done(function (data) {
            data = JSON.parse(data);
            police(data.WantedLevel)
            health(data.PlayerHealth);
            framerate(parseInt(data.FPS));
        })
        .fail(function () {
            console.log('error');
        });
}

$(function () {
    settings.init();
    checkConnectionToGTA();
    checkChromaSDKConnection();
    setInterval(function () {
        checkData();
    }, 500);
    setTimeout(function() {
        setStaticKeys();
    },500);
});