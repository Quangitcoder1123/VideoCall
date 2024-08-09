let numberOfDisplayedPeers = 0;
// quản lý cách video được hiển thị trên giao diện dựa trên điều kiện nhất định
function enforceLayout(numberOfDisplayedPeers) {
    // Kiểm tra xem nội dung đã tồn tại hay chưa
    if (!contentExists) {
        // Nếu không có nội dung, gọi hàm gridLayout với số lượng người dùng hiển thị
        gridLayout(numberOfDisplayedPeers);
    } else {
        // Nếu có nội dung
        if (isHandheld()) {
            // Nếu đang sử dụng thiết bị di động
            contentShown = true;
            
            // Thiết lập lớp và hiển thị video dưới dạng một ô đơn
            document.getElementById('videos').setAttribute('class', '');
            document.getElementById('videos').classList.add('single_cell');
            document.getElementsByClassName('contentContainer')[0].classList.remove('hidden');
            
            // Ẩn các video box không phải là contentContainer
            document.querySelectorAll('.video-box').forEach(elem => {
                if (!elem.classList.contains('contentContainer')) {
                    elem.classList.add('hidden');
                }
            });
            
            // Thiết lập biến và sự kiện lắng nghe vuốt trên màn hình di động
            let swipeDone = false;
            let lastY = 120;
            let lastX = 120;
            let currentX = 120;
            var currentY = 120;

            var touchInitiation = (e) => {
                lastX = e.touches[0].clientX;
                lastY = e.touches[0].clientY;
            }

            var detectSwipe = (e) => {
                currentY = e.touches[0].clientY;
                currentX = e.touches[0].clientX;
                swipeDone = true;
            }

            // Gỡ bỏ sự kiện touchend và thêm lại sự kiện mới
            document.removeEventListener('touchend', swipeEventFunction);
            swipeEventFunction = function () {
                if (swipeDone && Math.abs(lastX - currentX) > 50 && Math.abs(lastY - currentY) < 50) {
                    swipeDone = false;
                    swipeContent();
                }
                console.log('currentY ' + currentY + 'Last Y ' + lastY);
                console.log('currentX ' + currentX + 'Last X ' + lastX);
            }

            document.addEventListener('touchstart', (e) => touchInitiation(e), false);
            document.addEventListener('touchmove', (e) => detectSwipe(e), false);
            document.addEventListener('touchend', swipeEventFunction, false);
        } else {
            // Nếu không phải là thiết bị di động, thiết lập giao diện với 16 ô đơn
            document.getElementById('videos').setAttribute('class', '');
            document.getElementById('videos').classList.add('sixteen_cell');
            document.getElementById('localVideoContainer').classList.remove('sideLocalVideo');
        }
    }
}
//thiết lập giao diện hiển thị video dựa trên số lượng người dùng được hiển thị
function gridLayout(numberOfDisplayedPeers) {
    // Hiển thị tất cả các video box ngoại trừ contentContainer
    document.querySelectorAll('.video-box').forEach(elem => {
        if (!elem.classList.contains('contentContainer')) {
            elem.classList.remove('hidden');
        }
    });

    // Dựa vào số lượng người dùng được hiển thị, thiết lập giao diện phù hợp
    if (numberOfDisplayedPeers == 1) {
        // Hiển thị một ô video lớn
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('single_cell');
        document.getElementById('localVideoContainer').classList.add('sideLocalVideo');
    } else if (numberOfDisplayedPeers == 2) {
        // Hiển thị hai ô video
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('two_cell');
        document.getElementById('localVideoContainer').classList.add('sideLocalVideo');
    } else if (numberOfDisplayedPeers > 2 && numberOfDisplayedPeers <= 4) {
        // Hiển thị bốn ô video
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('four_cell');
        document.getElementById('localVideoContainer').classList.add('sideLocalVideo');
    } else if (numberOfDisplayedPeers > 4 && numberOfDisplayedPeers <= 9) {
        // Hiển thị chín ô video
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('nine_cell');
        document.getElementById('localVideoContainer').classList.add('sideLocalVideo');
    } else if (numberOfDisplayedPeers > 9) {
        // Hiển thị mười sáu ô video
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('sixteen_cell');
        document.getElementById('localVideoContainer').classList.add('sideLocalVideo');
    } else {
        // Hiển thị một ô video lớn và loại bỏ lớp sideLocalVideo
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('single_cell');
        document.getElementById('localVideoContainer').classList.remove('sideLocalVideo');
    }
}
//nhiệm vụ thực hiện hành động khi người dùng vuốt trên màn hình
function swipeContent() {
    // Kiểm tra nếu nội dung đã được hiển thị
    if (contentShown) {
        // Nếu nội dung đã được hiển thị, ẩn nó và thực hiện lại gridLayout với số lượng người dùng giảm đi 1
        contentShown = false;
        document.getElementsByClassName('contentContainer')[0].classList.add('hidden');
        gridLayout(numberOfDisplayedPeers - 1);
    } else {
        // Nếu nội dung chưa được hiển thị
        contentShown = true;
        
        // Hiển thị một ô video lớn và ẩn các video box khác
        document.getElementById('videos').setAttribute('class', '');
        document.getElementById('videos').classList.add('single_cell');
        document.getElementsByClassName('contentContainer')[0].classList.remove('hidden');
        
        // Ẩn các video box không phải là contentContainer
        document.querySelectorAll('.video-box').forEach(elem => {
            if (!elem.classList.contains('contentContainer')) {
                elem.classList.add('hidden');
            }
        });
    }
}
// nhiệm vụ tạo một ô video mới cho một đối tác cụ thể và thêm nó vào giao diện
function createPeerVideo(peerId, isPeerContent, namePeer) {
    // Clone video box của peer từ video box đầu tiên trong danh sách
    const peerNode = document.getElementsByClassName('video-box')[0].cloneNode();

    // Thêm local video của peer vào video box mới tạo
    peerNode.appendChild(document.getElementById('localVideo').cloneNode());

    // Thiết lập ID cho video container và local video của peer
    peerNode.id = 'video' + peerId + 'Container';
    peerNode.firstElementChild.id = 'video' + peerId;

    // Tạo và thiết lập title cho tên của peer
    const nameTitle = document.getElementById('namepeer').cloneNode();
    nameTitle.className = 'nametitle';
    nameTitle.id = 'namepeer' + peerId;
    nameTitle.textContent = namePeer;
    peerNode.appendChild(nameTitle);

    // Loại bỏ các lớp không cần thiết từ video box mới tạo
    peerNode.classList.remove('sideLocalVideo');
    peerNode.classList.remove('relaxedHidden');

    // Kiểm tra điều kiện (true là điều kiện tạm thời)
    if (true) {
        let inFullscreen = false;

        // Nếu đây là peer chứa nội dung
        if (isPeerContent) {
            contentShown = true;
            contentExists = true;
            peerNode.classList.add('contentContainer');
        }

        // Thêm sự kiện click để xử lý chế độ fullscreen
        peerNode.addEventListener('click', () => {
            if (inFullscreen) {
                // Nếu đã ở chế độ fullscreen, thoát fullscreen
                inFullscreen = false;
                screen.orientation.unlock();
                closeFullscreen();
            } else {
                // Nếu không ở chế độ fullscreen, vào chế độ fullscreen
                inFullscreen = true;
                screen.orientation.lock('landscape').then(console.log('Locked landscape'));
                openFullscreen(peerNode);
            }
        });
    }

    // Thêm video box mới tạo vào danh sách video
    document.getElementById('videos').appendChild(peerNode);

    // Thiết lập nguồn cho local video của peer
    document.getElementById('video' + peerId).srcObject = new MediaStream();

    // Cập nhật giao diện dựa trên số lượng người dùng hiển thị
    enforceLayout(++numberOfDisplayedPeers);
}
// thiết lập thông tin về phòng 
function infRoom(id) {
    // Thiết lập nội dung của thẻ có ID 'room-id-box' bằng giá trị của id được chuyển vào
    document.getElementById('room-id-box').textContent = id;

    // Tạo và thiết lập nội dung cho thẻ có ID 'room-link-box'
    document.getElementById('room-link-box').textContent = window.location.href.split('?')[0] + '?roomId=' + id;
}
//thêm một thành viên mới vào danh sách thành viên
function Addmember(name) {
    // Tạo một thẻ img và thiết lập nguồn hình ảnh
    img = document.createElement("img");
    img.src = "./img/avt.jpg";

    // Tạo một thẻ span và thiết lập nội dung với giá trị của biến 'name'
    sp = document.createElement("span");
    sp.textContent = name;

    // Clone một member-item từ danh sách và thiết lập ID cho member-item mới
    const mb = document.getElementsByClassName('member-item')[0].cloneNode();
    mb.id = "mn" + name;

    // Thêm thẻ img và thẻ span vào member-item mới tạo
    mb.appendChild(img);
    mb.appendChild(sp);

    // Thêm member-item mới vào danh sách thành viên
    document.getElementById('member-list').appendChild(mb);
}
// thực hiện việc loại bỏ một thành viên khỏi danh sách thành
function Removemember(name) {
    // Lấy phần tử có ID được xây dựng dựa trên tên và loại bỏ nó khỏi DOM
    document.getElementById("mn" + name).remove();
}

