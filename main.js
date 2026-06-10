lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
	const headerHost = document.getElementById("site-header");
	const footerHost = document.getElementById("site-footer");

	if (headerHost) {
		headerHost.innerHTML = getHeaderMarkup();
	}

	if (footerHost) {
		footerHost.innerHTML = getFooterMarkup();
	}

	initMobileMenu();
	initRevealAnimations();

	if (window.lucide) {
		window.lucide.createIcons();
	}
});

function initMobileMenu() {
	const toggleBtn = document.getElementById("mobile-menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");
	const menuIconContainer = document.getElementById("menu-icon-container");

	if (!toggleBtn || !mobileMenu || !menuIconContainer) {
		return;
	}

	let isMenuOpen = false;

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

function initRevealAnimations() {
	const sections = Array.from(document.querySelectorAll(".fade-in-section"));
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;

	if (prefersReducedMotion) {
		sections.forEach((section) => section.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const section = entry.target;
				const staggerChildren = section.dataset.staggerChildren === "true";

				if (staggerChildren) {
					Array.from(section.children).forEach((child, childIndex) => {
						child.style.transitionDelay = `${childIndex * 110}ms`;
					});
				}

				section.classList.add("is-visible");
				observer.unobserve(section);
			});
		},
		{
			root: null,
			rootMargin: "0px 0px -12% 0px",
			threshold: 0.08,
		}
	);

	sections.forEach((section) => observer.observe(section));
}

function getHeaderMarkup() {
	const pageName = window.location.pathname.split("/").pop() || "index.html";
	const isHomePage =
		pageName === "" || pageName === "index.html" || pageName === "index.htm";
	const isAboutPage = pageName === "about.html";
	const isTeamPage = pageName === "team.html";

	const expertiseHref = isHomePage ? "#services" : "index.html#services";
	const aboutHref = isHomePage ? "#about" : "about.html";
	const teamHref = "team.html";
	const contactHref = "contact.html";

	const expertiseClass = isHomePage
		? "hover:text-blue-600 transition-colors"
		: "hover:text-blue-600 transition-colors";
	const aboutClass = isAboutPage
		? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
		: "hover:text-blue-600 transition-colors";
	const teamClass = isTeamPage
		? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
		: "hover:text-blue-600 transition-colors";
	const contactButtonLabel = "Contact Us";

	return `
		<nav
			class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
		>
			<div
				class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
			>
				<a href="${
					isHomePage ? "#" : "index.html"
				}" class="block shrink-0" aria-label="OMNEX home">
					<img
						src="assets/omnex_CMYK.png"
						alt="OMNEX"
						class="h-7 w-auto object-contain md:h-9"
					/>
				</a>

				<div
					class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
				>
					<a href="${expertiseHref}" class="${expertiseClass}">Expertise</a>
					<a href="${aboutHref}" class="${aboutClass}">About</a>
					<!--
						<a href="${teamHref}" class="${teamClass}">Team</a>
					-->
					<a
						href="${contactHref}"
						class="group relative inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold overflow-hidden transition-shadow shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
					>
						<span
							class="absolute inset-x-0 bottom-0 h-full bg-blue-600 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
						></span>
						<span class="relative z-10">${contactButtonLabel}</span>
					</a>
				</div>

				<button
					id="mobile-menu-toggle"
					class="md:hidden p-2 text-slate-600 focus:outline-none"
				>
					<span id="menu-icon-container"><i data-lucide="menu"></i></span>
				</button>
			</div>

			<div
				id="mobile-menu"
				class="hidden bg-white border-b border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-lg transition-all"
			>
				<a href="${expertiseHref}" class="mobile-link py-2 text-slate-600 font-medium">Expertise</a>
				<a href="${aboutHref}" class="mobile-link py-2 ${
		isAboutPage ? "text-blue-600 font-bold" : "text-slate-600 font-medium"
	}">About</a>
				<!--
					<a href="${teamHref}" class="mobile-link py-2 ${
		isTeamPage ? "text-blue-600 font-bold" : "text-slate-600 font-medium"
	}">Team</a>
				-->
				<a
					href="${contactHref}"
					class="mobile-link py-2 mt-2 bg-slate-900 text-white text-center rounded-full font-medium"
				>
					${contactButtonLabel}
				</a>
			</div>
		</nav>
	`;
}

function getFooterMarkup() {
	const pageName = window.location.pathname.split("/").pop() || "index.html";
	const isHomePage =
		pageName === "" || pageName === "index.html" || pageName === "index.htm";
	const aboutHref = isHomePage ? "#about" : "about.html";

	return `
		<footer
			id="contact"
			class="bg-white border-t border-slate-100 pt-8 pb-4 md:pt-16 md:pb-8 px-6"
		>
			<div class="max-w-7xl mx-auto">
				<div
					class="grid gap-6 md:12 mb-10 md:mb-16 fade-in-section md:grid-cols-[2fr_1fr_1fr_1fr]"
				>
					<div>
						<img
							src="assets/omnex_CMYK.png"
							alt="OMNEX"
							class="mb-6 h-7 md:h-10 w-auto object-contain"
						/>
						<p class="text-slate-500 max-w-sm">
							Your one-stop partner for corporate services, strategic growth,
							and functional excellence.
						</p>
					</div>
					<div>
						<h4 class="font-bold text-slate-900 mb-2 md:mb-4">Solutions</h4>
						<ul class="space-y-1.5 md:space-y-3 text-slate-500 text-sm">
							<li>
								<a href="#" class="hover:text-blue-600 transition-colors"
									>Corporate Advisory</a
								>
							</li>
							<li>
								<a href="#" class="hover:text-blue-600 transition-colors"
									>Accounting &amp; Finance</a
								>
							</li>
							<li>
								<a href="#" class="hover:text-blue-600 transition-colors"
									>HR &amp; Payroll</a
								>
							</li>
							<li>
								<a href="#" class="hover:text-blue-600 transition-colors"
									>Business Strategy</a
								>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="font-bold text-slate-900 mb-2 md:mb-4">Company</h4>
						<ul class="space-y-1.5 md:space-y-3 text-slate-500 text-sm">
							<li>
								<a href="${aboutHref}" class="hover:text-blue-600 transition-colors"
									>About Us</a
								>
							</li>
							<!--
							<li>
								<a href="team.html" class="hover:text-blue-600 transition-colors"
									>Our Team</a
								>
							</li>
							-->
							<li>
								<a href="#contact" class="hover:text-blue-600 transition-colors"
									>Get in Touch</a
								>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="font-bold text-slate-900 mb-2 md:mb-4">Contact</h4>
						<ul class="space-y-1.5 md:space-y-3 text-slate-500 text-sm">
							<li>hello@omnex.com.my</li>
						</ul>
					</div>
				</div>
				<div
					class="border-t border-slate-100 pt-4 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400"
				>
					<p>&copy; 2026 OMNEX. All rights reserved.</p>
				</div>
			</div>
		</footer>
	`;
}
