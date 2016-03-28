// a trick
document.cookie = 'weblio_smlwin_btn = ;';

// 不要な要素を消す
// 消えるまでワンテンポ送れるのでCSSでも消す
// delete unnecessary DOM elements
// CSS is also used to hide them since DOM removing takes some times
window.addEventListener('DOMContentLoaded', function(e){
  deleteById('header');
  //deleteByClass('ad');
});

function deleteById(id){
  var elem = document.getElementById(id);
  elem.parentNode.removeChild(elem);
  console.log('delete ' + id);
}
function deleteByClass(cls){
  var elems = document.getElementsByClassName(cls);
  if (elems != null)
  {
    for(var i = 0; i < elems.length; i++)
    {
      elems[i].parentNode.removeChild(elems[i]);
    }
  }
  console.log('delete ' + cls);
}
