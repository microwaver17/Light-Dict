// 単語ページへの直接アクセスで別のページに飛ばされるのを回避
// prepend unwanted navigation due to direct page access
// it's trickey.
document.cookie = 'weblio_smlwin_btn = ;';

// Flashのスピーカーマークが変なところに表示されるから、取りあえず削除
// Because flash speaker mark placed incorrect place, remove the element ad hoc
// a speaker mark drawed by Flash places incorrect place, remove it temporary.
document.addEventListener('DOMContentLoaded', function(){
  var elem = document.getElementsByClassName('onseiSwf')[0];
  elem.parentNode.removeChild(elem);
});
