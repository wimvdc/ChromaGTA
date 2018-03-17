function Settings() {
    this.defaultValue = true;
}

Settings.prototype = {
    init: function () {
        if(typeof(Storage) !== "undefined"){
            if(!localStorage.wanted) {
                localStorage.wanted = this.defaultValue;
            }
            if(!localStorage.health) {
                localStorage.health = this.defaultValue;
            }
            if(!localStorage.fps) {
                localStorage.fps = this.defaultValue;
            }
            if(!localStorage.azerty) {
                localStorage.azerty = this.defaultValue;
            }
            this.updateSettingsView();
            this.addChangeListeners();
        }else{
            console.error("No storage API in this browser :'(");
        }
    },
    updateSettingsView: function(){
        $("input#wanted").attr("checked", this.getWanted());
        $("input#health").attr("checked", this.getHealth());
        $("input#fps").attr("checked", this.getFPS());
        $("input#azerty").attr("checked", this.getAzerty());
    },
    addChangeListeners: function(){
        $("input#wanted").change(function(){
            localStorage.wanted = $(this).is(":checked");
        });
        $("input#health").change(function(){
            localStorage.health = $(this).is(":checked");
        });
        $("input#fps").change(function(){
            localStorage.fps = $(this).is(":checked");
        });
        $("input#azerty").change(function(){
            localStorage.azerty = $(this).is(":checked");
        });
    },
    getWanted: function(){
        return localStorage.wanted === "true";
    },
    getHealth: function(){
        return localStorage.health === "true";
    },
    getFPS: function(){
        return localStorage.fps === "true";
    },
    getAzerty: function(){
        return localStorage.azerty === "true";
    }
}