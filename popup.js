// DOM Elements
const views = {
  list: document.getElementById('view-list'),
  add: document.getElementById('view-add')
};
const navs = {
  list: document.getElementById('nav-list'),
  add: document.getElementById('nav-add')
};
const addForm = document.getElementById('add-form');
const passwordListContainer = document.getElementById('password-list');
const searchInput = document.getElementById('search-input');

// State
let passwords = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPasswords();
  setupNavigation();
});

// Navigation Logic
function setupNavigation() {
  navs.list.addEventListener('click', () => switchView('list'));
  navs.add.addEventListener('click', () => switchView('add'));
}

function switchView(viewName) {
  // Update Nav
  Object.values(navs).forEach(el => el.classList.remove('active'));
  navs[viewName].classList.add('active');

  // Update View
  Object.values(views).forEach(el => el.classList.remove('active'));
  views[viewName].classList.add('active');

  if (viewName === 'list') {
    renderPasswords();
  }
}

// Data Logic
function loadPasswords() {
  chrome.storage.local.get(['passwords'], (result) => {
    passwords = result.passwords || [];
    renderPasswords();
  });
}

function savePassword(newPassword) {
  passwords.push({
    id: Date.now().toString(),
    ...newPassword,
    created_at: new Date().toISOString()
  });

  chrome.storage.local.set({ passwords: passwords }, () => {
    addForm.reset();
    switchView('list');
    // Optional: Show success feedback
  });
}

function deletePassword(id) {
  if (confirm('Bu şifreyi silmek istediğinize emin misiniz?')) {
    passwords = passwords.filter(p => p.id !== id);
    chrome.storage.local.set({ passwords: passwords }, () => {
      renderPasswords();
    });
  }
}

// Form Handlers
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const passwordData = {
    website: document.getElementById('website').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  savePassword(passwordData);
});

// Search Handler
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  renderPasswords(query);
});

// Rendering
function renderPasswords(filter = '') {
  passwordListContainer.innerHTML = '';

  const filtered = passwords.filter(p =>
    p.website.toLowerCase().includes(filter) ||
    p.username.toLowerCase().includes(filter)
  );

  if (filtered.length === 0) {
    passwordListContainer.innerHTML = '<div class="empty-state">Kayıtlı şifre bulunamadı.</div>';
    return;
  }

  filtered.forEach(p => {
    const el = document.createElement('div');
    el.className = 'password-item';
    el.innerHTML = `
      <div class="password-header">
        <span>${escapeHtml(p.website)}</span>
        <button class="btn-sm btn-danger delete-btn" data-id="${p.id}">Sil</button>
      </div>
      <div class="password-detail">
        <span>${escapeHtml(p.username)}</span>
      </div>
      <div class="actions">
        <button class="btn-sm fill-btn" style="background-color: var(--primary); color: white; border:none;" 
          data-user="${escapeHtml(p.username)}" data-pass="${escapeHtml(p.password)}">
          Otomatik Doldur
        </button>
        <button class="btn-sm copy-btn" data-text="${escapeHtml(p.password)}">Şifre Kopyala</button>
      </div>
    `;
    passwordListContainer.appendChild(el);
  });

  // Attach Listeners to dynamic elements
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => deletePassword(e.target.dataset.id));
  });

  document.querySelectorAll('.fill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const { user, pass } = e.target.dataset;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "fill_creds",
          username: user,
          password: pass
        }, function (response) {
          if (chrome.runtime.lastError) {
            console.log("Error sending message: ", chrome.runtime.lastError);
            alert("Sayfa veya form bulunamadı. Lütfen sayfayı yenileyin.");
          } else if (response && response.status === 'success') {
            window.close(); // Close popup on success
          } else {
            alert("Şifre alanı bulunamadı.");
          }
        });
      });
    });
  });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      copyToClipboard(e.target.dataset.text);
      const originalText = e.target.innerText;
      e.target.innerText = 'Kopyalandı!';
      setTimeout(() => e.target.innerText = originalText, 1500);
    });
  });
}

// Utilities
function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
    console.error('Kopyalama hatası:', err);
  });
}
