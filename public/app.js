// Tạo một đối tượng menu sử dụng thư viện MDC (Material Design Components) và chọn phần tử có class 'mdc-menu'
const menu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));

// Khai báo một biến db và gán giá trị ban đầu là null
let db = null;

// Đối tượng configuration chứa các cấu hình cho WebRTC
const configuration = {
    iceServers: [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
            ],
        },
    ],
    iceCandidatePoolSize: 10, // Số lượng ICE candidates tối đa được duy trì
};

// iceServers: Mảng chứa máy chủ STUN/TURN để sử dụng trong quá trình thiết lập kết nối
// Ở đây, có hai máy chủ STUN của Google
// iceCandidatePoolSize: Số lượng ICE candidates tối đa được duy trì để sử dụng trong quá trình kết nối
// ICE candidates là các địa chỉ IP và cổng sẽ được sử dụng cho việc giao tiếp với các peer khác


let myname = null;
let roomDialog = null;
let createDialog = null;
let dDialog=null;
let nameId = null;
let contentId = null;
let muteState = false;
let videoState = true;
var contentState = false;
let screenState = false;
let cameraStream = null;
let captureStream = null;
let contentExists = false;
let contentShown = false;
let swipeEventFunction;
// Kiểm tra xem thiết bị đang chạy trên hệ điều hành iOS hay không bằng cách kiểm tra user agent của trình duyệt
var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Hàm kiểm tra xem trình duyệt hỗ trợ khóa hướng màn hình hay không
function isScreenOrientationLockSupported() {
    // Kiểm tra xem 'orientation' và 'lock' có được hỗ trợ trong đối tượng screen hay không
    return 'orientation' in screen && 'lock' in screen.orientation;
}



function isHandheld() {
    let check = false;
      // Hàm kiểm tra chuỗi user agent để xác định xem là di động hay không
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
// Bật/tắt chức năng video khi người dùng nhấn nút.
function videoToggleEnable() {
    document.getElementById('videoButton').addEventListener('click', () => {
        if (videoState) {
        // Nếu video đang bật, tắt video
            videoState = false;
            document.getElementById('localVideo').srcObject.getVideoTracks()[0].enabled = false;
            document.querySelector('#videoButton').innerText = "videocam_off";
            document.getElementById('videoButton').classList.add('toggle');
        } else {
            videoState = true;
        // Nếu video đang tắt, bật video
            document.getElementById('localVideo').srcObject.getVideoTracks()[0].enabled = true;
            document.querySelector('#videoButton').innerText = "videocam";
            document.querySelector('#videoButton').classList.remove('toggle');
        }
    });
}

/**
 * Bật chia sẻ nội dung và thực hiện các hành động liên quan.
 * @param {object} roomRef - Tham chiếu đến phòng hoạt động.
 */
function toggleOnContent(roomRef) {
    // Gán source object của localVideo là captureStream (stream của nội dung muốn chia sẻ)
    document.getElementById('localVideo').srcObject = captureStream;
    // Cập nhật nút screenShareButton  và thêm một lớp (class) có tên 'toggle' vào nút để thể hiện trạng thái chia sẻ nội dung
    document.getElementById('screenShareButton').innerText = "stop_screen_share";
    document.getElementById('screenShareButton').classList.add('toggle');
    // Gửi tín hiệu chia sẻ nội dung đến các người dùng khác trong phòng
    signalContentShare(roomRef);
    // Đặt trạng thái chia sẻ màn hình thành true
    screenState = true;
    // Thiết lập sự kiện onended cho video track để xử lý khi chia sẻ nội dung kết thúc
    captureStream.getVideoTracks()[0].onended = () => {
        contentToggleOff(roomRef);
    }
}
/**
 * Gửi tín hiệu chia sẻ nội dung và thực hiện các hành động liên quan.
 * @param {object} roomRef - Tham chiếu đến phòng hoạt động.
 */
// Hàm gửi tín hiệu chia sẻ nội dung đến các người dùng trong phòng
function signalContentShare(roomRef) {
    // Tạo một ID ngẫu nhiên cho luồng chia sẻ màn hình bằng cách sử dụng hàm Math.random() và chuyển đổi thành chuỗi
    contentId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Thêm thông tin về luồng chia sẻ màn hình vào collection 'partyList' của phòng trên Firebase
    doc = roomRef.collection('partyList').doc(contentId).set({
        "name" : contentId,
        "display" : "content",
        "usename" : myname + "Content"
    });

    // Gửi yêu cầu kết nối đến các người dùng hiện tại trong phòng thông qua hàm requestConnectionToCurrentPeers
    requestConnectionToCurrentPeers(roomRef, contentId, true);

    // Chấp nhận kết nối từ các người dùng mới tham gia vào phòng thông qua hàm acceptConnectionsFromJoiningPeers
    acceptConnectionsFromJoiningPeers(roomRef, contentId, true);
}


/**
 * Xử lý sự kiện khi nhấn nút chia sẻ nội dung (screen share).
 * @param {object} roomRef - Tham chiếu đến phòng hoạt động.
 */
async function contentToggleButton(roomRef) {
    // Kiểm tra nếu chưa chia sẻ màn hình
    if (!screenState) {
        const displayMediaOptions = {
    // Tạo tùy chọn cho việc chia sẻ màn hình (display media)
            video: {
                cursor: "always"
            },
            audio: false
        };
        try {
            console.log('Toggling screen share');
    
            // Bắt đầu chia sẻ màn hình và nhận captureStream
            captureStream = await startCapture(displayMediaOptions);
            // Gọi hàm bật chia sẻ nội dung
            toggleOnContent(roomRef);
        } catch(error) {
            console.log(error.message);
        } 
    } else {
        // Nếu đang chia sẻ màn hình, gọi hàm tắt chia sẻ nội dung
        contentToggleOff(roomRef);
    }
}
/**
 * Tắt chia sẻ nội dung và thực hiện các hành động liên quan.
 * @param {object} roomRef - Tham chiếu đến phòng hoạt động.
 */
function contentToggleOff(roomRef) {
    // Xóa thông tin về nội dung khỏi CSDL
    roomRef.collection('partyList').doc(contentId).delete();
    // Dừng chia sẻ màn hình bằng cách gọi hàm stopCapture
    stopCapture(captureStream); 
    // Gán source object của localVideo là cameraStream (stream của camera)
    document.getElementById('localVideo').srcObject = cameraStream;
    // Đặt trạng thái chia sẻ màn hình thành false
    screenState = false;
    // Cập nhật nội dung và trạng thái của nút screenShareButton để thể hiện trạng thái chia sẻ màn hình
    document.getElementById('screenShareButton').innerText = 'screen_share';
    document.getElementById('screenShareButton').classList.remove('toggle');
}

/**
 * Bắt đầu chia sẻ màn hình và trả về captureStream.
 * @param {object} displayMediaOptions - Tùy chọn cho việc chia sẻ màn hình.
 * @returns {MediaStream} - captureStream được trả về.
 */
async function startCapture(displayMediaOptions) {
    let captureStream = null;
    // Gọi API để nhận captureStream từ màn hình
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    return captureStream;
}

/**
 * Dừng chia sẻ màn hình bằng cách ngừng các track trong stream.
 * @param {MediaStream} stream - Stream cần dừng chia sẻ.
 */
function stopCapture(stream) {
    // Lấy danh sách các track trong stream
    let tracks = stream.getTracks();
    // Dừng từng track trong danh sách
    tracks.forEach(track => track.stop());
    // Gán stream thành null

    stream = null;
}


/**
 * Bật/tắt chế độ tắt tiếng của cameraStream khi nhấn nút mute.
 */

function muteToggleEnable() {
    // Lắng nghe sự kiện click trên nút muteButton
    document.querySelector('#muteButton').addEventListener('click', () => {
         // Kiểm tra trạng thái mute
        if (!muteState) {
        // Nếu chưa tắt tiếng, tắt tiếng và cập nhật UI
            console.log("Muting");
            muteState = true;
            cameraStream.getAudioTracks()[0].enabled = false;
            document.querySelector('#muteButton').innerText = "mic_off";
            document.getElementById('muteButton').classList.add('toggle');
        } else {
            console.log("Unmuting");
            // Nếu đang tắt tiếng, bật tiếng và cập nhật UI
            muteState = false;
            cameraStream.getAudioTracks()[0].enabled = true;
            document.querySelector('#muteButton').innerText = "mic";
            document.getElementById('muteButton').classList.remove('toggle');
        }
    });
}
/**
 * Chuyển đổi video track trong một stream và thay thế nó trong sender của một peer connection.
 * @param {RTCPeerConnection} peerConnection - Peer connection liên quan.
 * @param {MediaStream} stream - Stream mới chứa video track cần chuyển đổi.
 */
// Hàm thay đổi video track trong một peer connection với một stream mới
function switchStream(peerConnection, stream) {
    // Lấy video track từ stream
    let videoTrack = stream.getVideoTracks()[0];
    // Tìm sender trong peer connection mà có loại track tương tự videoTrack
    var sender = peerConnection.getSenders().find(function(s) {
        return s.track.kind == videoTrack.kind;
    });
    // In thông tin sender ra console
    console.log('found sender:', sender);
    // Thay thế video track trong sender bằng video track mới
    sender.replaceTrack(videoTrack);
}


/**
 * Thay đổi camera được sử dụng trong local video và cập nhật cameraStream.
 * @param {string} deviceId - ID của thiết bị camera mới.
 */
// Hàm thay đổi camera được sử dụng cho local video
function changeCamera(deviceId) {
    // Sử dụng navigator.mediaDevices.getUserMedia để lấy stream mới từ camera mới
    navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: deviceId
        },
        audio: true
    }).then(stream => {
        // Cập nhật local video và cameraStream với stream mới
        document.getElementById('localVideo').srcObject = stream;
        cameraStream = stream;
    });
}


