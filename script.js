// Tiny demo interactivity
document.querySelectorAll('.card .title').forEach((el, i) => {
  el.textContent = `$TOKEN${i+1}`;
});