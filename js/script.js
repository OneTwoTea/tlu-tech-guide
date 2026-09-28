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

  // GitHub Pages serves the site from /tlu-tech-guide/, while local previews use the root.
  var siteBasePath = window.location.pathname.indexOf('/tlu-tech-guide/') === 0 ? '/tlu-tech-guide' : '';

  function resolveInternalUrl(url) {
    return url.indexOf('/') === 0 ? siteBasePath + url : url;
  }

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
      var itemUrl = resolveInternalUrl(item.url);
      return (
        '<li><a href="' + itemUrl + '">' +
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
     4. GIỎ HÀNG TÀI LIỆU
     Lưu tạm trong localStorage để giỏ hàng không mất khi chuyển trang.
     ------------------------------------------------------------------ */
  var cartToggle = document.getElementById('cartToggle');
  var cartDrawer = document.getElementById('cartDrawer');
  var cartBackdrop = document.getElementById('cartBackdrop');

  if (cartToggle && cartDrawer) {
    var cartItems = document.getElementById('cartItems');
    var cartEmpty = document.getElementById('cartEmpty');
    var cartFooter = document.getElementById('cartFooter');
    var cartCount = document.getElementById('cartCount');
    var cartTotal = document.getElementById('cartTotal');
    var storedCart;

    try {
      storedCart = JSON.parse(localStorage.getItem('tlu-study-cart') || '[]');
    } catch (error) {
      storedCart = [];
    }
    var cart = Array.isArray(storedCart) ? storedCart : [];

    function formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    }

    function saveCart() {
      localStorage.setItem('tlu-study-cart', JSON.stringify(cart));
    }

    function renderCart() {
      var totalItems = cart.reduce(function (sum, item) { return sum + item.quantity; }, 0);
      var totalPrice = cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
      cartCount.textContent = totalItems;
      cartEmpty.hidden = cart.length !== 0;
      cartFooter.hidden = cart.length === 0;
      cartItems.innerHTML = cart.map(function (item) {
        return '<div class="cart-line" data-cart-id="' + item.id + '">' +
          '<div><h3>' + item.name + '</h3><span class="cart-line-price">' + formatPrice(item.price) + '</span>' +
          '<div class="cart-line-controls"><button class="qty-btn" data-cart-action="decrease" aria-label="Giảm số lượng">−</button><span>' + item.quantity + '</span><button class="qty-btn" data-cart-action="increase" aria-label="Tăng số lượng">＋</button><button class="remove-item" data-cart-action="remove">Xóa</button></div></div>' +
          '<strong>' + formatPrice(item.price * item.quantity) + '</strong></div>';
      }).join('');
      cartTotal.textContent = formatPrice(totalPrice);
      saveCart();
    }

    function setCartOpen(isOpen) {
      cartDrawer.classList.toggle('is-open', isOpen);
      cartDrawer.setAttribute('aria-hidden', String(!isOpen));
      cartToggle.setAttribute('aria-expanded', String(isOpen));
      cartBackdrop.hidden = !isOpen;
      document.body.classList.toggle('cart-is-open', isOpen);
    }

    function addToCart(card) {
      var id = card.dataset.productId;
      var existing = cart.find(function (item) { return item.id === id; });
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id: id, name: card.dataset.productName, price: Number(card.dataset.productPrice), quantity: 1 });
      }
      renderCart();
      setCartOpen(true);
    }

    document.querySelectorAll('.add-to-cart').forEach(function (button) {
      button.addEventListener('click', function () {
        addToCart(button.closest('.product-card'));
        button.classList.add('is-added');
        button.textContent = 'Đã thêm';
        setTimeout(function () { button.classList.remove('is-added'); button.textContent = 'Thêm vào giỏ'; }, 1200);
      });
    });

    cartItems.addEventListener('click', function (event) {
      var actionButton = event.target.closest('[data-cart-action]');
      if (!actionButton) return;
      var line = actionButton.closest('[data-cart-id]');
      var item = cart.find(function (cartItem) { return cartItem.id === line.dataset.cartId; });
      if (!item) return;
      if (actionButton.dataset.cartAction === 'increase') item.quantity += 1;
      if (actionButton.dataset.cartAction === 'decrease') item.quantity -= 1;
      if (actionButton.dataset.cartAction === 'remove' || item.quantity < 1) cart = cart.filter(function (cartItem) { return cartItem.id !== item.id; });
      renderCart();
    });

    cartToggle.addEventListener('click', function () { setCartOpen(!cartDrawer.classList.contains('is-open')); });
    document.getElementById('cartClose').addEventListener('click', function () { setCartOpen(false); });
    cartBackdrop.addEventListener('click', function () { setCartOpen(false); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') setCartOpen(false); });
    document.getElementById('checkoutBtn').addEventListener('click', function () {
      var name = window.prompt('Nhập tên của bạn để nhận link tài liệu:');
      if (!name) return;
      var email = window.prompt('Nhập email nhận tài liệu:');
      if (!email) return;
      window.alert('Cảm ơn ' + name + '! Đơn hàng đã được ghi nhận. Link tải sẽ được gửi tới ' + email + ' sau khi thanh toán.');
    });
    renderCart();
  }


  /* ------------------------------------------------------------------
     5. FAQ ACCORDION: mỗi lần chỉ mở 1 câu hỏi
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