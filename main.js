lucide.createIcons();

const toggleBtn = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconContainer = document.getElementById("menu-icon-container");

let isMenuOpen = false;

if (toggleBtn && mobileMenu && menuIconContainer) {
	toggleBtn.addEventListener("click", () => {
		isMenuOpen = !isMenuOpen;

		if (isMenuOpen) {
			mobileMenu.classList.remove("hidden");
			menuIconContainer.innerHTML = '<i data-lucide="x"></i>';
		} else {
			mobileMenu.classList.add("hidden");
			menuIconContainer.innerHTML = '<i data-lucide="menu"></i>';
		}

		lucide.createIcons({ root: menuIconContainer });
	});

	document.querySelectorAll(".mobile-link").forEach((link) => {
		link.addEventListener("click", () => {
			isMenuOpen = false;
			mobileMenu.classList.add("hidden");
			menuIconContainer.innerHTML = '<i data-lucide="menu"></i>';
			lucide.createIcons({ root: menuIconContainer });
		});
	});
}

const observerOptions = {
	root: null,
	rootMargin: "0px 0px -50px 0px",
	threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("is-visible");
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

document.querySelectorAll(".fade-in-section").forEach((section) => {
	observer.observe(section);
});
