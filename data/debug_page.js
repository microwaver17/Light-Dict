function setListener(id, dest, obj){
  var elem = document.getElementById(id);
  elem.addEventListener('click', function(){
    self.port.emit(dest, obj);
  });
}

// ボタンをクリックで辞書を変更する
// change dictionary service by clicking a button
setListener('set_weblio_1', 'setSite', [1, 'weblio']);
setListener('set_kotobank_1', 'setSite', [1, 'kotobank']);
setListener('set_goo_1', 'setSite', [1, 'goo']);
setListener('set_urbandic_1', 'setSite', [1, 'urbandic']);
setListener('set_null_1', 'setSite', [1, 'null']);

setListener('set_weblio_2', 'setSite', [2, 'weblio']);
setListener('set_kotobank_2', 'setSite', [2, 'kotobank']);
setListener('set_goo_2', 'setSite', [2, 'goo']);
setListener('set_urbandic_2', 'setSite', [2, 'urbandic']);
setListener('set_null_2', 'setSite', [2, 'null']);

// ボタンをクリックでトリガーキーを変える
// change trigger keys buttons
setListener('set_shiftkey_1', 'setTriggerKeys', [1, 'Shift']);
setListener('set_ctrlkey_1', 'setTriggerKeys', [1, 'Control']);
setListener('set_oskey_1', 'setTriggerKeys', [1, 'OS']);
setListener('set_metakey_1', 'setTriggerKeys', [1, 'Meta']);

setListener('set_shiftkey_2', 'setTriggerKeys', [2, 'Shift']);
setListener('set_ctrlkey_2', 'setTriggerKeys', [2, 'Control']);
setListener('set_oskey_2', 'setTriggerKeys', [2, 'OS']);
setListener('set_metakey_2', 'setTriggerKeys', [2, 'Meta']);