/**
 * Thêm một stream vào RTCPeerConnection bằng cách thêm từng track của stream vào connection.
 * @param {RTCPeerConnection} peerConnection - Peer connection cần thêm stream vào.
 * @param {MediaStream} stream - Stream cần được thêm vào peer connection.
 */
function addStream(peerConnection, stream) {
    // Sử dụng forEach để thêm từng track của stream vào peer connection
    stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
    });
}

/**
 * Tạo một offer cho RTCPeerConnection.
 * @param {RTCPeerConnection} peerConnection - Peer connection cần tạo offer.
 * @returns {Promise<RTCSessionDescriptionInit>} - Promise trả về offer được tạo.
 */
async function createOffer(peerConnection) {
    // Tạo offer
    const offer = await peerConnection.createOffer();
    // Đặt offer làm local description cho peer connection
    await peerConnection.setLocalDescription(offer);
    // Log thông tin offer ra console
    console.log('Created offer:', offer);
    // Ưu tiên sử dụng codec "h264" trong offer.sdp
    offer.sdp = preferCodec(offer.sdp, "h264");
    // Trả về offer đã tạo
    return offer;
}

/**
 * Tạo một answer cho RTCPeerConnection.
 * @param {RTCPeerConnection} peerConnection - Peer connection cần tạo answer.
 * @returns {Promise<RTCSessionDescriptionInit>} - Promise trả về answer được tạo.
 */
