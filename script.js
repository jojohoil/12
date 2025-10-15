// تعبئة المعاينة
document.getElementById('generate').addEventListener('click', () => {
  const op = document.getElementById('operation').value.trim();
  const type = document.getElementById('type').value.trim();
  const name = document.getElementById('name').value.trim();
  const area = document.getElementById('area').value.trim();
  const price = document.getElementById('price').value.trim();
  const details = document.getElementById('details').value.trim();
  const location = document.getElementById('location').value.trim();
  const imageInput = document.getElementById('image');

  if (!op || !type || !name || !imageInput.files.length) {
    alert('الرجاء تعبئة العملية، نوع العقار، اسم العقار، وصورة العقار.');
    return;
  }

  // نص الشريط العلوي
  document.getElementById('outOperation').textContent = op;
  document.getElementById('outType').textContent = type;
  document.getElementById('outName').textContent = name;

  // المساحة والسعر والتفاصيل
  document.getElementById('outArea').textContent = area || '-';
  document.getElementById('outPrice').textContent = price || '-';
  document.getElementById('detailsText').textContent = details || '';

  // صورة العقار
  const reader = new FileReader();
  reader.onload = e => { document.getElementById('outImage').src = e.target.result; };
  reader.readAsDataURL(imageInput.files[0]);

  // QR
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';
  if (location) {
    new QRCode(qrContainer, { text: location, width: 110, height: 110, correctLevel: QRCode.CorrectLevel.M });
  }

  document.getElementById('preview').classList.remove('hidden');
});

// تنزيل الصورة
document.getElementById('download').addEventListener('click', async () => {
  const node = document.getElementById('adCard');
  const canvas = await html2canvas(node, { scale: 2 });
  const link = document.createElement('a');
  link.download = 'إعلان_عقاري_بوصال.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// مشاركة (إن توفرت واجهة الويب للمشاركة)
document.getElementById('share').addEventListener('click', async () => {
  const node = document.getElementById('adCard');
  const canvas = await html2canvas(node, { scale: 2 });
  canvas.toBlob(async blob => {
    const file = new File([blob], 'إعلان_عقاري_بوصال.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'إعلان عقاري', text: 'تم إنشاء الإعلان بواسطة بوصال العقارية' });
    } else {
      alert('المشاركة المباشرة غير مدعومة على هذا الجهاز. استخدم زر التنزيل.');
    }
  });
});
