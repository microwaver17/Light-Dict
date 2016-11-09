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
setListener('set_urbandic', 'setSite', 'urbandic');
setListener('set_null', 'setSite', 'null');

// ボタンをクリックでトリガーキーを変える
// change trigger keys buttons
setListener('set_shiftkey', 'setTriggerKeys', 'Shift');
setListener('set_ctrlkey', 'setTriggerKeys', 'Control');
setListener('set_oskey', 'setTriggerKeys', 'OS');
setListener('set_metakey', 'setTriggerKeys', 'Meta');