// Hàm tạo answer cho một đối tượng RTCPeerConnection
async function createAnswer(peerConnection) {
    // Tạo answer
    const answer = await peerConnection.createAnswer();
    // Log thông tin answer ra console
    console.log('Created answer:', answer);
    // Đặt mô tả địa phương cho kết nối đối tác trong WebRTC
    await peerConnection.setLocalDescription(answer);

    // Ưu tiên sử dụng codec "h264" trong SDP của phản hồi (answer)
    answer.sdp = preferCodec(answer.sdp, "h264");

    // Trả về đối tượng phản hồi đã được điều chỉnh
    return answer;

}
// Ví dụ về cách bạn có thể gọi hàm createAnswer từ một nơi khác và truyền vào biến offer:
// const offer = ...; // Đảm bảo rằng bạn đã định nghĩa biến offer ở đây
// const answer = await createAnswer(peerConnection, offer);
//Hàm này thực hiện các bước để "cắt kết nối" hoặc "rời phòng" (disconnect/leave room) 
function signalHangup(roomRef) {
    //out phòng xóa id khỏi party và xóa ghi màn hình
    document.querySelector('#hangupBtn').addEventListener('click', async () => {
        console.log("Disconnecting");

        // Xóa thông tin về người dùng khỏi partyList
        roomRef.collection('partyList').doc(nameId).delete();

        // Nếu đang chia sẻ màn hình, xóa thông tin về màn hình khỏi partyList
        if (screenState) {
            roomRef.collection('partyList').doc(contentId).delete();
        }

        // Xóa tất cả các documents trong collection có tên là nameId
        roomRef.collection(nameId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });

        // Xóa collection có tên là nameId
        roomRef.collection(nameId).delete();

        // Nếu đang chia sẻ màn hình, xóa tất cả các documents trong collection có tên là contentId
        if (screenState) {
            roomRef.collection(contentId).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
        }

        // Xóa collection có tên là contentId (nếu đang chia sẻ màn hình)
        const docRef = doc(roomRef, "partyList");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Out Room");
        } else {
            // Nếu collection "partyList" không tồn tại, xóa tất cả các documents trong roomRef
            roomRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
        }
    });
}


//  quản lý và chuyển gửi các ICE candidates (Interactive Connectivity Establishment) trong môi trường sử dụng WebRTC và Firestore
function signalICECandidates(peerConnection, roomRef, peerId, nameId) {
    // Lấy tham chiếu đến bộ sưu tập trong Firestore với tên là nameId (trong trường hợp này, là tên của người gửi)
    const callerCandidatesCollection = roomRef.collection(nameId);

    // Thêm một trình nghe sự kiện icecandidate cho đối tượng peerConnection
    peerConnection.addEventListener('icecandidate', event => {
        // Kiểm tra xem sự kiện có phải là sự kiện cuối cùng không (event.candidate là null)
        if (!event.candidate) {
            console.log('Nhận được candidate cuối cùng!');
            return;
        }

        // Nếu không phải là sự kiện cuối cùng, log thông tin của candidate vào console
        console.log('Nhận được candidate: ', event.candidate);

        // Thêm candidate vào bộ sưu tập callerCandidatesCollection trong Firestore
        // Bằng cách chuyển đổi candidate thành định dạng JSON và thêm vào bộ sưu tập
        callerCandidatesCollection.add(event.candidate.toJSON()).then(docRef => {
            // Sau khi thêm, cập nhật thông tin trong tài liệu mới tạo với name là peerId (định danh của đối tác kết nối)
            docRef.update({
                name: peerId
            });
        });
    });
}

