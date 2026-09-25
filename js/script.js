/* ==========================================================================
   TLU TECH GUIDE — script.js
   JavaScript thuần, không dùng thư viện ngoài.
   Xử lý 4 việc chính:
   1. Header sticky đổi bóng khi cuộn trang
   2. Menu hamburger cho mobile
   3. Tìm kiếm nội dung (không phân biệt hoa/thường, có hỗ trợ không dấu)
   4. FAQ accordion: chỉ mở 1 câu hỏi tại một thời điểm
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. HEADER: thêm bóng khi cuộn trang xuống
     ------------------------------------------------------------------ */
  var header = document.getElementById('siteHeader');

  function updateHeaderShadow() {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });


  /* ------------------------------------------------------------------
     2. MENU HAMBURGER (MOBILE)
     ------------------------------------------------------------------ */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mainNav = document.getElementById('mainNav');

  function closeMenu() {
    mainNav.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  hamburgerBtn.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Đóng menu khi bấm vào 1 liên kết trong menu (trên mobile)
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Đóng menu khi resize sang màn hình lớn
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) closeMenu();
  });


  /* ------------------------------------------------------------------
     3. TÌM KIẾM NỘI DUNG
     Nguồn dữ liệu tìm kiếm: các .guide-card và .faq-item đã có sẵn
     trong HTML (data-title, data-keywords, data-url, data-category).
     ------------------------------------------------------------------ */
  var searchToggle = document.getElementById('searchToggle');
  var heroSearch = document.getElementById('heroSearch');

  // Bỏ dấu tiếng Việt để hỗ trợ tìm kiếm không dấu (VD: "muc luc" vẫn ra "mục lục")
  function removeDiacritics(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  // Nguồn dữ liệu tìm kiếm: gộp dữ liệu chung (js/data.js) với các card
  // .guide-card có sẵn ngay trên trang đang mở (nếu có), tránh trùng URL.
  function collectSearchData() {
    var items = (window.SEARCH_DATA || []).slice();
    var knownUrls = items.map(function (i) { return i.url; });

    document.querySelectorAll('.guide-card').forEach(function (card) {
      if (knownUrls.indexOf(card.dataset.url) === -1) {
        items.push({
          title: card.dataset.title,
          category: card.dataset.category,
          keywords: card.dataset.keywords || '',
          url: card.dataset.url
        });
      }
    });
    return items;
  }

  function findMatches(rawKeyword) {
    var keyword = removeDiacritics(rawKeyword.trim());
    if (keyword === '') return null;

    var data = collectSearchData();
    return data.filter(function (item) {
      var haystack = removeDiacritics(item.title + ' ' + item.keywords + ' ' + item.category);
      return haystack.indexOf(keyword) !== -1;
    });
  }

  function renderResultsInto(container, matches) {
    if (matches === null) {
      container.hidden = true;
      container.innerHTML = '';
      return;
    }
    container.hidden = false;

    if (matches.length === 0) {
      container.innerHTML =
        '<p class="search-empty">Không tìm thấy nội dung phù hợp. Hãy thử từ khóa khác.</p>';
      return;
    }

    var listHtml = matches.slice(0, 8).map(function (item) {
      return (
        '<li><a href="' + item.url + '">' +
        '<span>' + item.category + '</span>' +
        item.title +
        '</a></li>'
      );
    }).join('');

    container.innerHTML = '<ul>' + listHtml + '</ul>';
  }

  // ---- 3a. Ô tìm kiếm lớn trên trang chủ (#heroSearch) ----
  if (heroSearch) {
    var searchForm = document.getElementById('searchForm');
    var searchInput = document.getElementById('searchInput');
    var searchResults = document.getElementById('searchResults');
    var debounceTimer;

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      renderResultsInto(searchResults, findMatches(searchInput.value));
    });

    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        renderResultsInto(searchResults, findMatches(searchInput.value));
      }, 200);
    });
  }

  // ---- 3b. Panel tìm kiếm nhỏ trên header (dùng ở các trang không có #heroSearch) ----
  var searchPanel = document.getElementById('searchPanel');

  if (searchToggle && heroSearch) {
    // Trang chủ: icon kính lúp cuộn tới ô tìm kiếm lớn
    searchToggle.addEventListener('click', function () {
      heroSearch.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('searchInput').focus();
    });
  } else if (searchToggle && searchPanel) {
    // Các trang nội dung: icon kính lúp mở panel tìm kiếm nhỏ
    var panelInput = document.getElementById('panelSearchInput');
    var panelResults = document.getElementById('panelSearchResults');
    var panelDebounce;

    searchToggle.addEventListener('click', function () {
      var isOpen = searchPanel.hasAttribute('hidden') === false;
      if (isOpen) {
        searchPanel.setAttribute('hidden', '');
        searchToggle.setAttribute('aria-expanded', 'false');
      } else {
        searchPanel.removeAttribute('hidden');
        searchToggle.setAttribute('aria-expanded', 'true');
        panelInput.focus();
      }
    });

    panelInput.addEventListener('input', function () {
      clearTimeout(panelDebounce);
      panelDebounce = setTimeout(function () {
        renderResultsInto(panelResults, findMatches(panelInput.value));
      }, 200);
    });

    // Đóng panel khi bấm ra ngoài
    document.addEventListener('click', function (e) {
      if (!searchPanel.contains(e.target) && e.target !== searchToggle && !searchToggle.contains(e.target)) {
        searchPanel.setAttribute('hidden', '');
        searchToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ------------------------------------------------------------------
     4. FAQ ACCORDION: mỗi lần chỉ mở 1 câu hỏi
     ------------------------------------------------------------------ */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

});