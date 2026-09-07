(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  $('#year').textContent = new Date().getFullYear();
  const date = $('#date');
  if (date) date.min = new Date().toISOString().split('T')[0];
  const nav = $('.nav nav');
  $('.menu-toggle')?.addEventListener('click', () => nav?.classList.toggle('open'));
  $$('nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
  const menuModal = $('#menuModal'), imageModal = $('#imageModal'), modalImg = $('#modalImg');
  const closeModal = modal => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); };
  const openModal = modal => { modal?.classList.add('open'); modal?.setAttribute('aria-hidden','false'); };
  $('#viewMenu')?.addEventListener('click', () => openModal(menuModal));
  $$('[data-close]').forEach(btn => btn.addEventListener('click', () => closeModal(btn.closest('.modal'))));
  [menuModal, imageModal].forEach(m => m?.addEventListener('click', e => { if (e.target === m) closeModal(m); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(menuModal); closeModal(imageModal); } });
  $$('.gallery-item').forEach(item => item.addEventListener('click', () => {
    const src = item.dataset.img || $('img', item)?.src;
    if (src && modalImg) { modalImg.src = src; openModal(imageModal); }
  }));
  $('#reservationForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#name').value.trim(), guests = $('#guests').value, d = $('#date').value, t = $('#time').value, notes = $('#notes').value.trim();
    if (!name || !d || !t) return;
    const msg = `Hello Taste Of Fire, I'd like to request a table.%0A%0AName: ${encodeURIComponent(name)}%0AGuests: ${encodeURIComponent(guests)}%0ADate: ${encodeURIComponent(d)}%0ATime: ${encodeURIComponent(t)}%0ANotes: ${encodeURIComponent(notes || 'None')}`;
    window.open(`https://wa.me/919044474845?text=${msg}`, '_blank', 'noopener,noreferrer');
  });
})();
