var trigger = self.options.trigger;
// パネルが出る場所を保存
// hold position panel will show
var pos_x = 0;
var pos_y = 0;
document.addEventListener('click', onClick);
function onClick(e){
    pos_x = e.clientX;
    pos_y = e.clientY;
}
// 設定されたボタンが離された時に検索開始
// do search when a specific key is released
var pressed_key = "non_key";
var valid_keys = ["Control", "Alt", "Shift", "OS", "Meta"]
document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);
function onKeydown(e){
    if (valid_keys.indexOf(e.key) != -1){
        pressed_key = e.key;
    }else{
        pressed_key = "non_key";
    }
}
function onKeyup(e){
    /*
    console.log('"'+e.key+'"');
    console.log('"'+e.ctrlKey+'"');
    console.log('"'+e.altKey+'"');
    console.log('"'+e.shiftKey+'"');
    console.log('"'+e.metaKey+'"');
    */
    if (
        (e.key === pressed_key) &&
        (
          (trigger.ctrl  && (e.key === "Control")) ||
          (trigger.alt   && (e.key === 'Alt')) ||
          (trigger.shift && (e.key === 'Shift')) ||
          (trigger.meta  && (e.key === 'OS')) ||
          (trigger.meta  && (e.key === 'Meta'))
        )
       )
    {
        search_word();

    }
    // キーが押しっぱなしの繰り返しでの入力かしらべる為の処理
    // また、他のキーと同時押しの時(Ctrl + Fなど)を除くため
    // detect whether a key is holding down and fires keyupevent repeatedly
    // and ignore when a key is pressed as a shortcut key (like CTRL + F)
    pressed_key = "non_key";
}

// 検索を実行
// do search
function search_word(){
    var raw = window.getSelection().toString();
    console.log(raw);

    // 英字と空白のみ
    // latin character and whitespace only
    var match = raw.match(/^[a-zA-Z ]+/);
    if (match == null){
        return;
    }

    // 字数制限
    // limit string length
    var selected_text = match[0].substring(0, 64).trim();
    console.log(selected_text);
    if (selected_text === ""){
        return;
    }
    self.port.emit("searchWord", selected_text, pos_x, pos_y);
}
