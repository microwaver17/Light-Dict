var sdk_button = require('sdk/ui/button/action');
var sdk_panel = require('sdk/panel');
var sdk_self = require('sdk/self');
var sdk_tabs = require('sdk/tabs');

var myhistory = require('./history');
var mysearch = require('./search.js');

// ツールバーのボタン
var button = null;
exports.enableButton = function(){
  button = sdk_button.ActionButton({
    id: "light_dict",
    label: "Light Dict",
    icon: "./icon-monodict-48.png",
    onClick: handleClick
  });
};

// 現在のタブで選択中の文字が有あれば、検索
// なければ単語帳のパネルを表示
function handleClick(){
  var worker = sdk_tabs.activeTab.attach({
    contentScript: 
      'var raw = window.getSelection().toString().substring(0, 64);' +
      'if (raw === ""){' +
      '  self.port.emit("empty");' +
      '}else{' +
      '  var event = new CustomEvent("toolbar_search", {});' +
      '  window.dispatchEvent(event);' +
      '  self.port.emit("search", raw);' +
      '}'
  });
  worker.port.on('empty',function(){
    //panel.show({position: button});
    var panel = sdk_panel.Panel({
      width: 300,
      height: 140,
      contentURL: './prompt.html',
      contentScriptFile: './prompt.js',
      position: button
    });
    panel.port.on('search_word', function(text, site){
      mysearch.search_word(text, -1, -1, site, button);
      panel.hide();
    });
    panel.port.on('open_history', function(){
      sdk_tabs.open('./history_page.html');
      panel.hide();
    });
    panel.show();
  }); 
  worker.port.on('search',function(raw){
    mysearch.search_word(raw, -1, -1, 1, button);
  }); 
}
