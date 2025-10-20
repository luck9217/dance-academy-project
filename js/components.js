// Set favicon with theme background using canvas
function setFaviconWithBg() {
  // Remove any existing favicon links
  document
    .querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
    .forEach((el) => el.remove());

  // Helper to create favicon with background (matches navbar/footer logo style)
  function createFavicon(src, size, bgColor) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    // Draw circular background
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();
    // Subtle gray border like the navbar logo container
    ctx.strokeStyle = "#e5e7eb"; // gray-200
    ctx.lineWidth = Math.max(1, Math.round(size * 0.06)); // ~1px at 16, ~2px at 32
    ctx.stroke();
    ctx.restore();
    // Draw image (centered, clipped to circle)
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, (size / 2) * 0.85, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    const img = new window.Image();
    img.src = src;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, size, size);
      ctx.restore();
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.sizes = `${size}x${size}`;
      link.href = canvas.toDataURL("image/png");
      document.head.appendChild(link);
    };
  }

  // Use white background to match the simplified logo design
  const themeColor = "#ffffff"; // white
  createFavicon("images/logo/favicon-16x16.png", 16, themeColor);
  createFavicon("images/logo/favicon-32x32.png", 32, themeColor);

  // Set theme color for browser UI
  let themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) {
    themeMeta = document.createElement("meta");
    themeMeta.name = "theme-color";
    document.head.appendChild(themeMeta);
  }
  themeMeta.content = themeColor;
}

document.addEventListener("DOMContentLoaded", setFaviconWithBg);
// Navigation Component (keeping as is)
const NavigationComponent = {
  template: `
    <nav class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex items-center space-x-4">
                    <a href="index.html" class="focus:outline-none">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            <img src="images/logo/logo.png" alt="Rasika Dance Academy Logo" class="w-12 h-12 object-contain" />
                        </div>
                    </a>
                    <div>
                        <h2 class="text-2xl font-serif font-bold flex items-center gap-2">
                            <span class="text-primary-600">Rasika</span>
                            <span class="text-2xl text-gray-400 font-normal">|</span>
                            <span class="text-gray-700">Dance Academy</span>
                        </h2>
                    </div>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-6">
                    <a href="index.html" class="nav-link" data-page="home">Home</a>
                    <a href="manjula.html" class="nav-link" data-page="manjula">Manjula</a>
                    <a href="gallery.html" class="nav-link" data-page="gallery">Gallery</a>
                    <a href="arangetram.html" class="nav-link" data-page="arangetram">Arangetram</a>
                    <a href="shows.html" class="nav-link" data-page="shows">Shows</a>
                    <a href="videos.html" class="nav-link" data-page="videos">Videos</a>
                    <a href="media-charity.html" class="nav-link" data-page="media">Media & Charity</a>
                    <a href="index.html#contact" class="bg-gradient-to-r from-primary-500 to-rose-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300" data-page="contact">Contact</a>
                </div>

                <!-- Mobile Menu Button -->
                <div class="md:hidden">
                    <button id="mobile-menu-button" class="text-gray-700 hover:text-primary-600">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="md:hidden bg-white border-t hidden">
            <div class="px-4 py-2 space-y-2">
                <a href="index.html" class="mobile-nav-link" data-page="home">Home</a>
                <a href="manjula.html" class="mobile-nav-link" data-page="manjula">Manjula</a>
                <a href="gallery.html" class="mobile-nav-link" data-page="gallery">Gallery</a>
                <a href="arangetram.html" class="mobile-nav-link" data-page="arangetram">Arangetram</a>
                <a href="shows.html" class="mobile-nav-link" data-page="shows">Shows</a>
                <a href="videos.html" class="mobile-nav-link" data-page="videos">Videos</a>
                <a href="media-charity.html" class="mobile-nav-link" data-page="media">Media & Charity</a>
                <a href="index.html#contact" class="mobile-nav-link" data-page="contact">Contact</a>
            </div>
        </div>
    </nav>`,

  init: function (activePage = "home") {
    // Set active page styling for desktop
    setTimeout(() => {
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        if (link.dataset.page === activePage) {
          link.className =
            "text-primary-600 border-b-2 border-primary-600 font-medium transition-colors";
        } else {
          link.className =
            "text-gray-700 hover:text-primary-600 font-medium transition-colors";
        }
      });
      // Set active page styling for mobile
      const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
      mobileNavLinks.forEach((link) => {
        if (link.dataset.page === activePage) {
          link.className = "block py-2 text-primary-600 font-medium";
        } else {
          link.className = "block py-2 text-gray-700 hover:text-primary-600";
        }
      });
    }, 0);

    // Mobile menu functionality
    setTimeout(() => {
      const mobileMenuButton = document.getElementById("mobile-menu-button");
      const mobileMenu = document.getElementById("mobile-menu");

      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });
      }
    }, 0);

    // Navbar background change on scroll
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector("nav");
      if (window.scrollY > 50) {
        navbar.classList.add("bg-white/98");
        navbar.classList.remove("bg-white/95");
      } else {
        navbar.classList.add("bg-white/95");
        navbar.classList.remove("bg-white/98");
      }
    });
  },
};

