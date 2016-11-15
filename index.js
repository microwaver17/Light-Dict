var tabs = require('sdk/tabs');
var sdk_panel = require('sdk/panel');
var prefs = require('sdk/simple-prefs').prefs;
var sdk_self = require('sdk/self');

var sitesource = require('./sitesource.js');
var mydebug = require('./debug.js');
var history = require('./history.js');
var mybutton = require('./button.js');

mybutton.enableButton();

// テスト用のボタンを追懐
// add a button for debug purpose
console.log(sdk_self.version);
if(sdk_self.version.includes('testing')){
  mydebug.enableDebug();
}

// すべてのページに制御スクリプトを挿入
// add control scripts to all pages
tabs.on('ready', function(tab){
    var worker = tab.attach({
        contentScriptFile: './search_interface.js'
    });
    worker.port.on("searchWord", searchWord);
    // トリガキーを求められたら返す
    worker.port.on("askTriggerKey", function(){
      if (prefs.use_2 === true){
        worker.port.emit('sendTriggerKey', prefs.trigger_1, prefs.trigger_2);
      }else{
        worker.port.emit('sendTriggerKey', prefs.trigger_1, "none");
      }
    });
});

// 検索結果パネル表示
// show a searched result panel
var panel = null;
var loader_panel = null;
function searchWord(word, pos_x, pos_y, site_num){
    console.log(word);
    
    var width = sizeLimit(prefs.panel_width);
    var height = sizeLimit(prefs.panel_height);
    var site = 'none';
    if (site_num == 1){
      site = prefs.site_1;
    }
    if (site_num == 2){
      site = prefs.site_2;
    }

    // 辞書ページのパネル
    // a dictionary panel
    panel = sdk_panel.Panel({
        width: width,
        height: height,
        position: {
            top: pos_y + 20,
            left: pos_x
        },
        contentURL: sitesource.getWebsiteUrl(word, site),
        contentStyleFile: ['./panel_common.css', './panel_'+site+'.css'],
        contentScriptFile: ['./panel_common.js', './panel_'+site+'.js'],
        contentScriptWhen: 'start',
    });
    // 読み込み中にスピナーを表示するパネル
    // a spinner panel shows during loading
    loader_panel = sdk_panel.Panel({
        width: 40,
        height: 40,
        position: {
            top: pos_y + 20,
            left: pos_x
        },
        contentURL: './panel_spinner.html',
    });
    loader_panel.show();
    // 辞書ページの読み込みが終わったら表示する
    // show a dictionary panel after it's contents will be loaded
    panel.port.on('loaded', function(){
      if (loader_panel.isShowing){
        panel.show();
        loader_panel.hide();

      }else{
        // キャンセルされてたら
        // if cancelled
        loader_panel.hide();
      }
    });

    // 検索履歴に追加
    history.add_word(word);
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
