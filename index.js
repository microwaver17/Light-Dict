var tabs = require('sdk/tabs');
var sdk_panel = require('sdk/panel');
var prefs = require('sdk/simple-prefs').prefs

var sitesource = require('./sitesource.js');
var mydebug = require('./debug.js')

// テスト用のボタンを追懐
// add a button for test purpose
// mydebug.enableDebug();

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
//   word: search query
function searchWord(word, pos_x, pos_y){
    console.log(word);
    var width = sizeLimit(prefs.panel_width);
    var height = sizeLimit(prefs.panel_height);
    var site = prefs.site;

    var panel = sdk_panel.Panel({
        width: width,
        height: height,
        position: {
            top: pos_y + 20,
            left: pos_x
        },
        contentURL: sitesource.getWebsiteUrl(word, site),
        contentStyleFile: sitesource.getStyleUrl(site),
        contentScriptFile: sitesource.getScriptUrl(site),
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

var MAX_SIZE = 1000;
var MIN_SIZE = 300;
function sizeLimit(value){
    if (value <= MIN_SIZE){
        return MIN_SIZE;
    }else if (value >= MAX_SIZE){
        return MAX_SIZE;
    }

    return value;
}

