var query_input = document.getElementById('query');
query_input.focus();

// 入力してEnterを押すと検索
query_input.addEventListener('keydown', function(e){
  if (e.keyCode == 13){
    self.port.emit('search_word', query_input.value, 1);
  }
});

var dict_1 = document.getElementById('dict_1');
var dict_2 = document.getElementById('dict_2');
var history = document.getElementById('history');

dict_1.addEventListener('click', function(){
  self.port.emit('search_word', query_input.value, 1);
});
dict_2.addEventListener('click', function(){
  self.port.emit('search_word', query_input.value, 2);
});
history.addEventListener('click', function(){
  self.port.emit('open_history');
});
