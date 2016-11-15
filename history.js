var ss = require('sdk/simple-storage');
var sdk_prefs = require('sdk/simple-prefs');
var tabs = require('sdk/tabs');
var pageMod = require('sdk/page-mod');

// 単語を履歴に追加
var max_history = 1000;
var prev_word = '';
exports.add_word = function(word){
  console.log('history: ' + word);

  // 重複検索
  if (word === prev_word){
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
}

// 履歴閲覧ページにスクリプトを追加
pageMod.PageMod({
  //include: './history_page.html',
  include: 'resource://lightdict/data/history_page.html*',
  contentScriptFile: './history_page.js',
  onAttach: function(worker){
    worker.port.on('askHistory', function(){
      console.log('askHistory');
      worker.port.emit('sendHistory', ss.storage.history);
    });
  }
});

// 設定画面に検索履歴閲覧ページへのリンクを追加
sdk_prefs.on('openInformation', function(){
  tabs.open({
    url: './history_page.html',
  });
});
