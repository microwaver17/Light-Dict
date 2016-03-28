var tabs = require('sdk/tabs');
var buttons = require('sdk/ui/button/action');
var pagemods = require('sdk/page-mod');

// この関数を呼ぶとデバッグボタンが有効になる
// call this method to enable debug button
exports.enableDebug = function(){

  var debugbutton = {
    id: 'toolbar-button',
    label: 'Light Dict',
    icon: {
        '16': './icon-dict-16.png',
        '32': './icon-dict-32.png',
        '64': './icon-dict-64.png'
    },
    onClick: function(){
        tabs.open({
          url: './debug.html',
        });
    }
  };

  buttons.ActionButton(debugbutton);
  pagemods.PageMod({
    include: "http://ejje.weblio.jp/small/content/*",
    contentStyleFile: './weblio.css',
    contentScriptFile: './weblio.js',
    contentScriptWhen: 'start'
  });

};
