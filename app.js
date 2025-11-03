// ضع هنا رابط Web App الخاص بـ Google Apps Script بعد نشره
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxLnD9Jfb3H04_Mf-5VH69UIvd91A13wkEviBqHO02ptGQeEnSm5--3mlrlD2m4IMR5/exec";

function generateCode(len = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const regenBtn = document.getElementById("regenCodeBtn");
  const codeInput = document.getElementById("studentCode");
  const status = document.getElementById("status");

  // توليد كود تلقائي عند التحميل
  codeInput.value = generateCode();

  regenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    codeInput.value = generateCode();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "جاري الإرسال...";

    // جمع القيم
    const data = {
      studentType: document.getElementById("studentType").value,
      studentCode: document.getElementById("studentCode").value.trim().toUpperCase(),
      fullName: document.getElementById("fullName").value.trim(),
      gender: document.querySelector('input[name="gender"]:checked').value,
      birthDate: document.getElementById("birthDate").value, // بصيغة yyyy-mm-dd
      stage: document.getElementById("stage").value,
      phone: document.getElementById("phone").value.trim(),
      whatsapp: document.getElementById("whatsapp").value.trim(),
      classLetter: document.getElementById("classLetter").value.trim().toUpperCase(),
      centerClass: document.getElementById("centerClass").value,
      rank: document.getElementById("rank").value,
      address: document.getElementById("address").value.trim(),
      formCheckbox: document.getElementById("formCheckbox").checked ? "TRUE" : "FALSE",
      photoCheckbox: document.getElementById("photoCheckbox").checked ? "TRUE" : "FALSE",
      feeCheckbox: document.getElementById("feeCheckbox").checked ? "TRUE" : "FALSE"
    };

    // تحقق بسيط
    if (!data.fullName) {
      status.textContent = "الرجاء إدخال اسم الدارس.";
      return;
    }

    try {
      const res = await fetch(WEBAPP_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      if (result && result.status === "success") {
        status.textContent = "تم التسجيل بنجاح ✅";
        form.reset();
        codeInput.value = generateCode();
      } else {
        console.error("response:", result);
        status.textContent = "حدث خطأ أثناء الإرسال. راجع إعدادات Web App.";
      }
    } catch (err) {
      console.error(err);
      status.textContent = "خطأ في الاتصال. تأكد من رابط Web App وإعدادات النشر.";
    }
  });
});
