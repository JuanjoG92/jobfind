// app.js — JobFind Latam
window.addEventListener('scroll',()=>{const n=document.getElementById('mainNav');if(n)n.classList.toggle('scrolled',window.scrollY>60)});
function toggleLang(){document.getElementById('langMenu')?.classList.toggle('open')}
document.addEventListener('click',e=>{const m=document.getElementById('langMenu');if(m&&!e.target.closest('.lang-selector'))m.classList.remove('open')});
let curLang=localStorage.getItem('jobfind_lang')||'es';
function setLang(l){curLang=l;localStorage.setItem('jobfind_lang',l);const el=document.getElementById('curLang');if(el)el.textContent=l.toUpperCase();document.documentElement.lang=l;document.getElementById('langMenu')?.classList.remove('open')}
document.addEventListener('DOMContentLoaded',()=>setLang(curLang));

function submitCV(e){
  e.preventDefault();
  const btn=document.getElementById('submitBtn');
  const msg=document.getElementById('formMsg');
  btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Enviando...';

  const dests=[];document.querySelectorAll('input[name="dest"]:checked').forEach(c=>dests.push(c.value));
  const traits=[];document.querySelectorAll('input[name="trait"]:checked').forEach(c=>traits.push(c.value));

  if(dests.length===0){
    msg.style.display='block';msg.className='form-msg error';msg.textContent='Seleccioná al menos un destino.';
    btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Enviar mi CV';return;
  }

  const data={
    fullName:document.getElementById('fullName').value,
    age:document.getElementById('age').value,
    idNumber:document.getElementById('idNumber').value,
    country:document.getElementById('country').value,
    email:document.getElementById('email').value,
    whatsapp:document.getElementById('whatsapp').value,
    qualification:document.getElementById('qualification').value,
    sector:document.getElementById('sector').value,
    experience:document.getElementById('experience').value,
    criminal:document.getElementById('criminal').value,
    criminalDesc:document.getElementById('criminalDesc').value,
    destinations:dests,
    description:document.getElementById('description').value,
    traits:traits,
    submittedAt:new Date().toISOString()
  };

  // Store locally (for now — later connect to backend)
  const cvs=JSON.parse(localStorage.getItem('jobfind_cvs')||'[]');
  cvs.push(data);
  localStorage.setItem('jobfind_cvs',JSON.stringify(cvs));

  msg.style.display='block';msg.className='form-msg success';
  msg.textContent='¡CV enviado exitosamente! Nos pondremos en contacto pronto. ¡Buena suerte!';
  btn.innerHTML='<i class="fas fa-check"></i> Enviado';
  document.getElementById('cvForm').reset();

  setTimeout(()=>{btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Enviar mi CV'},4000);
}