//  nhiệm vụ theo dõi và xử lý các ICE candidates được gửi từ xa (remote) thông qua Firestore trong môi trường sử dụng WebRTC
async function receiveICECandidates(peerConnection, roomRef, remoteEndpointID, nameId) {
    // Sử dụng phương thức onSnapshot để theo dõi thay đổi trong bộ sưu tập trong Firestore
    roomRef.collection(remoteEndpointID).where("name", "==", nameId).onSnapshot(snapshot => {
        // Lặp qua các thay đổi trong tài liệu
        snapshot.docChanges().forEach(async change => {
            // Kiểm tra xem thay đổi có phải là thêm một tài liệu mới và không phải là SDP (Session Description Protocol)
            if (change.type === 'added' && change.doc.id !== "SDP") {
                // Log thông tin về thay đổi vào console
                console.log(change);

                // Lấy dữ liệu từ tài liệu mới thêm vào
                let data = change.doc.data();

                // Log thông tin về candidate nhận được vào console
                console.log(`Nhận được candidate ICE từ xa mới: ${JSON.stringify(data)}`);

                // Thêm candidate ICE từ xa vào đối tượng peerConnection
                await peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
        });
    });
}
//thêm một người dùng mới vào một phòng trong Firestore và trả về mã định danh của người dùng đó
async function addUserToRoom(roomRef) {
    // Tạo một mã định danh ngẫu nhiên cho người dùng mới
    let Id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // Tạo một tài liệu trong bộ sưu tập 'partyList' của phòng và đặt các thông tin của người dùng mới

    roomRef.collection('partyList').doc(Id).set({
        'name': Id,
        'display' : 'user',
        'usename': myname
    });
        // Trả về mã định danh của người dùng mới

    return Id;
}


// theo dõi và xử lý các mô tả phiên (SDP) được gửi từ xa (remote) thông qua Firestore
async function receiveAnswer(peerConnection, roomRef, peerId, nameId) {
    // Sử dụng onSnapshot để theo dõi thay đổi trong tài liệu trong Firestore
    roomRef.collection(nameId).doc('SDP').collection('answer').doc(peerId).onSnapshot(async snapshot => {
        // Kiểm tra xem tài liệu có tồn tại không
        if (snapshot.exists) {
            // Lấy dữ liệu từ tài liệu
            const data = snapshot.data();

            // Log thông tin mô tả phiên từ xa vào console
            console.log('Nhận được mô tả phiên từ xa: ', data.answer);

            // Tạo đối tượng RTCSessionDescription từ mô tả phiên
            const rtcSessionDescription = new RTCSessionDescription(data.answer);

            // Áp dụng mô tả phiên từ xa vào đối tượng peerConnection
            await peerConnection.setRemoteDescription(rtcSessionDescription);
        }
    });
}

// Hàm nhận luồng video từ đối tác và hiển thị nó trên giao diện
function receiveStream(peerConnection, remoteEndpointID, isPeerContent, namepeer) {
    // Lắng nghe sự kiện 'track' trên đối tượng RTCPeerConnection
    peerConnection.addEventListener('track', event => {
        // Log thông tin về luồng video từ đối tác
        console.log('Got remote track:', event.streams[0]);

        // Kiểm tra xem video đã được tạo trước đó hay chưa
        if (document.querySelector("#video" + remoteEndpointID) == null) {
            // Nếu chưa được tạo, tạo video mới cho đối tác
            createPeerVideo(remoteEndpointID, isPeerContent, namepeer);
        }

        // Đặt luồng video nhận được vào thành phần video trên giao diện
        document.querySelector("#video" + remoteEndpointID).srcObject = event.streams[0];

        // Tắt chế độ tắt âm (unmute) cho video nhận được
        document.querySelector("#video" + remoteEndpointID).muted = false;
    });
}


// Hàm gửi luồng video từ local peer đến remote peer
function sendStream(peerConnection, stream) {
    // Lặp qua từng track trong luồng video cục bộ (local stream)
    stream.getTracks().forEach(track => {
        // Thêm mỗi track vào đối tượng RTCPeerConnection để gửi đi
        peerConnection.addTrack(track, stream);
    });
}


// Hàm gửi đề xuất kết nối (offer) từ local peer đến remote peer
async function sendOffer(offer, roomRef, peerId, nameId, isUserContent) {
    // Tạo một đối tượng mô tả (SDP) cho đề xuất kết nối
    const peerOffer = {
        'offer': {
            type: offer.type,
            sdp: offer.sdp,
            display: 'user', // Mặc định là người dùng thông thường
            name: myname // Tên của local peer (người gửi đề xuất)
        },
    };

    // Nếu local peer là người chia sẻ nội dung, cập nhật thuộc tính display của đề xuất
    if (isUserContent) {
        peerOffer.offer.display = 'content'; // Đặt thuộc tính display thành 'content'
    }

    // Gửi đề xuất kết nối đến remote peer thông qua Firestore
    await roomRef.collection(peerId).doc('SDP').collection('offer').doc(nameId).set(peerOffer);
}
// Hàm gửi phản hồi kết nối (answer) từ local peer đến remote peer
async function sendAnswer(answer, roomRef, peerId, nameId, isUserContent) {
    // Tạo một đối tượng mô tả (SDP) cho phản hồi kết nối
    const peerAnswer = {
        'answer': {
            type: answer.type,
            sdp: answer.sdp,
            display: 'user', // Mặc định là người dùng thông thường
            name: myname // Tên của local peer (người gửi phản hồi)
        },
    };

    // Nếu local peer là người chia sẻ nội dung, cập nhật thuộc tính display của phản hồi
    if (isUserContent) {
        peerAnswer.answer.display = 'content'; // Đặt thuộc tính display thành 'content'
    }

    // Gửi phản hồi kết nối đến remote peer thông qua Firestore
    await roomRef.collection(peerId).doc('SDP').collection('answer').doc(nameId).set(peerAnswer);
}

// Hàm nhận yêu cầu kết nối (offer) từ remote peer
async function receiveOffer(peerConnection, roomRef, peerId) {
    // Truy xuất dữ liệu yêu cầu kết nối từ cơ sở dữ liệu Firestore
    await roomRef.collection(nameId).doc('SDP').collection('offer').doc(peerId).get().then(async snapshot => {
        // Kiểm tra xem dữ liệu tồn tại hay không
        if (snapshot.exists) {
            // Lấy dữ liệu yêu cầu kết nối từ tài liệu Firestore
            const data = snapshot.data();
            const offer = data.offer;
            const name = offer.name; // Lấy tên của remote peer từ yêu cầu kết nối
            console.log('Got offer from:', name);

            // Đặt mô tả từ xa của local peer bằng mô tả từ remote peer (offer)
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        }
    });
}



// Hàm đóng kết nối với remote peer và xử lý các thay đổi trong cơ sở dữ liệu Firestore
function closeConnection(peerConnection, roomRef, peerId) {
    // Lắng nghe sự kiện snapshot cho collection 'partyList' và xử lý thay đổi
    roomRef.collection('partyList').where('name', '==', peerId).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type == 'removed') {
                // Kiểm tra nếu remote peer đang chia sẻ nội dung
                if (change.doc.data().display == 'content') {
                    // Nếu không phải là thiết bị cầm tay, hiển thị nút chia sẻ màn hình
                    if (!isHandheld()) {
                        document.getElementById('screenShareButton').classList.remove('hidden');
                    }
                    contentExists = false;
                    contentShown = false;
                    document.removeEventListener('touchmove', swipeEventFunction);
                }
                // Đóng kết nối với remote peer
                peerConnection.close();    
                // Xóa video container của remote peer khỏi DOM
                if (document.getElementById("video" + peerId + "Container") != null) {
                    document.getElementById("video" + peerId + "Container").remove();
                }
                // Cập nhật giao diện sau khi đóng kết nối
                enforceLayout(--numberOfDisplayedPeers);
            }
        });
    });

    // Lắng nghe sự kiện thay đổi trạng thái kết nối của peerConnection
    peerConnection.onconnectionstatechange = function() {
        // Kiểm tra trạng thái kết nối của peerConnection
        if (peerConnection.connectionState == 'disconnected' || peerConnection.connectionState == "failed") {
            // Đóng kết nối với remote peer
            peerConnection.close();    
            // Xóa video container của remote peer khỏi DOM
            if (document.getElementById("video" + peerId + "Container") != null) {
                document.getElementById("video" + peerId + "Container").remove();
            }
        }
    }
}
// Hàm tạo và thiết lập kết nối với remote peer
async function peerRequestConnection(peerId, roomRef, nameId, isUserContent, isPeerContent, namepeer) {
    // Tạo đối tượng RTCPeerConnection với cấu hình đã định sẵn
    console.log('Create PeerConnection with configuration: ', configuration);
    const peerConnection = new RTCPeerConnection(configuration);

    // Đăng ký lời nghe sự kiện cho RTCPeerConnection
    registerPeerConnectionListeners(peerConnection);

    // Nếu đang gửi nội dung (chia sẻ màn hình), thêm dữ liệu từ stream chia sẻ màn hình
    if (isUserContent) {
        sendStream(peerConnection, captureStream);
    } else {
        // Nếu không phải, thêm dữ liệu từ camera
        sendStream(peerConnection, cameraStream);

        // Đăng ký sự kiện click cho các camera để chuyển đổi giữa chúng
        document.getElementById('cameras').childNodes.forEach(camera => {
            camera.addEventListener('click', () => {
                switchStream(peerConnection, cameraStream);
            });
        });
    }

    // Đăng ký lời nghe sự kiện cho các candidate ICE
    signalICECandidates(peerConnection, roomRef, peerId, nameId);

    // Tạo offer và gửi nó đến remote peer
    const offer = await createOffer(peerConnection);
    await sendOffer(offer, roomRef, peerId, nameId, isUserContent);

    // Nếu không phải là việc chia sẻ màn hình, thực hiện lắng nghe stream từ remote peer
    if (!isUserContent) {
        receiveStream(peerConnection, peerId, isPeerContent, namepeer);
    }

    // Lắng nghe và xử lý answer từ remote peer
    await receiveAnswer(peerConnection, roomRef, peerId, nameId);

    // Lắng nghe và xử lý candidate ICE từ remote peer
    await receiveICECandidates(peerConnection, roomRef, peerId, nameId);

    // Đăng ký sự kiện click cho nút "Kết thúc cuộc gọi" để đóng kết nối khi cần
    document.querySelector('#hangupBtn').addEventListener('click', () => peerConnection.close());

    // Nếu không phải là việc chia sẻ màn hình, đóng kết nối khi có sự kiện thay đổi trong cơ sở dữ liệu
    if (!isUserContent) {
        closeConnection(peerConnection, roomRef, peerId);
    }

    // Nếu không phải là việc chia sẻ màn hình, khôi phục kết nối khi có sự kiện thay đổi trong cơ sở dữ liệu
    if (!isUserContent) {
        restartConnection(peerConnection, roomRef, peerId);
    }
}
// Hàm thiết lập và chấp nhận kết nối từ remote peer
async function peerAcceptConnection(peerId, roomRef, nameId, isPeerContent, isUserContent, namepeer) {
    console.log('Create PeerConnection with configuration: ', configuration);

    // Tạo đối tượng RTCPeerConnection với cấu hình đã định sẵn
    const peerConnection = new RTCPeerConnection(configuration);

    // Đăng ký lời nghe sự kiện cho RTCPeerConnection
    registerPeerConnectionListeners(peerConnection);

    // Nếu không phải là nội dung của peer, thêm dữ liệu stream vào RTCPeerConnection
    if (!isPeerContent) {
        if (isUserContent) {
            sendStream(peerConnection, captureStream);
        } else {
            // Nếu không phải là người chia sẻ nội dung, thêm dữ liệu từ camera
            sendStream(peerConnection, cameraStream);

            // Đăng ký sự kiện click cho các camera để chuyển đổi giữa chúng
            document.getElementById('cameras').childNodes.forEach(camera => {
                camera.addEventListener('click', () => {
                    switchStream(peerConnection, cameraStream);
                });
            });
        }
    }

    // Đăng ký lời nghe sự kiện cho các candidate ICE
    signalICECandidates(peerConnection, roomRef, peerId, nameId);

    // Nếu không phải là người chia sẻ màn hình, lắng nghe stream từ remote peer
    if (!isUserContent) {
        receiveStream(peerConnection, peerId, isPeerContent, namepeer);
    }

    // Lắng nghe và xử lý offer từ remote peer
    await receiveOffer(peerConnection, roomRef, peerId, nameId);

    // Tạo và gửi answer đến remote peer
    const answer = await createAnswer(peerConnection);
    await sendAnswer(answer, roomRef, peerId, nameId, isUserContent);

    // Lắng nghe và xử lý candidate ICE từ remote peer
    await receiveICECandidates(peerConnection, roomRef, peerId, nameId);

    // Đăng ký sự kiện click cho nút "Kết thúc cuộc gọi" để đóng kết nối khi cần
    document.querySelector('#hangupBtn').addEventListener('click', () => peerConnection.close());

    // Nếu không phải là người chia sẻ màn hình, đóng kết nối khi có sự kiện thay đổi trong cơ sở dữ liệu
    if (!isUserContent) {
        closeConnection(peerConnection, roomRef, peerId);
    }

    // Nếu không phải là người chia sẻ màn hình, khôi phục kết nối khi có sự kiện thay đổi trong cơ sở dữ liệu
    if (!isUserContent) {
        restartConnection(peerConnection, roomRef, peerId);
    }
}
// Hàm khôi phục lại kết nối ICE nếu kết nối trước đó thất bại
function restartConnection(peerConnection, roomRef, peerId) {
    // Lắng nghe sự kiện thay đổi trạng thái kết nối ICE
    peerConnection.oniceconnectionstatechange = async function() {
        // Kiểm tra nếu trạng thái kết nối là "failed" (thất bại)
        if (peerConnection.iceConnectionState === "failed") {
            console.log('Restarting connection with: ' + peerId);

            // Kiểm tra xem có hỗ trợ phương thức restartIce hay không
            if (peerConnection.restartIce) {
                // Sử dụng phương thức restartIce để khôi phục lại kết nối
                peerConnection.restartIce();
            } else {
                // Nếu không hỗ trợ restartIce, tạo offer mới với thuộc tính iceRestart
                peerConnection.createOffer({ iceRestart: true })
                    .then(peerConnection.setLocalDescription)
                    .then(async offer => {
                        // Gửi offer mới để khôi phục lại kết nối
                        await sendOffer(offer, roomRef, peerId, false);
                    });
            }
        }
    }
}
// Hàm đăng ký sự kiện lắng nghe thay đổi trong danh sách thành viên của phòng
async function registerMember(roomRef) {
    // Lắng nghe sự kiện thay đổi trong tài liệu 'partyList' của phòng
    roomRef.collection('partyList').onSnapshot(snapshot => {
        // Lặp qua các thay đổi trong snapshot
        snapshot.docChanges().forEach(change => {
            // Lấy tên thành viên từ dữ liệu của tài liệu
            const name = change.doc.data().usename;

            // Xử lý sự kiện thêm thành viên
            if (change.type === 'added') {
                Addmember(name);
            }

            // Xử lý sự kiện xóa thành viên
            if (change.type === 'removed') {
                Removemember(name);
            }
        });
    });
}
// Hàm đăng ký lắng nghe sự kiện cho đối tượng RTCPeerConnection
function registerPeerConnectionListeners(peerConnection) {
    // Lắng nghe sự kiện thay đổi trạng thái thu thập ICE
    peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(`ICE gathering state changed: ${peerConnection.iceGatheringState}`);
    });

    // Lắng nghe sự kiện thay đổi trạng thái kết nối
    peerConnection.addEventListener('connectionstatechange', () => {
        console.log(`Connection state change: ${peerConnection.connectionState}`);
    });

    // Lắng nghe sự kiện thay đổi trạng thái đàm phán (signaling)
    peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${peerConnection.signalingState}`);
    });

    // Lắng nghe sự kiện thay đổi trạng thái kết nối ICE
    peerConnection.addEventListener('iceconnectionstatechange', () => {
        console.log(`ICE connection state change: ${peerConnection.iceConnectionState}`);
    });
}
// Hàm yêu cầu kết nối với các đối tác hiện tại trong phòng
function requestConnectionToCurrentPeers(roomRef, Id, isContent) {
    // Lấy danh sách tất cả các người tham gia trong phòng
    roomRef.collection('partyList').get().then(snapshot => {
        // Duyệt qua từng người tham gia
        snapshot.docs.forEach(async doc => {
            // Lấy thông tin của người tham gia
            const peerId = doc.data().name; // Mã định danh của người tham gia
            const namePeer = doc.data().usename; // Tên của người tham gia
            const isPeerContent = (doc.data().display == 'content'); // Kiểm tra xem người tham gia có chia sẻ nội dung hay không

            // Kiểm tra xem người tham gia có phải là chính mình không và có phải đối tác chia sẻ màn hình không
            if (peerId != nameId && peerId != Id) {
                // Nếu đối tác chia sẻ màn hình, ẩn nút chia sẻ màn hình
                if (isPeerContent) {
                    console.log('Content Identified');
                    document.getElementById('screenShareButton').classList.add('hidden');
                }

                // Gửi yêu cầu kết nối đến đối tác
                console.log('Sending request to: ' + peerId);
                await peerRequestConnection(peerId, roomRef, Id, isContent, isPeerContent, namePeer);
            }
        })
    });
}
// Hàm mở hộp thoại để nhập thông tin và xác nhận tạo phòng mới
function roomInfCreate() {
    // Đăng ký sự kiện click cho nút xác nhận tạo phòng
    document.querySelector('#confirmCrBtn').addEventListener('click', async () => {
        // Lấy giá trị từ trường nhập tên phòng
        const name = document.querySelector('#room-name').value;
        
        // Gọi hàm tạo phòng và truyền tên phòng vào
        createRoom(name);
    }, { once: true }); // Sự kiện chỉ được kích hoạt một lần

    // Mở hộp thoại để người dùng nhập thông tin và xác nhận tạo phòng
    createDialog.open();
}
async function createRoom(name) {
    // Lấy giá trị tên người dùng và loại bỏ khoảng trắng ở đầu và cuối
    const trimmedName = name.trim();

    // Kiểm tra nếu tên không chứa chỉ toàn kí tự trắng hoặc là chuỗi rỗng
    if (trimmedName === '') {
        alert('Please enter a valid name.'); // Hiển thị cảnh báo hoặc thông báo khác
        createDialog.open(); // Mở lại hộp thoại nếu tên không hợp lệ
        return; // Dừng xử lý tiếp theo nếu tên không hợp lệ
    };

    // Đóng hộp thoại nhập thông tin
    dDialog.close();

    // Hiển thị tên người tạo phòng trên giao diện
    document.getElementById('namepeer').textContent = name;

    // Lắng nghe sự kiện click trên video cục bộ để ẩn video của người tạo phòng
    document.querySelector('#localVideo').addEventListener('click', hideLocalVideo);

    // Hiển thị nút "Tắt cuộc gọi" và ẩn nút "Tạo phòng"
    document.querySelector('#hangupBtn').classList.remove("hidden");
    document.querySelector('#createBtn').classList.add("hidden");

    // Hiển thị nút "Chia sẻ", "Tắt âm" và ẩn nút "Tham gia phòng"
    document.querySelector('#shareButton').classList.remove("hidden");
    document.querySelector('#muteButton').classList.remove("hidden");
    document.querySelector('#joinBtn').classList.add("hidden");

    // Nếu không phải là thiết bị cầm tay, hiển thị nút "Chia sẻ màn hình"
    if (!isHandheld()) {
        document.querySelector('#screenShareButton').classList.remove("hidden");
    }

    // Tạo tham chiếu đến Firestore cho phòng mới
    const roomRef = await db.collection('rooms').doc();

    // Sự kiện click trên nút "Chia sẻ" mở một liên kết chia sẻ qua WhatsApp
    document.querySelector('#shareButton').onclick = () => {
        window.open(
            `https://api.whatsapp.com/send?text=${window.location.href.split('?')[0]}?roomId=${roomRef.id}`,
            "_blank"
        )
    };

    // Lưu tên người tạo phòng và định danh người tạo mới thêm vào phòng
    myname = name;
    nameId = await addUserToRoom(roomRef);

    // Hiển thị thông tin về phòng
    infRoom(roomRef.id);

    // Thiết lập người chủ phòng
    roomRef.set({ host: nameId });

    // Gửi thông điệp "create" đến tất cả người dùng trong phòng
    sendChat(roomRef, "create");

    // Khởi tạo hệ thống tin nhắn trong phòng
    messinit(roomRef);

    // Đăng ký sự kiện để theo dõi thành viên mới tham gia vào phòng
    registerMember(roomRef);

    // Chấp nhận kết nối từ các người dùng mới tham gia vào phòng
    acceptConnectionsFromJoiningPeers(roomRef, nameId, false);

    // Gọi hàm signalHangup để xử lý sự kiện "Kết thúc cuộc gọi"
    signalHangup(roomRef);

    // Hiển thị nút "Chia sẻ màn hình" và thêm sự kiện click
    document.querySelector('#screenShareButton').addEventListener('click', () => contentToggleButton(roomRef));

    // Log ID của phòng ra console
    console.log(`Room ID: ${roomRef.id}`);
}
function joinRoom() {
    // Đăng ký sự kiện click cho nút xác nhận tham gia phòng
    document.querySelector('#confirmJoinBtn').addEventListener('click', async () => {
        // Lấy giá trị của trường nhập số phòng và trường nhập tên người dùng
        const roomId = document.querySelector('#room-id').value;
        const nameInput = document.querySelector('#peer-name');
        const name = nameInput.value.trim(); // Lấy giá trị và loại bỏ khoảng trắng ở đầu và cuối

        // Kiểm tra nếu tên không chứa chỉ toàn kí tự trắng hoặc là chuỗi rỗng
        if (name === '') {
            alert('Please enter a valid name.'); // Hiển thị cảnh báo hoặc thông báo khác
            nameInput.focus(); // Đặt lại trọng tâm vào trường nhập tên để người dùng có thể nhập lại
            roomDialog.open(); // Mở lại hộp thoại nếu tên không hợp lệ
            return; // Dừng xử lý tiếp theo nếu tên không hợp lệ
        }

        // Gọi hàm tham gia phòng bằng ID và truyền tên người dùng
        await joinRoomById(roomId, name);
    }, { once: true });

    // Mở dialog để người dùng nhập thông tin và xác nhận
    roomDialog.open();
}
//chấp nhận các kết nối từ các đối tác mới tham gia vào phòng
function acceptConnectionsFromJoiningPeers(roomRef, nameId, isReceiverContent) {
    // Lắng nghe sự kiện thay đổi trong tài liệu 'offer' của đối tác mới tham gia
    roomRef.collection(nameId).doc('SDP').collection('offer').onSnapshot(async snapshot => {
        // Lặp qua các thay đổi trong tài liệu
        await snapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
                console.log("Accepting Request from: " + change.doc.id);
                // Khởi tạo biến isSenderContent để kiểm tra xem đối tác mới là người chia sẻ nội dung hay không
                let isSenderContent = false;
                let namepeer = change.doc.data().offer.name;
                console.log("--------Display namepeer : " + namepeer);
                console.log(change.doc.data());
                
                // Kiểm tra nếu đối tác mới là người chia sẻ nội dung, thì đặt isSenderContent thành true
                if (change.doc.data().offer.display == 'content') {
                    console.log('Content Identified');
                    isSenderContent = true; 
                    // Ẩn nút chia sẻ màn hình nếu đối tác mới là người chia sẻ nội dung
                    document.getElementById('screenShareButton').classList.add('hidden');
                }
                
                console.log('Is sender content' + isSenderContent);
                
                // Gọi hàm peerAcceptConnection để thiết lập kết nối với đối tác mới
                await peerAcceptConnection(change.doc.id, roomRef, nameId, isSenderContent, isReceiverContent, namepeer);
            } else {
                console.log("Mesh has been setup.");
            }
        })
    });
}
// thiết kế để tham gia vào một phòng đã tồn tại bằng cách sử dụng mã phòng cụ thể
async function joinRoomById(roomId, name) {
    // Đóng hộp thoại nhập thông tin
    dDialog.close();

    // Lấy tham chiếu đến phòng dựa trên mã phòng
    const roomRef = db.collection('rooms').doc(`${roomId}`);

    // Lấy thông tin về phòng từ Firestore
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot.exists);

    // Gán tên của người tham gia
    myname = name;

    // Kiểm tra xem phòng có tồn tại hay không
    if (roomSnapshot.exists) {
        // Hiển thị các nút và chức năng liên quan đến việc tham gia phòng
        document.querySelector('#hangupBtn').classList.remove("hidden");
        document.querySelector('#localVideo').addEventListener('click', hideLocalVideo);
        document.querySelector('#shareButton').onclick = () => {
            window.open(
                `https://api.whatsapp.com/send?text=${window.location.href.split('?')[0]}?roomId=${roomRef.id}`,
                "_blank"
            )
        };
        infRoom(roomRef.id);
        document.querySelector('#shareButton').classList.remove("hidden");
        document.querySelector('#createBtn').classList.add("hidden");
        document.querySelector('#joinBtn').classList.add("hidden");
        document.querySelector('#muteButton').classList.remove("hidden");
        if (!isHandheld()) {
            document.querySelector('#screenShareButton').classList.remove("hidden");
        }

        // Thêm người tham gia vào phòng
        nameId = await addUserToRoom(roomRef);

        console.log('Join room: ', roomId);

        // Yêu cầu kết nối với các đồng nghiệp hiện tại trong phòng
        registerMember(roomRef);

        // Gửi yêu cầu kết nối đến các đồng nghiệp hiện tại
        requestConnectionToCurrentPeers(roomRef, nameId, false);

        // Chấp nhận kết nối từ các đồng nghiệp mới tham gia phòng
        acceptConnectionsFromJoiningPeers(roomRef, nameId, false);

        // Gửi tín hiệu khi kết thúc cuộc gọi
        signalHangup(roomRef);

        // Khởi tạo hệ thống tin nhắn trong phòng
        messinit(roomRef);

        // Bật/tắt chia sẻ màn hình
        document.querySelector('#screenShareButton').addEventListener('click', () => contentToggleButton(roomRef));

    } else {
        // Hiển thị thông báo nếu phòng không tồn tại
        document.querySelector(
            '#currentRoom').innerText = `Room: ${roomId} - Doesn't exist!`;
    }
}

