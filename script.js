const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrBox = document.getElementById("qr-box");
const qrImage = document.getElementById("qr-image");
const downloadBtn = document.getElementById("download-btn");

generateBtn.addEventListener("click", () => {
  const textValue = qrInput.value.trim();

  if (!textValue) {
    qrInput.style.borderColor = "#ef4444";
    setTimeout(() => (qrInput.style.borderColor = ""), 2000);
    alert("Please enter a link or text first!");
    return;
  }

  generateBtn.innerText = "Generating QR Code...";
  generateBtn.style.opacity = "0.7";
  generateBtn.style.pointerEvents = "none";

  // Requesting a larger 300x300 image for cleaner scanning ratios
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(textValue)}`;

  qrImage.src = apiUrl;

  qrImage.onload = () => {
    qrBox.classList.remove("hidden");
    generateBtn.innerText = "Generate QR Code";
    generateBtn.style.opacity = "1";
    generateBtn.style.pointerEvents = "auto";
  };
});

// Premium Download Handler Script
downloadBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(qrImage.src);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "qr-studio-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    alert(
      "Direct download blocked by browser security. Simply right-click the QR image to save it!",
    );
  }
});
