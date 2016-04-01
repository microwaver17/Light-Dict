// 検索サイト別の設定
// site specific configulations
var site_config = {
  weblio:   { prefix: 'weblio',   js: true,   css: true },
  kotobank: { prefix: 'kotobank', js: false,  css: true },
  goo:      { prefix: 'goo',      js: false,  css: true },
};

exports.getStyleUrl = function(site){
  var urls = ['./panel_common.css'];
  if (site_config[site]["css"] == true){
    urls.push('./panel_' + site_config[site]["prefix"] + '.css');
  }
  return urls;
}
exports.getScriptUrl = function(site){
  var urls = ['./panel_common.js'];
  if (site_config[site]["js"] == true){
    urls.push('./panel_' + site_config[site]["prefix"] + '.js');
  }
  return urls;
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