//có nhiệm vụ mở và quản lý luồng phương tiện từ thiết bị người dùng, chủ yếu là camera và micro
async function openUserMedia() {
    // Liệt kê tất cả các thiết bị phương tiện đầu vào
    navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(device => {
            const deviceNode = document.createElement("li");
            deviceNode.innerText = device.label;
            deviceNode.classList.add("mdc-list-item");
            deviceNode.role = "menuitem";
            deviceNode.tabIndex = 0;

            // Nếu là thiết bị videoinput (camera), thêm sự kiện chuyển đổi camera khi được chọn
            if (device.kind == "videoinput") {
                deviceNode.addEventListener('click', () => changeCamera(device.deviceId))
                document.getElementById("cameras").appendChild(deviceNode);
            }
        });
    });

    // Lấy luồng phương tiện từ camera và micro
    cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "user",
        }, 
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
        }
    });

    // Hiển thị luồng video từ camera trên giao diện người dùng
    document.querySelector('#localVideo').srcObject = cameraStream;

    console.log('Stream:', document.querySelector('#localVideo').srcObject);
    // Hiển thị nút tham gia và tạo phòng
    document.querySelector('#joinBtn').classList.remove("hidden");
    document.querySelector('#createBtn').classList.remove("hidden");
}

//có nhiệm vụ kết thúc cuộc gọi hoặc phòng họp
function hangUp() {
    // Lấy tất cả các tracks từ luồng phương tiện của video local
    const tracks = document.querySelector('#localVideo').srcObject.getTracks();

    // Dừng mỗi track để kết thúc luồng phương tiện
    tracks.forEach(track => {
        track.stop();
    });

    // Chuyển hướng trang web để kết thúc cuộc gọi hoặc phòng họp
    window.location = window.location.pathname;
}


