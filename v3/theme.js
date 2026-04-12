export function initTheme() {
  const saved = localStorage.getItem('debuggTheme') || 'dark';
  applyTheme(saved);
  return saved;
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('debuggTheme', next);
  return next;
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
  });
}