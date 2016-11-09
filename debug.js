var tabs = require('sdk/tabs');
var buttons = require('sdk/ui/button/action');
var pagemods = require('sdk/page-mod');
var prefs = require('sdk/simple-prefs').prefs

// この関数を呼ぶとデバッグボタンが有効になる
// this method enables debug button
exports.enableDebug = function(){

  // ボタンを追加
  // add button to toolbar
  buttons.ActionButton(debugbutton);

  // パネル表示用のスクリプトを通常表示でも適応
  // apply js and css for panel to non panel pages
  pagemods.PageMod({
    include: "http://ejje.weblio.jp/small/content/*",
    contentStyleFile: './weblio.css',
    contentScriptFile: './weblio.js',
    contentScriptWhen: 'start'
  });
  pagemods.PageMod({
    include: "https://kotobank.jp/ejword/*",
    contentStyleFile: './kotobank.css',
    contentScriptFile: './kotobank.js',
    contentScriptWhen: 'start'
  });
  pagemods.PageMod({
    include: "http://dictionary.goo.ne.jp/*",
    contentStyleFile: './goo.css',
    contentScriptFile: './goo.js',
    contentScriptWhen: 'start'
  });

};

var debugbutton = {
  id: 'toolbar-button',
  label: 'Light Dict',
  icon: './icon-debug-16.png',
  onClick: function(){
      tabs.open({
        url: './debug_page.html',
        onReady: atatchScript
      });
  }
};

function atatchScript(tab){
  var worker = tab.attach({contentScriptFile: './debug_page.js'});

  // 検索するサイトを変える
  // change dictionary service to search
  worker.port.on('setSite', function(obj){
    console.log(site);
    var num = obj[0];
    var site = obj[1];
    if (num == 1){
        prefs.site_1 = site;
    }
    if (num == 2){
        prefs.use_2 = true;
        prefs.site_2 = site;
    }
  });

  // トリガーキーを変える
  // change trigger keys
  worker.port.on('setTriggerKeys', function(obj){
    var num = obj[0];
    var key = obj[1];
    if (num == 1){
        prefs.trigger_1 = key;
    }
    if (num == 2){
        prefs.use_2 = true;
        prefs.trigger_2 = key;
    }
  });
}