// Hàm hideNavBarOnTap có nhiệm vụ ẩn đi thanh điều hướng (navbar)
function hideNavBarOnTap() {
    // Thêm sự kiện click vào toàn bộ trang web
    document.addEventListener("click", () => { 
        // Thêm lớp "unhover" vào phần tử có ID là "buttons"
        document.getElementById("buttons").classList.add("unhover");
    });
}
// Hàm cameraDropdown để mở dropdown hoặc menu chứa danh sách camera
function cameraDropdown() {
    // Giả sử "menu" là một đối tượng hoặc biến có thuộc tính "open"
    // Đặt thuộc tính "open" của "menu" thành true để mở dropdown hoặc menu camera
    menu.open = true;
}
function init() {
        // Khởi tạo Firestore
        db = firebase.firestore();
        // Sử dụng Emulator Firestore nếu ứng dụng đang chạy trên localhost
        if (location.hostname === "localhost") {
            db.useEmulator("localhost", "8080");
        }

        // Lấy các tham số từ URL
        params = new URLSearchParams(location.search);

        // Khởi tạo Dialogs
        roomDialog = new mdc.dialog.MDCDialog(document.querySelector('#room-dialog'));
        createDialog = new mdc.dialog.MDCDialog(document.querySelector('#create-dialog'));
        dDialog = new mdc.dialog.MDCDialog(document.querySelector('#d-dialog'));

        // Mở dialog "d-dialog" ngay khi ứng dụng được khởi chạy
        dDialog.open();

        // Mở camera và hiển thị video từ camera lên giao diện
        openUserMedia();

        // Nếu có tham số 'roomId' trong URL, thực hiện tham gia vào phòng
        if (params.get('roomId')) {
            console.log('Done');
            document.querySelector('#room-id').value = params.get('roomId');
            joinRoom();
        }

        // Đăng ký sự kiện cho nút 'hangupBtn', khi nút này được nhấn, thực hiện hàm 'hangUp'
        document.querySelector('#hangupBtn').addEventListener('click', hangUp);

        // Đăng ký sự kiện cho nút 'createBtn', khi nút này được nhấn, thực hiện hàm 'roomInfCreate'
        document.querySelector('#createBtn').addEventListener('click', roomInfCreate);

        // Đăng ký sự kiện cho nút 'joinBtn', khi nút này được nhấn, thực hiện hàm 'joinRoom'
        document.querySelector('#joinBtn').addEventListener('click', joinRoom);

        // Đăng ký sự kiện cho nút 'localVideoShowButton', khi nút này được nhấn, thực hiện hàm 'showLocalVideo'
        document.querySelector('#localVideoShowButton').addEventListener('click', showLocalVideo);

        // Đăng ký sự kiện cho phần tử có ID 'cameraOptions', khi phần tử này được nhấn, thực hiện hàm 'cameraDropdown'
        document.querySelector('#cameraOptions').addEventListener('click', cameraDropdown);

        // Quản lý chế độ toàn màn hình
        let isFullscreen = false;
        document.getElementById('appFullscreenButton').addEventListener('click', () => {
            if (!isFullscreen) {
                isFullscreen = true;
                openFullscreen(document.body);
                document.getElementById('appFullscreenButton').classList.add('toggle');
                document.getElementById('appFullscreenButton').innerText = 'fullscreen_exit';
            } else {
                isFullscreen = false;
                closeFullscreen();
                document.getElementById('appFullscreenButton').classList.remove('toggle');
                document.getElementById('appFullscreenButton').innerText = 'fullscreen';
            }
        });

        // Ẩn Navbar khi chạm vào trang web
        hideNavBarOnTap();

        // Bật/Tắt chế độ Mute và Video
        muteToggleEnable();
        videoToggleEnable();

        // Xử lý sự kiện khi trang web đóng hoặc chuyển trang (phù hợp với iOS và các trình duyệt khác)
        var eventName = isiOS ? 'pagehide' : 'beforeunload';
        window.addEventListener(eventName, function() {
            // Tự động nhấn nút 'hangupBtn' khi trang web đóng
            document.getElementById('hangupBtn').click();
        });
}
// Khởi tạo ứng dụng
init();