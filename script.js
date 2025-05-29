window.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const qrCanvas = document.getElementById("qrCanvas");
    const ctx = qrCanvas.getContext("2d");

    generateBtn.addEventListener("click", () => {
        const text = document.getElementById("text").value.trim();
        if (!text) {
            alert("Iltimos, matn yoki URL kiriting.");
            return;
        }

        const size = 200;
        qrCanvas.width = size;
        qrCanvas.height = size;

        // QR kod URL (tashqi API)
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=${size}x${size}`;

        // Rasmi yuklab olib, canvasga chizamiz
        const img = new Image();
        // CORS uchun:
        img.crossOrigin = "anonymous";

        img.onload = () => {
            ctx.clearRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);
        };

        img.onerror = () => {
            alert("QR kodni yuklashda xatolik yuz berdi.");
        };

        img.src = qrUrl;
    });

    downloadBtn.addEventListener("click", () => {
        if (qrCanvas.width === 0 || qrCanvas.height === 0) {
            alert("Avval QR kod yarating.");
            return;
        }

        // Canvasni PNG sifatida saqlash
        const link = document.createElement("a");
        link.href = qrCanvas.toDataURL("image/png");
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
