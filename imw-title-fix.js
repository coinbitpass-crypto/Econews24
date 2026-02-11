<script>
(function(){

  var SLASH_RE = /[\/／⁄∕]/;

  function splitParts(raw){
    return (raw || '')
      .trim()
      .split(SLASH_RE)
      .map(function(s){ return s.trim(); })
      .filter(Boolean);
  }

  function escapeHtml(str){
    return str.replace(/[&<>"']/g, function(m){
      return ({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;'
      })[m];
    });
  }

  // ✅ 목록: 제목을 "메인"만 남기기
  function applyListTitle(){
    var spans = document.querySelectorAll('.list_text_title .tit a.title_link > span');
    for(var i=0;i<spans.length;i++){
      var sp = spans[i];
      if(sp.dataset.imwMainOnly === '1') continue;

      var raw = (sp.textContent || '').trim();
      if(!raw) continue;

      var parts = splitParts(raw);
      if(parts.length < 2) continue;

      sp.textContent = parts[0];
      sp.dataset.imwMainOnly = '1';
    }
  }

  // ✅ 상세: 3줄 분리
  function splitBoardTitle(){
    if(!document.querySelector('.board_view')) return;

    var tit = document.querySelector('.board_view .header .view_tit');
    if(!tit) return;

    if(tit.classList.contains('imw-split-title')) return;

    var raw = (tit.textContent || '').trim();
    if(!raw) return;

    var parts = splitParts(raw);
    if(parts.length < 2) return;

    var main = parts[0] || '';
    var sub1 = parts[1] || '';
    var sub2 = parts[2] || '';

    tit.innerHTML =
      '<span class="t-main">' + escapeHtml(main) + '</span>' +
      (sub1 ? '<span class="t-sub-top">' + escapeHtml(sub1) + '</span>' : '') +
      (sub2 ? '<span class="t-sub-bottom">' + escapeHtml(sub2) + '</span>' : '');

    tit.classList.add('imw-split-title');
  }

  function run(){
    applyListTitle();
    splitBoardTitle();
  }

  // ✅ 무난하게: 로드 직후 + 살짝 지연 2번 (끝)
  run();
  setTimeout(run, 300);
  setTimeout(run, 800);

})();
</script>
