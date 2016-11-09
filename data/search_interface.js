var trigger_1 = self.options.trigger_1;
var trigger_2 = self.options.trigger_2;

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
var valid_keys = ["Control", "Shift", "OS", "Meta"]
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

// 検索を実行
// do search
function search_word(site){
    // 字数を制限する
    // limit string length
    var raw = window.getSelection().toString().substring(0, 64);
    console.log('raw: ' + raw);

    var selected_text = word_extract(raw);
    console.log('extracted: ' + selected_text);
    if (selected_text === ""){
        return;
    }

    self.port.emit("searchWord", selected_text, pos_x, pos_y, site);
}

// 単語の取り出し
// word extract
function word_extract(raw){
    // 余計な記号を除去
    // remove no word symbols
    raw = raw.replace(/[",:;!\?\/\(\)]/g, '');

    // 英字と空白といくつかの記号（e.g. cant't などの時）のみ受領する
    // accept latin character, whitespace and some symbols (for example "e.g.", "can't") only
    var match = raw.match(/^[a-zA-Z'-\.\s]+$/);
    if (match == null){
        return '';
    }

    // 不要な文字などの処理
    // process unnecessary characters
    var text = match[0].trim();
    text = text.replace(/\s+/g, ' '); // 複数スペース (\sでマッチするもの) を単一スペースにまとめる
    text = text.replace(/\.+$/g, '');  // 末尾のドットを削除
    text = text.replace(/^\.+/g, '');  // 先頭のドットを削除

    return text.toLowerCase();
}