function openFullscreen(video) {
    // Kiểm tra xem trình duyệt hỗ trợ phương thức nào để mở chế độ toàn màn hình
    if (video.requestFullscreen) {
        // Chế độ toàn màn hình cho các trình duyệt chuẩn
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        // Chế độ toàn màn hình cho trình duyệt Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        // Chế độ toàn màn hình cho trình duyệt Chrome, Safari và Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        // Chế độ toàn màn hình cho trình duyệt IE/Edge
        video.msRequestFullscreen();
    }
}
function closeFullscreen() {
    // Kiểm tra xem trình duyệt hỗ trợ phương thức nào để thoát khỏi chế độ toàn màn hình
    if (document.exitFullscreen) {
        // Thoát khỏi chế độ toàn màn hình cho các trình duyệt chuẩn
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        // Thoát khỏi chế độ toàn màn hình cho trình duyệt Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        // Thoát khỏi chế độ toàn màn hình cho trình duyệt Chrome, Safari và Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        // Thoát khỏi chế độ toàn màn hình cho trình duyệt IE/Edge
        document.msExitFullscreen();
    }
}
function hideLocalVideo() {
    // Kiểm tra xem có người dùng nào đang hiển thị không
    if (numberOfDisplayedPeers > 0) {
        // Lấy phần tử local video container
        localVideoElem = document.getElementById('localVideoContainer');

        // Thêm lớp 'relaxedHidden' để ẩn local video
        localVideoElem.classList.add('relaxedHidden');

        // Loại bỏ lớp 'hidden' từ nút hiển thị local video
        document.getElementById('localVideoShowButton').classList.remove('hidden');
    }
}

function showLocalVideo() {
    // Lấy phần tử local video container
    localVideoElem = document.getElementById('localVideoContainer');

    // Loại bỏ lớp 'relaxedHidden' để hiển thị local video
    localVideoElem.classList.remove('relaxedHidden');

    // Thêm lớp 'hidden' vào nút hiển thị local video để ẩn nó đi
    document.getElementById('localVideoShowButton').classList.add('hidden');
}
// để ẩn hoặc hiển thị một phần tử trên trang web
function Member() {
    // Lấy phần tử có ID 'id-member'
    let m = document.getElementById('id-member');

    // Kiểm tra xem nếu phần tử đang hiển thị, thì ẩn nó, ngược lại, hiển thị nó
    if (m.style.display == 'block') {
        m.style.display = 'none';  // Ẩn phần tử
    } else {
        m.style.display = 'block'; // Hiển thị phần tử
    }
}

