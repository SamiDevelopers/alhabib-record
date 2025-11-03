const scriptURL = "https://script.google.com/macros/s/AKfycbxOuOBPevjWg_Gd842YRPgWu9qpcIW_hZJY5Bynf2RJBcz3cjMtZIdJa4QRdUJINLA/exec"; // استبدله بالرابط الجديد بعد إعادة النشر

const form = document.getElementById("studentForm");
const responseMsg = document.getElementById("responseMessage");

// توليد كود فريد
document.getElementById("generateCode").addEventListener("click", () => {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  document.getElementById("studentCode").value = code;
});

// عند إرسال النموذج
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    studentType: document.getElementById("studentType").value,
    studentCode: document.getElementById("studentCode").value,
    fullName: document.getElementById("fullName").value,
    gender: document.querySelector('input[name="gender"]:checked')?.value || "",
    birthDate: document.getElementById("birthDate").value,
    stage: document.getElementById("stage").value,
    phone: document.getElementById("phone").value,
    whatsapp: document.getElementById("whatsapp").value,
    classLetter: document.getElementById("classLetter").value,
    centerClass: document.getElementById("centerClass").value,
    rank: document.getElementById("rank").value,
    address: document.getElementById("address").value,
    formCheckbox: document.getElementById("formCheckbox").checked,
    photoCheckbox: document.getElementById("photoCheckbox").checked,
    feeCheckbox: document.getElementById("feeCheckbox").checked,
  };

  responseMsg.textContent = "⏳ جاري الإرسال...";
  responseMsg.style.color = "#7d1717";

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
  .then((res) => res.json())
  .then(() => {
    responseMsg.textContent = "✅ تم تسجيل البيانات بنجاح";
    responseMsg.style.color = "green";
    form.reset();
  })
  .catch((err) => {
    console.error(err);
    responseMsg.textContent = "❌ خطأ في الاتصال. تأكد من رابط Web App وإعدادات النشر.";
    responseMsg.style.color = "red";
  });
});
