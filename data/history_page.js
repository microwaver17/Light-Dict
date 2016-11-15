// 検索履歴の問い合わせ
self.port.emit('askHistory');
self.port.on('sendHistory', function(data){

  var history_table = document.getElementById('history_table');
  var frequency_table = document.getElementById('frequency_table');

  // 時間順に並べ替える
  var length = data.length;
  for(var i = length - 1; i >=0; i--){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.textContent = '' + (length - i);
    tr.appendChild(td);

    td = document.createElement('td');
    td.textContent = data[i];
    tr.appendChild(td);
    history_table.appendChild(tr);
  }

  // 検索回数を求める
  frequency = {};
  for (i in data){
    if (!(data[i] in frequency)){
      frequency[data[i]] = 1;
    }else{
      frequency[data[i]] ++;
    }
  }

  // 検索回数でソートする
  var sorted = [];
  for (var w in frequency){
    sorted.push({word: w, count: frequency[w]});
  }
  sorted.sort(function (a, b){
    return b.count - a.count;
  });

  // HTMLに挿入
  for (i = 0; i < sorted.length; i++){
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.textContent = '' + sorted[i].count;
    tr.appendChild(td);
    
    td = document.createElement('td');
    td.textContent = sorted[i].word;;
    tr.appendChild(td);
    frequency_table.appendChild(tr);
  }
});

// 新しいタブで履歴ページを開く
document.getElementById('open_new_page').addEventListener("click", function(){
  self.port.emit('open_new_page');
});

// リロード
self.port.on('reload', function(){
  location.reload();
});
