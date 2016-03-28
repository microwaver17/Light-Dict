var trigger = self.options.trigger;
var pos_x = 0;
var pos_y = 0;

// パネルが出る場所を保存
// hold position panel will show
document.addEventListener('click', onClick);
function onClick(e){
    pos_x = e.clientX;
    pos_y = e.clientY;
}
// 設定されたボタンが押された時に検索開始
// do search when specific keys are pressed
document.addEventListener('keydown', onKeydown);
function onKeydown(e){
    console.log('"'+e.key+'"');
    if (
        (trigger.key == e.key || trigger.key === '') &&
        (trigger.ctrl == e.ctrlKey) &&
        (trigger.alt == e.altKey) &&
        (trigger.shift == e.shiftKey) &&
        (trigger.meta == e.metaKey)
       )
    {
        search_word();
    }
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
    var selected_text = match[0].substring(0, 64);
    console.log(selected_text);
    if (selected_text === ""){
        return;
    }
    self.port.emit("searchWord", selected_text, pos_x, pos_y);
}
