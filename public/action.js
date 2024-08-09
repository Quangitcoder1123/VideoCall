function copyToClipboard() {
  // Lấy văn bản cần sao chép
  let text = document.getElementById("room-link-box").textContent;

  // Sao chép văn bản vào bộ nhớ tạm
  navigator.clipboard.writeText(text);

  // Hiển thị thông báo thành công
  alert("Đã sao chép thành công!");
}