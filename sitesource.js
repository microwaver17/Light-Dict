// 検索サイト別の設定
// site specific configulations

exports.getStyleUrl = function(site){
  return './' + site + '.css';
}
exports.getScriptUrl = function(site){
  return './' + site + '.js';
}

exports.getWebsiteUrl = function(word, site){
  word = escape(word);
  if (site === 'weblio')
  {
    return 'http://ejje.weblio.jp/small/content/' + word;
  }
  else if (site === 'kotobank')
  {
    return 'https://kotobank.jp/ejword/' + word;
  }
  else if (site === 'goo')
  {
    return 'http://dictionary.goo.ne.jp/srch/en/' + word + '/m0u/';
  }
  return './error.html'
}
