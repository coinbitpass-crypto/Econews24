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

  // 목록: 메인만
  function applyList(){
    var spans = document.querySelectorAll('.list_text_title .tit a.title_link > span');

    for(var i=0;i<spans.length;i++){
      var sp = spans[i];
      var raw = (sp.textContent || '').trim();
      if(!raw) continue;

      var p = split(raw);
      if(p.length < 2) continue;

      sp.textContent = p[0];
    }
  }

  // 상세: 3줄 분리
  function applyView(){
    var t = document.querySelector('.board_view .header .view_tit');
    if(!t) return;

    // 이미 가공된 상태면 스킵
    if(t.querySelector('.t-main')) return;

    var raw = (t.textContent || '').trim();
    if(!raw) return;

    var p = split(raw);
    if(p.length < 2) return;

    t.innerHTML =
      '<span class="t-main">'+p[0]+'</span>'+
      (p[1]?'<span class="t-sub-top">'+p[1]+'</span>':'')+
      (p[2]?'<span class="t-sub-bottom">'+p[2]+'</span>':'');
  }

  function run(){
    applyList();
    applyView();
  }

  // 늦게 렌더되는 경우 대비: 딱 3번만(가볍게)
  function runSoon(){
    run();
    setTimeout(run, 200);
    setTimeout(run, 800);
  }

  // 최초
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', runSoon);
  } else {
    runSoon();
  }

  // 내부 이동 대응
  window.addEventListener('popstate', function(){ runSoon(); });

  // pushState/replaceState 훅
  ['pushState','replaceState'].forEach(function(fn){
    var orig = history[fn];
    if(!orig) return;
    history[fn] = function(){
      var ret = orig.apply(this, arguments);
      runSoon();
      return ret;
    };
  });

  // 사용자 클릭 후(카테고리/페이지네이션/검색 등) 한 번만 재적용
  document.addEventListener('click', function(){
    setTimeout(run, 50);
    setTimeout(run, 300);
  }, true);

})();
