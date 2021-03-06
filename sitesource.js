// 検索サイト別の設定
// site specific configulations
var site_config = {
  weblio:   { url: "http://ejje.weblio.jp/small/content/[word]" },
  kotobank: { url: "https://kotobank.jp/ejword/[word]" },
  goo:      { url: "http://dictionary.goo.ne.jp/srch/en/[word]/m0u/" },
  urbandic: { url: "http://ja.urbandictionary.com/define.php?term=[word]" },
};

// 単語のページURLを生成
// generate a dictionary page URL
exports.getWebsiteUrl = function(word, site){
  word = escape(word);
  if (site in site_config ){
    return site_config[site].url.replace(/\[word\]/, word);
  }else{
    return './error.html';
  }
};
