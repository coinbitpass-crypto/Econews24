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

  function applyList(){
    var spans = document.querySelectorAll('.list_text_title .tit a.title_link > span');

    for(var i=0;i<spans.length;i++){
      var sp = spans[i];

      // 이미 처리했으면 스킵
      if(sp.dataset.imwMainOnly === '1') continue;

      var raw = (sp.textContent || '').trim();
      if(!raw) continue;

      var p = split(raw);
      if(p.length < 2) continue;

      // 원문 저장 + 메인만 표시
      sp.dataset.raw = raw;
      sp.textContent = p[0];
      sp.dataset.imwMainOnly = '1';
    }
  }

  function applyView(){
    var t = document.querySelector('.board_view .header .view_tit');
    if(!t) return;

    // 이미 처리했으면 스킵
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

  // ✅ 디바운스(연속 DOM 변경 한 번으로 묶기)
  var scheduled = false;
  function schedule(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(function(){
      scheduled = false;
      run();
    });
  }

  // 최초 실행
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // DOM 변경 감지(필요할 때만 schedule)
  var mo = new MutationObserver(schedule);
  mo.observe(document.documentElement, { subtree:true, childList:true });

})();
