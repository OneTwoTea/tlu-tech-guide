/* ==========================================================================
   TLU TECH GUIDE — data.js
   Nguồn dữ liệu tìm kiếm dùng CHUNG cho toàn bộ website.
   Mỗi trang chỉ cần nạp file này trước script.js là có thể tìm kiếm được
   nội dung của TẤT CẢ các trang (không chỉ trang đang mở).

   Lưu ý: url dùng đường dẫn tuyệt đối theo gốc site (bắt đầu bằng "/")
   để dùng được từ bất kỳ trang nào, dù trang đó nằm trong /pages/.
   Khi chạy thử, hãy mở server tại đúng thư mục gốc tlu-tech-guide.
   ========================================================================== */

window.SEARCH_DATA = [
  /* ---------------- Học tập số: LMS ---------------- */
  { title: "LMS TLU là gì?", category: "LMS", url: "/pages/lms.html#lms-la-gi",
    keywords: "lms tlu hệ thống quản lý học tập trực tuyến",
    description: "Giải thích hệ thống quản lý học tập của Đại học Thủy lợi." },
  { title: "Cách đăng nhập LMS TLU", category: "LMS", url: "/pages/lms.html#dang-nhap",
    keywords: "đăng nhập lms tài khoản sinh viên",
    description: "Các bước đăng nhập vào LMS bằng tài khoản sinh viên." },
  { title: "Cách nộp bài trên LMS", category: "LMS", url: "/pages/lms.html#nop-bai",
    keywords: "nộp bài lms bài tập tải file upload",
    description: "Hướng dẫn từng bước nộp bài tập trên LMS." },
  { title: "Cách kiểm tra trạng thái bài nộp", category: "LMS", url: "/pages/lms.html#trang-thai-bai-nop",
    keywords: "kiểm tra trạng thái bài nộp lms đã nộp chưa",
    description: "Cách xem bài đã nộp thành công hay chưa trên LMS." },
  { title: "Các lỗi thường gặp khi dùng LMS", category: "LMS", url: "/pages/lms.html#loi-thuong-gap",
    keywords: "lỗi lms không đăng nhập được không nộp được bài",
    description: "Tổng hợp lỗi phổ biến và cách xử lý khi dùng LMS." },

  /* ---------------- Học tập số: Word ---------------- */
  { title: "Cách tạo mục lục tự động trong Word", category: "Word", url: "/pages/word.html#muc-luc-tu-dong",
    keywords: "mục lục tự động word table of contents heading",
    description: "Tạo mục lục tự cập nhật cho báo cáo, tiểu luận." },
  { title: "Cách đánh số trang trong Word", category: "Word", url: "/pages/word.html#danh-so-trang",
    keywords: "đánh số trang word page number bắt đầu từ trang nội dung",
    description: "Đánh số trang và bỏ số trang ở trang bìa." },
  { title: "Cách tạo Heading trong Word", category: "Word", url: "/pages/word.html#tao-heading",
    keywords: "heading tiêu đề word styles",
    description: "Dùng Styles để tạo tiêu đề chuẩn, phục vụ mục lục tự động." },
  { title: "Cách tạo bảng trong Word", category: "Word", url: "/pages/word.html#tao-bang",
    keywords: "tạo bảng word insert table",
    description: "Chèn và định dạng bảng trong Word." },
  { title: "Cách xuất Word sang PDF", category: "Word", url: "/pages/word.html#xuat-pdf",
    keywords: "xuất word sang pdf export save as pdf",
    description: "Lưu file Word thành PDF để nộp bài." },

  /* ---------------- Học tập số: Excel ---------------- */
  { title: "Các hàm Excel cơ bản sinh viên nên biết", category: "Excel", url: "/pages/excel.html#ham-co-ban",
    keywords: "excel hàm sum average if vlookup xlookup countif sumif",
    description: "Bảng tổng hợp các hàm Excel thường dùng nhất." },
  { title: "Cách tạo biểu đồ trong Excel", category: "Excel", url: "/pages/excel.html#bieu-do",
    keywords: "biểu đồ excel chart insert chart",
    description: "Các bước chèn biểu đồ từ bảng dữ liệu Excel." },
  { title: "Cách dùng Pivot Table", category: "Excel", url: "/pages/excel.html#pivot-table",
    keywords: "pivot table excel tổng hợp dữ liệu",
    description: "Tổng hợp và phân tích dữ liệu nhanh bằng Pivot Table." },

  /* ---------------- Học tập số: PowerPoint ---------------- */
  { title: "Cách thiết kế slide dễ nhìn", category: "PowerPoint", url: "/pages/powerpoint.html#thiet-ke-slide",
    keywords: "powerpoint thiết kế slide bố cục font màu",
    description: "Nguyên tắc bố cục, font chữ và màu sắc cho slide." },
  { title: "Cách dùng Animation và Transition hợp lý", category: "PowerPoint", url: "/pages/powerpoint.html#animation",
    keywords: "animation transition powerpoint hiệu ứng",
    description: "Dùng hiệu ứng vừa đủ, tránh gây rối khi thuyết trình." },
  { title: "Lỗi thường gặp khi thuyết trình", category: "PowerPoint", url: "/pages/powerpoint.html#loi-thuong-gap",
    keywords: "lỗi thuyết trình powerpoint slide quá nhiều chữ",
    description: "Các lỗi phổ biến khiến slide khó theo dõi." },

  /* ---------------- Công cụ AI ---------------- */
  { title: "AI có thể giúp sinh viên làm gì?", category: "Công cụ AI", url: "/pages/ai.html#ai-giup-gi",
    keywords: "ai chatgpt gemini hỗ trợ học tập",
    description: "Những việc AI có thể hỗ trợ sinh viên trong học tập." },
  { title: "Cách viết prompt tốt", category: "Công cụ AI", url: "/pages/ai.html#viet-prompt",
    keywords: "prompt ai chatgpt viết câu lệnh",
    description: "Nguyên tắc viết prompt rõ ràng, hiệu quả." },
  { title: "AI không nên được sử dụng như thế nào?", category: "Công cụ AI", url: "/pages/ai.html#khong-nen-dung",
    keywords: "ai gian lận học thuật không nên lạm dụng",
    description: "Giới hạn cần lưu ý khi dùng AI trong học tập." },

  /* ---------------- Kỹ năng số ---------------- */
  { title: "Cách tạo mật khẩu mạnh", category: "Kỹ năng số", url: "/pages/digital-skills.html#mat-khau-manh",
    keywords: "mật khẩu mạnh bảo mật tài khoản",
    description: "Nguyên tắc đặt mật khẩu khó đoán, an toàn." },
  { title: "Xác thực hai yếu tố là gì?", category: "Kỹ năng số", url: "/pages/digital-skills.html#xac-thuc-hai-yeu-to",
    keywords: "xác thực hai yếu tố 2fa bảo mật",
    description: "Cách bật xác thực hai yếu tố để bảo vệ tài khoản." },
  { title: "Cách nhận biết email phishing", category: "Kỹ năng số", url: "/pages/digital-skills.html#nhan-biet-phishing",
    keywords: "phishing email giả mạo lừa đảo",
    description: "Dấu hiệu nhận biết email lừa đảo, giả mạo." },
  { title: "Cách sao lưu dữ liệu học tập", category: "Kỹ năng số", url: "/pages/digital-skills.html#sao-luu-du-lieu",
    keywords: "sao lưu dữ liệu backup google drive",
    description: "Cách sao lưu tài liệu học tập an toàn." },

  /* ---------------- Dịch vụ số ---------------- */
  { title: "Các dịch vụ số dành cho sinh viên TLU", category: "Dịch vụ số", url: "/pages/services.html#dich-vu-sinh-vien",
    keywords: "dịch vụ sinh viên thủ tục trực tuyến hệ thống",
    description: "Tổng hợp các hệ thống và thủ tục trực tuyến dành cho sinh viên." },

  /* ---------------- FAQ (trích các câu phổ biến) ---------------- */
  { title: "Quên mật khẩu LMS phải làm gì?", category: "FAQ", url: "/pages/faq.html#faq-quen-mat-khau-lms",
    keywords: "quên mật khẩu lms khôi phục",
    description: "Cách khôi phục mật khẩu khi quên đăng nhập LMS." },
  { title: "Có thể sử dụng LMS trên điện thoại không?", category: "FAQ", url: "/pages/faq.html#faq-lms-tren-dien-thoai",
    keywords: "lms điện thoại di động app",
    description: "LMS có dùng được trên điện thoại hay không." },
  { title: "Có nên dùng AI để làm bài tập không?", category: "FAQ", url: "/pages/faq.html#faq-dung-ai-lam-bai-tap",
    keywords: "ai làm bài tập gian lận học thuật",
    description: "Quan điểm về việc dùng AI để làm bài tập." },
  { title: "LMS không tải được file phải làm gì?", category: "FAQ", url: "/pages/faq.html#faq-lms-khong-tai-file",
    keywords: "lms không tải file upload lỗi dung lượng định dạng",
    description: "Cách xử lý lỗi không tải được file lên LMS." },
  { title: "Làm sao giảm dung lượng file PDF trước khi nộp?", category: "FAQ", url: "/pages/faq.html#faq-giam-dung-luong-pdf",
    keywords: "giảm dung lượng pdf nén file bài tập",
    description: "Cách giảm dung lượng PDF trước khi nộp bài." },
  { title: "Làm sao chia sẻ file Google Drive an toàn?", category: "FAQ", url: "/pages/faq.html#faq-chia-se-drive",
    keywords: "google drive chia sẻ file quyền xem chỉnh sửa",
    description: "Thiết lập quyền chia sẻ Google Drive an toàn." },
  { title: "Quên mật khẩu email sinh viên phải làm gì?", category: "FAQ", url: "/pages/faq.html#faq-quen-email",
    keywords: "email sinh viên quên mật khẩu khôi phục",
    description: "Các bước xử lý khi quên mật khẩu email sinh viên." },
  { title: "Wi-Fi ký túc xá hoặc trường không vào được phải làm gì?", category: "FAQ", url: "/pages/faq.html#faq-wifi",
    keywords: "wifi trường ký túc xá không kết nối mạng",
    description: "Cách kiểm tra và xử lý lỗi kết nối Wi-Fi." },
  { title: "Làm sao chuyển ảnh chụp bài làm thành PDF?", category: "FAQ", url: "/pages/faq.html#faq-anh-thanh-pdf",
    keywords: "ảnh chụp bài làm chuyển thành pdf scan",
    description: "Cách quét ảnh bài làm và xuất thành PDF." },
  { title: "Có nên dùng USB để lưu bài duy nhất không?", category: "FAQ", url: "/pages/faq.html#faq-usb",
    keywords: "usb lưu bài sao lưu dữ liệu backup",
    description: "Vì sao không nên chỉ lưu tài liệu trên một USB." },
  { title: "Có nên đưa dữ liệu cá nhân vào công cụ AI không?", category: "FAQ", url: "/pages/faq.html#faq-du-lieu-ai",
    keywords: "ai dữ liệu cá nhân bảo mật thông tin riêng tư",
    description: "Những dữ liệu không nên đưa vào công cụ AI." },
  { title: "Làm sao nhận biết ứng dụng hoặc phần mềm giả mạo?", category: "FAQ", url: "/pages/faq.html#faq-phan-mem-gia-mao",
    keywords: "phần mềm giả mạo ứng dụng độc hại tải app an toàn",
    description: "Dấu hiệu nhận biết ứng dụng hoặc phần mềm không đáng tin." },
  { title: "Vì sao cần cập nhật phần mềm và trình duyệt?", category: "FAQ", url: "/pages/faq.html#faq-cap-nhat-phan-mem",
    keywords: "cập nhật phần mềm trình duyệt bảo mật lỗ hổng",
    description: "Lợi ích của việc cập nhật phần mềm và trình duyệt." }
];