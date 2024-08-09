// thực hiện ưu tiên một codec cụ thể cho video trong một mô tả phiên (SDP - Session Description Protocol)
function preferCodec(sdp, codecName) {
    // Phân tích SDP thành các thành phần quan trọng
    var info = splitLines(sdp);

    // Nếu không có thông tin về codec video, trả về SDP nguyên vẹn
    if (!info.videoCodecNumbers) {
        return sdp;
    }

    // Kiểm tra nếu codec đã được ưu tiên là codec hiện tại được sử dụng, trả về SDP nguyên vẹn
    if (codecName === 'vp8' && info.vp8LineNumber === info.videoCodecNumbers[0]) {
        return sdp;
    }

    if (codecName === 'vp9' && info.vp9LineNumber === info.videoCodecNumbers[0]) {
        return sdp;
    }

    if (codecName === 'h264' && info.h264LineNumber === info.videoCodecNumbers[0]) {
        return sdp;
    }

    // Nếu không phải codec hiện tại, gọi hàm preferCodecHelper để thực hiện ưu tiên codec
    sdp = preferCodecHelper(sdp, codecName, info);

    // Trả về SDP đã được xử lý
    return sdp;
}


//mục đích là thay đổi thứ tự của các codec video trong Session Description Protocol (SDP) để ưu tiên một codec cụ thể
function preferCodecHelper(sdp, codec, info, ignore) {
    var preferCodecNumber = '';

    if (codec === 'vp8') {
        if (!info.vp8LineNumber) {
            return sdp;
        }
        preferCodecNumber = info.vp8LineNumber;
    }

    if (codec === 'vp9') {
        if (!info.vp9LineNumber) {
            return sdp;
        }
        preferCodecNumber = info.vp9LineNumber;
    }

    if (codec === 'h264') {
        if (!info.h264LineNumber) {
            return sdp;
        }

        preferCodecNumber = info.h264LineNumber;
    }

    var newLine = info.videoCodecNumbersOriginal.split('SAVPF')[0] + 'SAVPF ';

    var newOrder = [preferCodecNumber];

    if (ignore) {
        newOrder = [];
    }

    info.videoCodecNumbers.forEach(function(codecNumber) {
        if (codecNumber === preferCodecNumber) return;
        newOrder.push(codecNumber);
    });

    newLine += newOrder.join(' ');

    sdp = sdp.replace(info.videoCodecNumbersOriginal, newLine);
    return sdp;
    
}
/**
 * Hàm này phân tích một chuỗi SDP thành một đối tượng chứa thông tin chi tiết về video codecs và các số thứ tự của chúng.
 * @param {string} sdp - Chuỗi SDP cần phân tích.
 * @returns {object} - Đối tượng chứa thông tin về video codecs và các số thứ tự của chúng.
 */
function splitLines(sdp) {
    var info = {};

    // Duyệt qua từng dòng trong chuỗi SDP.
    sdp.split('\n').forEach(function(line) {
        // Nếu dòng bắt đầu bằng 'm=video', xác định các số thứ tự của video codecs.
        if (line.indexOf('m=video') === 0) {
            info.videoCodecNumbers = [];
            // Tách các số thứ tự và thêm vào mảng videoCodecNumbers.
            line.split('SAVPF')[1].split(' ').forEach(function(codecNumber) {
                codecNumber = codecNumber.trim();
                if (!codecNumber || !codecNumber.length) return;
                info.videoCodecNumbers.push(codecNumber);
                // Lưu dòng gốc chứa thông tin về video codecs.
                info.videoCodecNumbersOriginal = line;
            });
        }

        // Nếu dòng chứa thông tin về VP8 và chưa xác định số thứ tự của nó, gán số thứ tự.
        if (line.indexOf('VP8/90000') !== -1 && !info.vp8LineNumber) {
            info.vp8LineNumber = line.replace('a=rtpmap:', '').split(' ')[0];
        }

        // Tương tự với VP9 và H.264.
        if (line.indexOf('VP9/90000') !== -1 && !info.vp9LineNumber) {
            info.vp9LineNumber = line.replace('a=rtpmap:', '').split(' ')[0];
        }

        if (line.indexOf('H264/90000') !== -1 && !info.h264LineNumber) {
            info.h264LineNumber = line.replace('a=rtpmap:', '').split(' ')[0];
        }
    });

    // Trả về đối tượng chứa thông tin.
    return info;
}
