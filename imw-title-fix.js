(function(){

  var SLASH_RE = /[\/／⁄∕]/;

  function split(raw){
    return (raw||'')
      .replace(/\s+/g,' ')
      .trim()
      .split(SLASH_RE)
      .map(function(s){ return s.trim(); })
      .filter(Boolean);
  }

  function list(){
    document
      .querySelectorAll('.list_text_title .tit a.title_link > span')
      .forEach(function(sp){

        if(!sp.dataset.raw){
          sp.dataset.raw = sp.textContent.trim();
        }

        var p = split(sp.dataset.raw);
        if(p.length>1) sp.textContent = p[0];
      });
  }

  function view(){
    var t = document.querySelector('.board_view .header .view_tit');
    if(!t) return;

    if(!t.dataset.raw){
      t.dataset.raw = t.textContent.trim();
    }

    var p = split(t.dataset.raw);
    if(p.length<2) return;

    t.innerHTML =
      '<span class="t-main">'+p[0]+'</span>'+
      (p[1]?'<span class="t-sub-top">'+p[1]+'</span>':'')+
      (p[2]?'<span class="t-sub-bottom">'+p[2]+'</span>':'');
  }

  function run(){
    list();
    view();
  }

  var mo = new MutationObserver(run);
  mo.observe(document.documentElement,{subtree:true,childList:true});

  setInterval(run,500);

  document.addEventListener('DOMContentLoaded',run);
})();
