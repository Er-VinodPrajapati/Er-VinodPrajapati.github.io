// ===================== MOBILE MENU =====================
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
  });
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===================== NAVBAR SHADOW ON SCROLL =====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 2px 24px rgba(0, 0, 0, 0.5)'
    : 'none';
});

// ===================== SCROLL REVEAL =====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ===================== NUMBER COUNT-UP =====================
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// ===================== TYPEWRITER EFFECT =====================
const typeEl = document.querySelector('.typewriter');
if (typeEl) {
  const words = JSON.parse(typeEl.dataset.words);
  let wordIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const word = words[wordIdx];
    typeEl.textContent = word.substring(0, charIdx);

    if (!deleting && charIdx < word.length) {
      charIdx++;
      setTimeout(tick, 70);
    } else if (deleting && charIdx > 0) {
      charIdx--;
      setTimeout(tick, 35);
    } else {
      if (!deleting) {
        deleting = true;
        setTimeout(tick, 1800);
      } else {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(tick, 300);
      }
    }
  }
  setTimeout(tick, 800);
}

// ===================== SUBTLE PARALLAX ON HERO GLOW =====================
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.bg-glow').forEach((glow, i) => {
    const factor = i === 0 ? 1 : -1;
    glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});