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
  worker.port.on('setSite', function(site){
    console.log(site);
    prefs.site = site;
  });

  // トリガーキーを変える
  // change trigger keys
  worker.port.on('setTriggerKeys', function(obj){
    prefs.trigger_shift = obj.shift;
    prefs.trigger_ctrl = obj.ctrl;
    prefs.trigger_alt = obj.alt;
    prefs.trigger_meta = obj.meta;
  });
}

