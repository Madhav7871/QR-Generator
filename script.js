const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrBox = document.getElementById("qr-box");
const qrImage = document.getElementById("qr-image");

generateBtn.addEventListener("click", () => {
  const textValue = qrInput.value.trim();

  if (!textValue) {
    qrInput.style.borderColor = "#ef4444";
    setTimeout(() => (qrInput.style.borderColor = ""), 2000);
    alert("Please enter a link or text first!");
    return;
  }

  // Visual loading state
  generateBtn.innerText = "Generating QR Code...";
  generateBtn.style.opacity = "0.7";
  generateBtn.style.pointerEvents = "none";

  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(textValue)}`;

  qrImage.src = apiUrl;

  qrImage.onload = () => {
    qrBox.classList.remove("hidden");
    generateBtn.innerText = "Generate QR Code";
    generateBtn.style.opacity = "1";
    generateBtn.style.pointerEvents = "auto";
  };
});
