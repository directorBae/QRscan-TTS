import jsQR from "jsqr";

function extractQRCode(imageData) {
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  let data;
  if (code) {
    data = code.data;
  } else {
    data = null; // QR 코드를 찾을 수 없음
  }
  return data;
}

export default extractQRCode;
