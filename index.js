var tabs = require('sdk/tabs');
var sdk_panel = require('sdk/panel');
var prefs = require('sdk/simple-prefs').prefs

var mydebug = require('./debug.js')

// テスト用のボタン
// button for test purpose
mydebug.enableDebug();

// すべてのページに制御スクリプトを挿入
// add control script to all pages
tabs.on('ready', function(tab){
    var worker = tab.attach({
        contentScriptFile: './search_interface.js',
        contentScriptOptions: {trigger: getTrigeerKey()}
    });
    worker.port.on("searchWord", searchWord);
});

// 検索結果パネル表示
// show search result panel
function searchWord(word, pos_x, pos_y){
    console.log(word);
    var width = sizeLimit(prefs.panel_width);
    var height = sizeLimit(prefs.panel_height);
    var panel = sdk_panel.Panel({
        width: width,
        height: height,
        position: {
            top: pos_y + 30,
            left: pos_x
        },
        contentURL: getWeblioUrl(word),
        contentStyleFile: './weblio.css',
        contentScriptFile: './weblio.js',
        contentScriptWhen: 'start',
    });
    panel.show();
}

function getTrigeerKey(){
    trigger = {
        key: prefs.trigger_key,
        ctrl: prefs.trigger_ctrl,
        alt: prefs.trigger_alt,
        shift: prefs.trigger_shift,
        meta: prefs.trigger_meta
    };

    return trigger;
}

function getWeblioUrl(word){
    return 'http://ejje.weblio.jp/small/content/' + escape(word);
}

function sizeLimit(value){
    if (value <= 0){
        return 300;
    }else if (value >= 1000){
        return 1000;
    }

    return value;
}

