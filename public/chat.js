let listmes= null;
let left=null;
let right=null;
let ms=null;
let sendButton=null;
let inp=null;
let pid=1;

function messinit(roomRef) {
    // Lấy tham chiếu đến các phần tử trong chat thông qua ID của chúng
    listmes = document.getElementById('chatlist');
    sendButton = document.getElementById('btnsend');
    inp = document.getElementById('inputchat');

	    // Đăng ký người nghe cho chat
		registerchat(roomRef);

		// Thêm người nghe sự kiện để gửi tin nhắn
		sendButton.addEventListener('click', event => {
			const message = inp.value.trim();
			inp.value = "";
			if (message.length > 0) {
				console.log("Gửi: " + message);
				// Gửi tin nhắn chat đến Firestore
				sendChat(roomRef, message);
				// Hiển thị tin nhắn gửi đi ở phía bên phải của giao diện chat
				addrightmessage(myname, message);
			}
		});
	}
	

function sendChat(roomRef, message) {
    // Sử dụng phương thức "add" để thêm một bản ghi mới vào collection "ChatRoom"
    roomRef.collection("ChatRoom").add({
        'message': message,  // Nội dung của tin nhắn
        'name': myname       // Tên của người gửi tin nhắn
    });	
}
// thay đổi trong collection "ChatRoom" và thực hiện xử lý khi có tin nhắn mới được thêm vào, nhất là hiển thị tin nhắn trên giao diện nếu không phải là tin nhắn của người gửi
async function registerchat(roomRef) {
    // Sử dụng phương thức "onSnapshot" để đăng ký lắng nghe sự kiện thay đổi trên collection "ChatRoom"
    roomRef.collection("ChatRoom").onSnapshot(snapshot => {
        // Sử dụng phương thức "docChanges" để lấy danh sách các thay đổi trong dữ liệu
        snapshot.docChanges().forEach(change => {
            let name = change.doc.data().name;
            let ms = change.doc.data().message;
            if (change.type == 'added') {
                // Xử lý khi có tin nhắn mới được thêm vào (change.type == 'added')
                if (name != myname) {
                    console.log(`received: ${ms}`);
                    addleftmessage(name, ms); // Thêm tin nhắn mới vào giao diện nếu không phải là tin nhắn của người gửi
                }
            }
            // (change.type == 'removed') không có xử lý trong đoạn mã
        });
    }); 
}

//chức năng thêm một tin nhắn hiển thị bên trái vào giao diện chat
function addleftmessage(name, message) {
    // Tạo một bản sao của phần tử HTML có class 'chat-item-left'
    left = document.getElementsByClassName('chat-item-left')[0].cloneNode();
    // Tạo một bản sao của phần tử HTML có class 'item-ms'
    ms = document.getElementsByClassName('item-ms')[0].cloneNode();
    // Tạo một màu sắc dựa trên tên người gửi bằng hàm stringToColour
    color = stringToColour(name);
    // Thiết lập màu sắc cho đường viền của phần tử 'ms'
    ms.style.borderColor = color;
    
    // Tạo một phần tử <p> chứa tên người gửi
    const nm = document.createElement("p");
    nm.textContent = name;

    // Thiết lập id cho phần tử 'left' bằng cách kết hợp tên người gửi và id của 'ms'
    left.id = name + '-' + ms;
    
    // Thiết lập nội dung tin nhắn trong phần tử 'ms'
    ms.textContent = message;

    // Thêm phần tử 'nm' và 'ms' vào phần tử 'left'
    left.appendChild(nm);
    left.appendChild(ms);

    // Thêm phần tử 'left' vào danh sách tin nhắn (listmes)
    listmes.appendChild(left);
}

//nhiệm vụ thêm một tin nhắn mới từ người gửi (chính bản thân người dùng) vào giao diện trong phần chat
function addrightmessage(name, message) {
    // Tạo một bản sao của phần tử HTML có class 'chat-item-right'
    right = document.getElementsByClassName('chat-item-right')[0].cloneNode();
    // Tạo một bản sao của phần tử HTML có class 'item-ms'
    ms = document.getElementsByClassName('item-ms')[0].cloneNode();
    
    // Thiết lập id cho phần tử 'right', đặt tên 'me-' để phân biệt là tin nhắn của chính người gửi
    right.id = "me-" + ms;
    
    // Thiết lập nội dung tin nhắn trong phần tử 'ms'
    ms.textContent = message;

    // Thêm phần tử 'ms' vào phần tử 'right'
    right.appendChild(ms);

    // Thêm phần tử 'right' vào danh sách tin nhắn (listmes)
    listmes.appendChild(right);
}
// nhiệm vụ thay đổi trạng thái hiển thị của hộp thoại chat giữa hai giá trị "block" và "none"
function boxchat() {
    // Lấy tham chiếu đến phần tử có id là "chatbox"
    let box = document.getElementById("chatbox");
    
    // Kiểm tra trạng thái hiển thị của phần tử
    if (box.style.display == "block") {
        // Nếu đang hiển thị, thay đổi thành ẩn đi
        box.style.display = "none";
    } else {
        // Nếu đang ẩn, thay đổi thành hiển thị
        box.style.display = "block";
    }
}
//nhận một chuỗi str là tên người dùng và trả về một mã màu dựa trên chuỗi đó
function stringToColour(str) {
    // Khởi tạo giá trị hash ban đầu là 0
    let hash = 0;

    // Lặp qua từng ký tự trong chuỗi
    str.split('').forEach(char => {
        // Cập nhật giá trị hash dựa trên mã Unicode của ký tự và giá trị hash hiện tại
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });

    // Khởi tạo một chuỗi màu với dấu # đầu tiên
    let colour = '#';

    // Lặp qua 3 byte của giá trị hash để tạo ra mã màu
    for (let i = 0; i < 3; i++) {
        // Lấy giá trị byte tương ứng từ giá trị hash
        const value = (hash >> (i * 8)) & 0xff;

        // Chuyển giá trị byte thành chuỗi thập lục phân và thêm vào chuỗi màu
        colour += value.toString(16).padStart(2, '0');
    }

    // Trả về mã màu cuối cùng
    return colour;
}
function openboxchat() {
    // Lấy thẻ HTML của hộp thoại chat
    let box = document.getElementById("chatbox");

    // Nếu hộp thoại chat đang ẩn (style.display là "none")
    if (box.style.display === "none") {
        // Hiển thị hộp thoại chat bằng cách đặt style.display thành "block"
        box.style.display = "block";
    }
}

function closeboxchat() {
    // Lấy thẻ HTML của hộp thoại chat
    let box = document.getElementById("chatbox");

    // Đặt style.display thành "none" để ẩn hộp thoại chat
    box.style.display = "none";
}

