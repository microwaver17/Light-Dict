var query_input = document.getElementById('query');
query_input.focus();

// 入力してEnterを押すと検索
query_input.addEventListener('keydown', function(e){
  if (e.keyCode == 13){
    self.port.emit('search_word', query_input.value);
  }
});
