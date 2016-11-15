var sdk_ui = require('sdk/ui');
var sdk_panel = require('sdk/panel');
var sdk_self = require('sdk/self');
var sdk_tabs = require('sdk/tabs');

var history = require('./history');

// ツールバーのボタン
var button = null;
exports.enableButton = function(){
  button = sdk_ui.ToggleButton({
    id: "light_dict",
    label: "Light Dict",
    icon: "./icon-monodict-64.png",
    onChange: handleChange
  });
};

// 現在のタブで選択中の文字が有あれば、検索
// なければ単語帳のパネルを表示
function handleChange(state){
  if (state.checked){
    var worker = sdk_tabs.activeTab.attach({
      contentScript: 
        'var raw = window.getSelection().toString().substring(0, 64);' +
        'if (raw === ""){' +
        '  self.port.emit("empty");' +
        '}else{' +
        '  var event = new CustomEvent("toolbar_search", {});' +
        '  window.dispatchEvent(event);' +
        '  self.port.emit("search");' +
        '}'
    });
    worker.port.on('empty',function(){
      panel.show({position: button});
    }); 
    worker.port.on('search',function(){
      hidePanel();
    }); 
  }
}

// パネル関係
var panel = sdk_panel.Panel({
  width: 300,
  height: 500,
  contentURL: sdk_self.data.url('history_page.html'),
  contentScriptFile: './history_page.js',
  onHide: hidePanel
});
panel.port.on('askHistory', function(){
  panel.port.emit('sendHistory', history.get_history());
});
panel.port.on('open_new_page', function(){
  panel.hide();
  sdk_tabs.open(sdk_self.data.url('./history_page.html'));
});

// パネルを非表示にするときは、ボタンを戻し、隠している間にリロードする
function hidePanel(){
  button.state('window', {checked: false});
  panel.port.emit('reload');  //次回のために更新
}
