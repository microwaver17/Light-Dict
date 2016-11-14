var tabs = require('sdk/tabs');
var buttons = require('sdk/ui/button/action');
var pagemods = require('sdk/page-mod');

// この関数を呼ぶとデバッグボタンが有効になる
// calling this method enables debug button
exports.enableDebug = function(){

  // ボタンを追加
  // add a button to the toolbar
  buttons.ActionButton({
    id: 'toolbar-button',
    label: 'Light Dict',
    icon: './icon-debug-16.png',
    onClick: function(){
      tabs.open("about:addons");
      tabs.open("resource://lightdict/data/history_page.html");
      tabs.open({
        url: './debug_page.html',
      });
    }});
  

  // パネル表示用のスクリプトを通常表示でも適応
  // apply panel's .js and .css to non panel pages
  pagemods.PageMod({
    include: "http://ejje.weblio.jp/small/content/*",
    contentStyleFile: './panel_weblio.css',
    contentScriptFile: './panel_weblio.js',
    contentScriptWhen: 'start'
  });
  pagemods.PageMod({
    include: "https://kotobank.jp/ejword/*",
    contentStyleFile: './panel_kotobank.css',
    contentScriptFile: './panel_kotobank.js',
    contentScriptWhen: 'start'
  });
  pagemods.PageMod({
    include: "http://dictionary.goo.ne.jp/*",
    contentStyleFile: './goo.css',
    contentScriptFile: './goo.js',
    contentScriptWhen: 'start'
  });

};
