// ボタンをクリックで辞書を変更する
// change dictionary service by clicking a button
//
function setListener(elem, site){
  elem.addEventListener('click', function(){
    self.port.emit('setSite', site);
  });
}

setListener(document.getElementById('set_weblio'), 'weblio');
setListener(document.getElementById('set_kotobank'), 'kotobank');
setListener(document.getElementById('set_goo'), 'goo');
setListener(document.getElementById('set_null'), 'null');
