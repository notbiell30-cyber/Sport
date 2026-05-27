// SportZone — Product Mock Data
const products = [
  { id: "1", name: "Strike Pro Elite FG", category: "Chuteira de Campo", price: 899.9, oldPrice: 1199.9, image: "assets/product-1.jpg", tag: "Novo" },
  { id: "2", name: "AirFlow Runner X", category: "Tênis de Corrida", price: 549.9, image: "assets/product-2.jpg" },
  { id: "3", name: "Phantom Velocity", category: "Chuteira de Campo", price: 749.9, oldPrice: 899.9, image: "assets/product-3.jpg", tag: "Top" },
  { id: "4", name: "Sky Dunk High", category: "Basquete", price: 999.9, image: "assets/product-4.jpg", tag: "Exclusivo" },
  { id: "5", name: "Tiger Strike FG", category: "Chuteira de Campo", price: 679.9, image: "assets/product-5.jpg" },
  { id: "6", name: "Pulse Trainer", category: "Tênis de Treino", price: 459.9, oldPrice: 599.9, image: "assets/product-6.jpg" },
];

// Formatting helper
const fmt = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Cart Logic (using localStorage)
const CART_KEY = "sportzone_cart";

function getCart() { 
  try { 
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); 
  } catch { 
    return []; 
  } 
}

function setCart(c) { 
  localStorage.setItem(CART_KEY, JSON.stringify(c)); 
  updateCartBadge(); 
}

function addToCart(id) {
  const c = getCart(); 
  c.push(id); 
  setCart(c);
  
  const el = document.querySelector(`[data-add="${id}"]`);
  if (el) { 
    const t = el.textContent; 
    el.textContent = "Adicionado ✓"; 
    setTimeout(() => el.textContent = t, 1200); 
  }
}

function updateCartBadge() {
  const b = document.getElementById("cart-badge");
  if (!b) return;
  const n = getCart().length;
  b.textContent = n;
  b.style.display = n ? "grid" : "none";
}

// Dynamically Render Products Grid
function renderProducts() {
  const grid = document.getElementById("products");
  if (!grid) return;
  
  grid.innerHTML = products.map(p => `
    <article class="card">
      <div class="card-img">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        <button class="heart" aria-label="Favoritar">${icon("heart")}</button>
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
      </div>
      <div class="card-body">
        <p class="card-cat">${p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${fmt(p.oldPrice)}</span>` : ""}
        </div>
        <button class="btn btn-primary btn-block" data-add="${p.id}" onclick="addToCart('${p.id}')">Comprar agora</button>
      </div>
    </article>
  `).join("");
}

// Icons Map Helper
function icon(name) {
  const i = {
    heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  };
  return i[name] || "";
}

// DOM Init Execution
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartBadge();

  // Handle Auth Form View Toggling (Login / Sign up)
  const toggle = document.getElementById("mode-toggle");
  if (toggle) {
    let mode = "login";
    const t = document.getElementById("title");
    const s = document.getElementById("subtitle");
    const submit = document.getElementById("submit-btn");
    const altText = document.getElementById("alt-text");
    const nameField = document.getElementById("name-field");
    
    toggle.addEventListener("click", () => {
      mode = mode === "login" ? "signup" : "login";
      t.textContent = mode === "login" ? "Bem-vindo de volta" : "Crie sua conta";
      s.textContent = mode === "login" ? "Entre para continuar suas compras." : "Cadastre-se em segundos e ganhe 10% off.";
      submit.firstChild.textContent = mode === "login" ? "Entrar " : "Criar conta ";
      altText.textContent = mode === "login" ? "Não tem conta? " : "Já tem conta? ";
      toggle.textContent = mode === "login" ? "Criar agora" : "Entrar";
      nameField.classList.toggle("hidden", mode === "login");
    });
  }

  // Password Visibility Toggle Logic
  const eye = document.getElementById("toggle-pw");
  if (eye) {
    eye.addEventListener("click", () => {
      const pw = document.getElementById("password");
      pw.type = pw.type === "password" ? "text" : "password";
    });
  }

  // Global Demo Form Validation Intercept
  document.querySelectorAll("form").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    alert("Demo: O sistema de autenticação está offline.");
  }));
});
