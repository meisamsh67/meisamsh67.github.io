const modal = document.getElementById('modal')
const reqBtn = document.getElementById('reqBtn')
const close = document.getElementById('close')
const locBtn = document.getElementById('locBtn')
const form = document.getElementById('helpForm')

reqBtn.addEventListener('click', ()=> modal.classList.remove('hidden'))
close.addEventListener('click', ()=> modal.classList.add('hidden'))

locBtn.addEventListener('click', ()=>{
  if(!navigator.geolocation){ alert('مرورگر شما از لوکیشن پشتیبانی نمی‌کند') ; return}
  locBtn.textContent = 'در حال پیدا کردن...'
  navigator.geolocation.getCurrentPosition(pos=>{
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const textarea = form.querySelector('textarea')
    textarea.value = `لوکیشن: https://maps.google.com?q=${lat},${lon}`
    locBtn.textContent = 'لوکیشن ارسال شد'
  }, err=>{
    alert('خطا در دریافت لوکیشن: '+err.message)
    locBtn.textContent = 'ارسال لوکیشن'
  })
})

form.addEventListener('submit', e=>{
  e.preventDefault()
  const data = new FormData(form)
  const payload = {}
  data.forEach((v,k)=> payload[k]=v)
  // در این قالب نمونه فقط یک alert می‌دهیم؛ در پروژه واقعی باید این داده را به سرور ارسال یا در واتساپ بازش کنید
  alert('درخواست شما ثبت شد:\n' + JSON.stringify(payload,null,2))
  modal.classList.add('hidden')
  form.reset()
})
