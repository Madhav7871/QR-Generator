const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrBox = document.getElementById("qr-box");
const qrImage = document.getElementById("qr-image");

generateBtn.addEventListener("click", () => {
  const textValue = qrInput.value.trim();

  if (!textValue) {
    alert("Please type a link or text first!");
    return;
  }

  generateBtn.innerText = "Generating...";

  // Requesting the QR image from the public API
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(textValue)}`;

  qrImage.src = apiUrl;

  // Reveal the graphic panel container only when it finishes downloading completely
  qrImage.onload = () => {
    qrBox.classList.remove("hidden");
    generateBtn.innerText = "Generate QR Code";
  };
});
