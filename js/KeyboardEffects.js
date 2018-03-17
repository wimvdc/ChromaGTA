function KeyboardEffects() {
    this.keys = new Array(6);
    for (r = 0; r < 6; r++) {
        this.keys[r] = new Array(22);
        for (c = 0; c < 22; c++) {
            this.keys[r][c] = 0;
        }
    };
    this.generalColor = new Array(6);
    for (r = 0; r < 6; r++) {
        this.generalColor[r] = new Array(22);
        for (c = 0; c < 22; c++) {
            this.generalColor[r][c] = 0;
        }
    };
    this.blackout = 0x01000000 | (0 << 16) | (0) << 8 | (0 << 0);
}
KeyboardEffects.prototype = {
    setWantedLevel: function (level) {
        var color = new Array(6);
        for (r = 0; r < 6; r++) {
            color[r] = new Array(22);
            for (c = 0; c < 22; c++) {
                color[r][c] = 0;
            }
        }
        if (level > 0 && level < 6) {
            let g = 0;
            let b = 0;
            var blue = (b / 100.0) * 0xff;
            var green = (g / 100.0) * 0xff;
            var red = 0xff - ((g / 100.0) * 0xff);
            if (level => 1 && level <= 5) {
                for (i = 1; i <= level; i++)
                    this.keys[i][0] = 0x01000000 | (blue << 16) | (green) << 8 | (red << 0);
            }
            window.redEffect = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM_KEY", {
                "color": color,
                "key": this.keys
            });

            b = 100;
            blue = (b / 100.0) * 0xff;
            green = (g / 100.0) * 0xff;
            red = 0xff - ((b / 100.0) * 0xff);
            if (level => 1 && level <= 5) {
                for (i = 1; i <= level; i++)
                    this.keys[i][0] = 0x01000000 | (blue << 16) | (green << 8) | (red << 0);
            }
            window.blueEffect = chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM_KEY", {
                "color": color,
                "key": this.keys
            });

            window.wantedLevelIntervalID = setInterval(function () {
                chromaSDK.setEffect(window.blueEffect);
                sleep(350);
                chromaSDK.setEffect(window.redEffect);
                sleep(350);
            }, 750);
        } else {
            clearInterval(window.wantedLevelIntervalID);
            for (i = 1; i < 6; i++)
                this.keys[i][0] = this.blackout;
            chromaSDK.setEffect(chromaSDK.preCreateKeyboardEffect("CHROMA_CUSTOM_KEY", {
                "color": color,
                "key": this.keys
            }))
        }

    },
    setHealthBar: function(amount){
        //Clear all blocks
        for(i = 0; i < 10; i++)
            this.keys[1][i + 2] = this.blackout;

        if(amount != -1){
            //Calculate new amount of keys
            if(amount > 0 && amount < 101) {
                let g = 100;
                let b = 0;
                var blue = (b / 100.0) * 0xff;
                var green = (g / 100.0) * 0xff;
                var red = 0xff - ((g / 100.0) * 0xff);

                let blocks = Math.round(amount / 10);
                blocks = blocks == 0 ? 1 : (blocks > 10 ? block == 10 : blocks);
                for(i = 0; i < blocks; i++)
                    this.keys[1][i + 2] = 0x01000000 | (blue << 16) | (green) << 8 | (red << 0);
            }
        }
        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", {
            "color": this.generalColor,
            "key": this.keys
        });

    },
    setFrameRate(frames) {
        let color = 0x01000000 | 0xff00;
        if(frames != -1){
            if (frames < 30)
                color = 0x01000000 | 0xff;
            if (frames >= 30 && frames < 45)
                color = 0x01000000 | 0x00a5ff;
        }else{
            color = 0x01000000 | (0 << 16) | (0) << 8 | (0 << 0);
        }

        this.keys[0][20] = color; //logo
        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", {
            "color": this.generalColor,
            "key": this.keys
        });
    },
    setStaticKeys: function (a, l) {
        this.keys[4][3] = 0x01000000 | 0xf4c842; //z
        this.keys[2][2] = 0x01000000 | 0xf4c842; //q
        this.keys[3][3] = 0x01000000 | 0xf4c842; //s
        this.keys[3][4] = 0x01000000 | 0xf4c842; //d

        chromaSDK.createKeyboardEffect("CHROMA_CUSTOM_KEY", {
            "color": this.generalColor,
            "key": this.keys
        });

    }
}