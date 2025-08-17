const genQr = () => {
    const inpValue = document.getElementById('inpValue');
    const qrImage = document.getElementById('qrImage');
    const info = document.getElementById('info');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (inpValue.value.trim() === '') {
        alert('Please enter some text to generate QR code');
        inpValue.focus();
        return;
    }
    
    qrImage.style.display = 'none';
    info.style.display = 'none';
    downloadBtn.style.display = 'none';
    
    const encodedData = encodeURIComponent(inpValue.value.trim());
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedData}&ecc=M`;
    
    const tempImg = new Image();
    tempImg.onload = function() {
        qrImage.src = this.src;
        qrImage.style.display = 'block';
        info.style.display = 'block';
        downloadBtn.style.display = 'inline-block';
    };
    
    tempImg.onerror = function() {
        alert('Failed to generate QR code. Please try again.');
    };
    
    tempImg.src = qrUrl;
};

const downloadQRCode = () => {
    const qrImage = document.getElementById('qrImage');
    
    if (qrImage.src) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = `qr-code-${Date.now()}.png`;
        link.target = '_blank';
        link.click();
    }
};