// Updated Footer Component to match navbar logo
const FooterComponent = {
  template: `
    <footer class="text-white py-16" style="background-color: #c2185b;">
        <div class="max-w-6xl mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="col-span-2">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <img src="images/logo/logo.png" alt="Rasika Dance Academy Logo" class="w-12 h-12 object-contain" />
                        </div>
                        <div>
                            <h3 class="text-2xl font-serif font-bold text-white">Rasika Dance Academy</h3>
                            <p class="text-white">Where Art Meets Soul</p>
                        </div>
                    </div>
                    <p class="text-white mb-6">
                        Preserving the sacred tradition of Indian classical dance while nurturing the next generation of artists through dedicated training and spiritual guidance.
                    </p>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="index.html" class="text-white hover:text-primary-400 transition-colors">Home</a></li>
                        <li><a href="manjula.html" class="text-white hover:text-primary-400 transition-colors">Manjula</a></li>
                        <li><a href="index.html" class="text-white hover:text-primary-400 transition-colors">Gallery</a></li>
                        <li><a href="arangetram.html" class="text-white hover:text-primary-400 transition-colors">Arangetram</a></li>
                        <li><a href="shows.html" class="text-white hover:text-primary-400 transition-colors">Shows</a></li>
                        <li><a href="videos.html" class="text-white hover:text-primary-400 transition-colors">Videos</a></li>
                        <li><a href="media-charity.html" class="text-white hover:text-primary-400 transition-colors">Media & Charity</a></li>
                        <li><a href="index.html#contact" class="text-white hover:text-primary-400 transition-colors">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-white">Connect</h4>
                    <div class="space-y-3 mb-4">
                        <p class="text-white text-sm">
                            <i class="fas fa-phone mr-2"></i>0433 005 131
                        </p>
                    </div>
                    <div class="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=100063549374638" target="_blank" class="text-gray-300 hover:text-primary-400 transition-colors" title="Follow us on Facebook">
                            <i class="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="https://www.youtube.com/c/RasikaDanceAcademy" target="_blank" class="text-gray-300 hover:text-primary-400 transition-colors" title="Subscribe to our YouTube">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="https://www.instagram.com/Rasikadanceacademy/" target="_blank" class="text-gray-300 hover:text-primary-400 transition-colors" title="Follow us on Instagram">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
    </footer>`,

  init: function () {
    // Add any footer-specific functionality here if needed
  },
};

// Rest of your component loader code stays the same...
function loadComponent(componentName, containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id '${containerId}' not found`);
    return;
  }

  let component;
  switch (componentName) {
    case "navigation":
      component = NavigationComponent;
      break;
    case "footer":
      component = FooterComponent;
      break;
    default:
      console.error(`Component '${componentName}' not found`);
      return;
  }

  container.innerHTML = component.template;
  if (component.init) {
    component.init(options.activePage);
  }
}

// Auto-load components on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  // Load navigation if container exists
  if (document.getElementById("navigation-container")) {
    const activePage = document.body.dataset.page || "home";
    loadComponent("navigation", "navigation-container", { activePage });
  }

  // Load footer if container exists
  if (document.getElementById("footer-container")) {
    loadComponent("footer", "footer-container");
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Gallery hover effects
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});
