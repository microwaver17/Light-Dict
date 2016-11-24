var ss = require('sdk/simple-storage');
var sdk_tabs = require('sdk/tabs');
var sdk_pagemod = require('sdk/page-mod');
var sdk_self = require('sdk/self');
var sdk_prefs = require('sdk/simple-prefs').prefs;

// 履歴閲覧ページにスクリプトを追加
exports.enableHistoryMod = function(){
  sdk_pagemod.PageMod({
    include: 'resource://lightdict/data/history_page.html*',
    contentScriptFile: './history_page.js',

    onAttach: function(worker){
      worker.port.on('askHistory', function(){
        console.log('askHistory');
        worker.port.emit('sendHistory', exports.get_history());
      });
      worker.port.on('delete_all_history', delete_all_history);
    }
  });
};

// 単語を履歴に追加
var max_history = 1000;
var prev_word = '';
exports.add_word = function(word){
  console.log('history: ' + word);

  // 検索履歴を残さない設定
  if (sdk_prefs.enable_history === false){
    return;
  }

  // 2回以上続けて同じ単語を検索した場合は保存しない
  if (word === prev_word){
    return;
  }
  prev_word = word;

  // 単語帳ページからの検索のときは保存しない
  if (sdk_tabs.activeTab.url == sdk_self.data.url('./history_page.html')){
    return;
  }

  if (!('history' in  ss.storage)){
    ss.storage.history = [];
  }

  if (ss.storage.history.length > max_history){
    for (var i = 0; i < 10; i++){
      ss.storage.history.shift();
    }
  }

  ss.storage.history.push(word);

  for (var i = 0; i < 10; i++){
    console.log('history: ' + ss.storage.history[i]);
  }

};

// 外部で履歴を使用したい時
exports.get_history = function(){
  return ss.storage.history;
};

// 全ての履歴を削除
function delete_all_history(){
  ss.storage.history = [];
}

