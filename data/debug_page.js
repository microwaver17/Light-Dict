function setListener(id, dest, obj){
  var elem = document.getElementById(id);
  elem.addEventListener('click', function(){
    self.port.emit(dest, obj);
  });
}

// ボタンをクリックで辞書を変更する
// change dictionary service by clicking a button
setListener('set_weblio', 'setSite', 'weblio');
setListener('set_kotobank', 'setSite', 'kotobank');
setListener('set_goo', 'setSite', 'goo');
setListener('set_null', 'setSite', 'null');

// ボタンをクリックでトリガーキーを変える
// change trigger keys buttons
setListener('set_allkeys', 'setTriggerKeys', 
    { ctrl: true, alt: true, meta: true, shift: true });
setListener('set_shiftkey', 'setTriggerKeys', 
    { ctrl: false, alt: false, meta: false, shift: true });
setListener('set_ctrlkey', 'setTriggerKeys', 
    { ctrl: true, alt: false, meta: false, shift: false });
