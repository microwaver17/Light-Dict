var sdk_panel = require('sdk/panel');
var prefs = require('sdk/simple-prefs').prefs;
var tabs = require('sdk/tabs');

var sitesource = require('./sitesource.js');
var history = require('./history.js');

// すべてのページに検索制御スクリプトを挿入
// add control scripts to all pages
exports.enableSearchMod = function(){
  tabs.on('ready', function(tab){
    var worker = tab.attach({
      contentScriptFile: './search_interface.js'
    });
    worker.port.on("searchWord", exports.search_word);
    // トリガキーを求められたら返す
    worker.port.on("askTriggerKey", function(){
      if (prefs.use_2 === true){
        worker.port.emit('sendTriggerKey', prefs.trigger_1, prefs.trigger_2);
      }else{
        worker.port.emit('sendTriggerKey', prefs.trigger_1, "none");
      }
    });
  });
};

// 検索結果パネル表示
// show a searched result panel
var panel = null;
var loader_panel = null;
exports.search_word = function (raw, pos_x, pos_y, site_num, attach_button){
    var word = word_extract(raw);
    console.log(word);
    if (word === ""){
        return false;
    }
    
    var width = sizeLimit(prefs.panel_width);
    var height = sizeLimit(prefs.panel_height);
    var site = 'none';
    if (site_num == 1){
      site = prefs.site_1;
    }
    if (site_num == 2){
      site = prefs.site_2;
    }

    var pos;
    if (pos_x < 0 || pos_y < 0){
      pos = attach_button;
    }else{
      pos = { top: pos_y + 20, left: pos_x };
    }

    // 辞書ページのパネル
    // a dictionary panel
    panel = sdk_panel.Panel({
        width: width,
        height: height,
        position: pos,
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
};

// 単語の取り出し
// word extract
function word_extract(raw){
    // 余計な記号を除去
    // remove no word symbols
    raw = raw.replace(/[",:;!\?\/\(\)]/g, '');

    // 英字と空白といくつかの記号（e.g. cant't などの時）のみ受領する
    // accept latin character, whitespace and some symbols (for example "e.g.", "can't") only
    var match = raw.match(/^[a-zA-Z'-\.\s]+$/);
    if (match === null){
        return '';
    }

    // 不要な文字などの処理
    // process unnecessary characters
    var text = match[0].trim();
    text = text.replace(/\s+/g, ' '); // 複数スペース (\sでマッチするもの) を単一スペースにまとめる
    text = text.replace(/\.+$/g, '');  // 末尾のドットを削除
    text = text.replace(/^\.+/g, '');  // 先頭のドットを削除

    return text.toLowerCase();
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
