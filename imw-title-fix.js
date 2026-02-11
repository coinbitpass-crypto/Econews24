<script>
(function(){

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

  function isViewPage(){
    // 상세 페이지에만 있는 클래스
    return !!document.querySelector('.board_view');
  }

  function apply(){

    // 목록이면 무조건 종료
    if(!isViewPage()) return;

    var tit = document.querySelector('.board_view .header .view_tit');
    if(!tit) return;

    if(tit.classList.contains('imw-split-title')) return;

    var raw = (tit.textContent || '').trim();
    if(!raw) return;

    // 모든 슬래시 대응
    var parts = raw.split(/[\/／⁄∕]/)
      .map(s => s.trim())
      .filter(Boolean);

    if(parts.length < 2) return;

    // 메인 / 서브 / 작은서브
    var main = parts[0] || '';
    var sub1 = parts[1] || '';
    var sub2 = parts[2] || '';

    tit.innerHTML =
      '<span class="t-main">' + escapeHtml(main) + '</span>' +
      (sub1 ? '<span class="t-sub-top">' + escapeHtml(sub1) + '</span>' : '') +
      (sub2 ? '<span class="t-sub-bottom">' + escapeHtml(sub2) + '</span>' : '');

    tit.classList.add('imw-split-title');
  }

  // 최초
  apply();

  // AJAX 이동 대비
  var timer = setInterval(apply, 300);
  setTimeout(()=>clearInterval(timer), 10000);

  // DOM 변경 감지
  var mo = new MutationObserver(apply);
  mo.observe(document.body,{
    childList:true,
    subtree:true
  });

})();
</script>
