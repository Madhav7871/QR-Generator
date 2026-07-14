const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrBox = document.getElementById("qr-box");
const qrImage = document.getElementById("qr-image");
const downloadBtn = document.getElementById("download-btn");
const copyBtn = document.getElementById("copy-btn");

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

  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(textValue)}`;

  qrImage.src = apiUrl;

  qrImage.onload = () => {
    qrBox.classList.remove("hidden");
    generateBtn.innerText = "Generate QR Code";
    generateBtn.style.opacity = "1";
    generateBtn.style.pointerEvents = "auto";

    // SMOOTH AUTO-SCROLL WINDOW INTERACTION MECHANISM
    setTimeout(() => {
      qrBox.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 120);
  };
});

// Premium Download Handler Script
downloadBtn.addEventListener("click", async () => {
  try {
    downloadBtn.innerText = "Downloading...";
    const response = await fetch(qrImage.src);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "qr-studio-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    downloadBtn.innerText = "Download QR";
  } catch (error) {
    downloadBtn.innerText = "Download QR";
    alert(
      "Direct download blocked. Simply right-click the QR image to save it!",
    );
  }
});

// PREMIUM SYSTEM IMAGE COPY TO CLIPBOARD API MECHANISM
copyBtn.addEventListener("click", async () => {
  try {
    copyBtn.innerText = "Copying...";

    // Fetch the target graphic directly from the API endpoint
    const response = await fetch(qrImage.src);
    const blob = await response.blob();

    // Write binary stream directly to user system clipboard item
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    copyBtn.innerText = "Copied! ✓";
    setTimeout(() => (copyBtn.innerText = "Copy Image"), 2000);
  } catch (error) {
    copyBtn.innerText = "Failed ❌";
    setTimeout(() => (copyBtn.innerText = "Copy Image"), 2000);
    alert(
      "Browser system blocked direct graphic copy. Try right-clicking image to copy!",
    );
  }
});
