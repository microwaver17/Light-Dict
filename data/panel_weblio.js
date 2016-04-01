// a trick
document.cookie = 'weblio_smlwin_btn = ;';

// Flashのスピーカーマークが変なところに表示されるから、取りあえず削除
// Because flash speaker mark placed incorrect place, remove the element ad hoc
document.addEventListener('DOMContentLoaded', function(){
  var elem = document.getElementsByClassName('onseiSwf')[0];
  elem.parentNode.removeChild(elem);
});