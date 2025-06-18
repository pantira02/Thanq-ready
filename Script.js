document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const phone = form.phone.value;
  const price = form.price.value;
  const jobtype = form.jobtype.value;
  const imageFile = document.getElementById("image").files[0];

  let imageUrl = "";
  if (imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch("https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    imageUrl = data.data.url;
  }

  // ส่งข้อมูลไป Google Apps Script
  const payload = {
    name,
    phone,
    price,
    jobtype,
    image: imageUrl
  };

  await fetch("https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_URL/exec", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  alert("ส่งข้อมูลเรียบร้อยแล้ว");
  form.reset();
});
