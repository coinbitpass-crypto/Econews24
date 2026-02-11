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

  // ✅ 목록: a.title_link 직접 처리
  function applyList(){
    var links = document.querySelectorAll('.list_text_title .tit a.title_link');

    for(var i=0;i<links.length;i++){
      var a = links[i];

      // 이미 처리했으면 스킵
      if(a.dataset.imwMainOnly === '1') continue;

      var raw = (a.textContent || '').trim();
      if(!raw) continue;

      var p = split(raw);
      if(p.length < 2) continue;

      a.textContent = p[0];
      a.dataset.imwMainOnly = '1';
    }
  }

  // ✅ 상세: 3줄 분리
  function applyView(){
    var t = document.querySelector('.board_view .header .view_tit');
    if(!t) return;

    if(t.classList.contains('imw-split-title')) return;

    var raw = (t.textContent || '').trim();
    if(!raw) return;

    var p = split(raw);
    if(p.length < 2) return;

    t.innerHTML =
      '<span class="t-main">'+p[0]+'</span>'+
      (p[1]?'<span class="t-sub-top">'+p[1]+'</span>':'')+
      (p[2]?'<span class="t-sub-bottom">'+p[2]+'</span>':'');

    t.classList.add('imw-split-title');
  }

  function run(){
    applyList();
    applyView();
  }

  // ✅ 최소 실행 (UI 영향 없음)
  run();
  setTimeout(run, 300);
  setTimeout(run, 800);

})();
