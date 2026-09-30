document.addEventListener("DOMContentLoaded", () => {
  // --- Efek Mengetik & Menghapus Berulang untuk Hero Title ---
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const textFull = "Halo, Saya Ikki!";
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      if (!isDeleting) {
        // Proses Mengetik
        typingElement.textContent = textFull.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === textFull.length) {
          // Ketika sudah full, tunggu selama 2 detik sebelum mulai menghapus
          setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 2000);
          return;
        }
        setTimeout(typeEffect, 120); // Kecepatan mengetik
      } else {
        // Proses Menghapus satu per satu
        typingElement.textContent = textFull.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          setTimeout(typeEffect, 500); // Jeda sebentar sebelum mengetik ulang
          return;
        }
        setTimeout(typeEffect, 70); // Kecepatan menghapus
      }
    }

    typeEffect();
  }

  // --- Back To Top Logic ---
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- Galeri Slider Logic ---
  const slider = document.getElementById("gallerySlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (slider && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = slider.querySelectorAll(".cert-card");
    const totalCards = cards.length;

    function getVisibleCards() {
      return window.innerWidth >= 768 ? 2 : 1;
    }

    function updateSliderPosition() {
      const visibleCards = getVisibleCards();
      const maxIndex = totalCards - visibleCards;

      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      const cardWidth = cards[0].getBoundingClientRect().width + 20; // 20px gap
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
      const visibleCards = getVisibleCards();
      if (currentIndex < totalCards - visibleCards) {
        currentIndex++;
        updateSliderPosition();
      } else {
        currentIndex = 0; // Loop kembali ke awal
        updateSliderPosition();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      } else {
        const visibleCards = getVisibleCards();
        currentIndex = totalCards - visibleCards; // Ke slide terakhir
        updateSliderPosition();
      }
    });

    window.addEventListener("resize", updateSliderPosition);
  }
});

// --- Toggle Dark / Light Mode ---
const themeToggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      themeToggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      themeToggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  });
}
