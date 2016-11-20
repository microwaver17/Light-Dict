// トリガキーを取得
// askTriggerKeyをemitするとsendTriggerKeyにトリガキーが帰って来る
// emit askTriggerkey, then sendTriggerKey is called back with trigger keys
var trigger_1;
var trigger_2;
self.port.on('sendTriggerKey', function(trg1, trg2){
  trigger_1 = trg1;
  trigger_2 = trg2;
});
self.port.emit('askTriggerKey');


// パネルが出る場所を保存
// hold position panel will show
var pos_x = 0;
var pos_y = 0;
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
function onMouseDown(e){
    pos_x = e.clientX;
    pos_y = e.clientY;
}
function onMouseUp(e){
    // mousedown と mouseup の座標の中間に表示させる
    pos_x = pos_x + (e.clientX - pos_x) / 2;
    pos_y = pos_y + (e.clientY - pos_y) / 2;
}

// 設定されたボタンが離された時に検索開始
// do search when a specific key is released
var pressed_key = "non_key";
var valid_keys = ["Control", "Shift", "OS", "Meta"];
document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);
function onKeydown(e){
    if (valid_keys.indexOf(e.key) != -1){
        pressed_key = e.key;
        // ボタンが離される前にトリガキーの更新を確認
        // sendTriggerKeyが呼び出されるまでタイムラグがあるので
        self.port.emit("askTriggerKey");
    }else{
        pressed_key = "non_key";
    }
}
function onKeyup(e){
    console.log('"'+e.key+'"');
    console.log('"'+e.ctrlKey+'"');
    console.log('"'+e.altKey+'"');
    console.log('"'+e.shiftKey+'"');
    console.log('"'+e.metaKey+'"');
    console.log('"'+trigger_1+'"');
    console.log('"'+trigger_2+'"');

    if (e.key === pressed_key){
        if (trigger_1 === e.key){
            search_word(1);
        }
        if (trigger_2 === e.key){
            search_word(2);
        }
    }
    // キーが押しっぱなしの繰り返しでの入力かしらべる為の処理
    // また、他のキーと同時押しの時(Ctrl + Fなど)を除くため
    // detect whether a key is holding down and fires keyupevent repeatedly
    // and ignore when a key is pressed as a shortcut key (like CTRL + F)
    pressed_key = "non_key";
}

// ツールバーのクリックでの検索 
// search by clicking the button on the toolbar
window.addEventListener("get_selected_word" , function(){
  console.log('get_selected_word');
  search_word(1);
});


// 実際の検索
function search_word(site){
    // 字数を制限する
    // limit string length
    var raw = window.getSelection().toString().substring(0, 64);
    console.log('raw: ' + raw);

    self.port.emit("searchWord", raw, pos_x, pos_y, site);
}
