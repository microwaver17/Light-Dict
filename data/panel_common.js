// 読込み終了を通知する
// notify contents loaded
document.addEventListener('DOMContentLoaded', function(){
  self.port.emit('loaded');
});
