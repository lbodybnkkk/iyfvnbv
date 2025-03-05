document.addEventListener("DOMContentLoaded", function () {
    const uploadBtn = document.getElementById("upload-btn");
    const fileInput = document.getElementById("file-input");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const enhanceBtn = document.getElementById("enhance-btn");
    const downloadBtn = document.getElementById("download-btn");
    let img = new Image();

    // تعطيل التحقق من الاشتراك والتسجيل
    const userIsSubscribed = true;
    const isPaidUser = true;
    const userHasActiveSubscription = true;

    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    document.getElementById("preview").src = canvas.toDataURL();
                    document.getElementById("preview").style.display = "block";
                    enhanceBtn.style.display = "inline-block";
                };
            };
            reader.readAsDataURL(file);
        }
    });

    enhanceBtn.addEventListener("click", () => {
        enhanceImage();
        downloadBtn.style.display = "inline-block";
    });

    function enhanceImage() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.2); // تحسين اللون الأحمر
            data[i + 1] = Math.min(255, data[i + 1] * 1.2); // تحسين اللون الأخضر
            data[i + 2] = Math.min(255, data[i + 2] * 1.2); // تحسين اللون الأزرق
        }

        ctx.putImageData(imageData, 0, 0);
        downloadBtn.href = canvas.toDataURL("image/png");
    }

    // تعطيل أي إعادة توجيه لصفحات الاشتراك
    window.location.href = "#";
});
