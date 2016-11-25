var tabs = require('sdk/tabs');
var sdk_prefs = require('sdk/simple-prefs');
var sdk_self = require('sdk/self');

var mydebug = require('./debug.js');
var mybutton = require('./button.js');
var mysearch = require('./search');
var myhistory = require('./history');

// アイコンを隠した状態の時にアップデートするとボタンの追加が
// 失敗してしまう。以下のtry-catchはそのエラーを隠すためのもの
// である。

// デバッグ用のボタンを追懐
// add a button for debug purpose
console.log(sdk_self.version);
if(sdk_self.version.includes('testing')){
  try{
    mydebug.enableDebug();
  }catch(e){
  }
}

// すべてのページに検索制御スクリプトを挿入
mysearch.enableSearchMod();

// ツールバーにボタンを追加
try{
  mybutton.enableButton();
}catch(e){
}

// 閲覧履歴ページにスクリプトを追加
myhistory.enableHistoryMod();

// 設定画面に検索履歴閲覧ページへのリンクを追加
sdk_prefs.on('openInformation', function(){
  tabs.open({
    url: './history_page.html',
  });
});
