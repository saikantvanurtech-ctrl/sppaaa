
const WA_NUMBER = "917377999900";

function waMessage(text = "Hello SPAAHOLIC WELLNESS, I would like to enquire about a spa appointment.") {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
}

document.querySelectorAll(".wa").forEach((link) => {
  const treatment = link.dataset.treatment;
  const message = treatment
    ? `Hello SPAAHOLIC WELLNESS, I would like to book ${treatment}. Please share the available time slots.`
    : "Hello SPAAHOLIC WELLNESS, I would like to enquire about a spa appointment.";
  link.href = waMessage(message);
  link.target = "_blank";
  link.rel = "noopener";
});

/* Mobile navigation */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navLinks");

if (hamburger && nav) {
  const setMenuState = (open) => {
    nav.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open && window.innerWidth <= 780);
  };

  setMenuState(false);

  hamburger.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      setMenuState(false);
    }
  });
}

/* Homepage hero: three-image carousel with a smooth zoom-and-fade transition. */
const heroSlides = Array.from(document.querySelectorAll(".hero .hero-bg"));
if (heroSlides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let activeHeroSlide = heroSlides.findIndex((slide) => slide.classList.contains("active"));
  if (activeHeroSlide < 0) activeHeroSlide = 0;
  window.setInterval(() => {
    heroSlides[activeHeroSlide].classList.remove("active");
    activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
    heroSlides[activeHeroSlide].classList.add("active");
  }, 6500);
}

/* Scroll reveal animation */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

/* FAQ accordion */
document.querySelectorAll(".faq-row button").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.parentElement;
    row.classList.toggle("open");
    const symbol = button.querySelector("span");
    if (symbol) symbol.textContent = row.classList.contains("open") ? "−" : "+";
  });
});

/* Image lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

document.querySelectorAll("[data-img]").forEach((card) => {
  card.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = card.dataset.img;
    lightboxImg.alt = card.dataset.title || "SPAAHOLIC WELLNESS image";
    if (lightboxCaption) lightboxCaption.textContent = card.dataset.title || "SPAAHOLIC WELLNESS";
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("show");
  document.body.style.overflow = "";
}

const closeButton = document.getElementById("closeLightbox");
if (closeButton) closeButton.addEventListener("click", closeLightbox);

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

/* Gentle image parallax */
const parallaxImages = document.querySelectorAll("[data-parallax]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  parallaxImages.forEach((image) => {
    const speed = Number(image.dataset.parallax || 0.08);
    image.style.transform = `translateY(${scrollY * speed * -0.08}px) scale(1.04)`;
  });
});

/* Booking form demo */
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("name") || "Guest";
    const treatment = formData.get("treatment") || "spa treatment";
    const message = `Hello SPAAHOLIC WELLNESS, I am ${name}. I would like to enquire about ${treatment}.`;
    window.open(waMessage(message), "_blank");
  });
}


// Close mobile navigation with Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav && nav.classList.contains("open")) {
    nav.classList.remove("open");
    if (hamburger) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }
    document.body.classList.remove("menu-open");
  }
});

/* Auto-sliding testimonials */
(function(){
  const slider=document.querySelector('.testimonial-slider');
  const track=document.querySelector('.testimonial-track');
  const slides=track ? Array.from(track.querySelectorAll('.testimonial-slide')) : [];
  const dotsWrap=document.querySelector('.testimonial-dots');
  const prev=document.querySelector('.testimonial-prev');
  const next=document.querySelector('.testimonial-next');
  if(!slider || !track || slides.length<2) return;
  let current=0;
  let timer;
  slides.forEach((_,i)=>{
    const dot=document.createElement('button');
    dot.type='button'; dot.setAttribute('aria-label','Show testimonial '+(i+1));
    dot.addEventListener('click',()=>goTo(i,true));
    dotsWrap.appendChild(dot);
  });
  const dots=Array.from(dotsWrap.children);
  function render(){
    slider.classList.add('is-moving');
    track.style.transform='translate3d(-'+(current*100)+'%,0,0)';
    window.setTimeout(()=>slider.classList.remove('is-moving'),420);
    dots.forEach((d,i)=>d.classList.toggle('active',i===current));
  }
  function goTo(index,manual){
    current=(index+slides.length)%slides.length;
    render();
    if(manual) restart();
  }
  function restart(){clearInterval(timer);timer=setInterval(()=>goTo(current+1,false),5000)}
  if(prev) prev.addEventListener('click',()=>goTo(current-1,true));
  if(next) next.addEventListener('click',()=>goTo(current+1,true));
  slider.addEventListener('mouseenter',()=>clearInterval(timer));
  slider.addEventListener('mouseleave',restart);
  slider.addEventListener('touchstart',()=>clearInterval(timer),{passive:true});
  slider.addEventListener('touchend',restart,{passive:true});
  render(); restart();
})();


/* ===== First-open premium welcome -> booking -> website flow ===== */
(function(){
  const welcome=document.getElementById('welcomeScreen');
  const gate=document.getElementById('bookingGate');
  if(!welcome || !gate) return;
  document.body.classList.add('gate-lock');
  let gateOpened=false;
  const openGate=()=>{
    if(gateOpened) return;
    gateOpened=true;
    welcome.classList.add('hide');
    setTimeout(()=>{gate.classList.add('show');gate.setAttribute('aria-hidden','false');},650);
  };
  setTimeout(openGate,1250);
  const closeAll=()=>{gate.classList.remove('show');gate.setAttribute('aria-hidden','true');document.body.classList.remove('gate-lock');};
  document.getElementById('gateClose')?.addEventListener('click',closeAll);
  document.getElementById('skipBooking')?.addEventListener('click',closeAll);
  document.getElementById('exploreSite')?.addEventListener('click',closeAll);
  document.getElementById('welcomeBookingForm')?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const name=fd.get('name')||'Guest', phone=fd.get('phone')||'';
    const msg=`Hello SPAAHOLIC WELLNESS, I am ${name}. My mobile number is ${phone}. I would like to enquire about a spa appointment.`;
    window.open(waMessage(msg),'_blank','noopener');
    closeAll();
  });
})();

/* ===== Premium major-section slide animation ===== */
(function(){
  const selectors = [
    'main > section',
    'main > .luxury-split',
    'main > .contact-showcase',
    'main > .privacy-secure-section',
    'main > .trust-experience-section',
    'main > .gift-section'
  ];
  const sections = [];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(section => {
      if (!sections.includes(section)) sections.push(section);
    });
  });
  if (!sections.length) return;

  sections.forEach((section, index) => {
    section.classList.add('scroll-section');
    if (index % 3 === 1) section.dataset.slide = 'left';
    else if (index % 3 === 2) section.dataset.slide = 'right';
  });

  const revealSections = (items) => items.forEach(item => {
    if (item.isIntersecting) item.target.classList.add('is-visible');
  });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(revealSections, {
      threshold: 0.08,
      rootMargin: '0px 0px -7% 0px'
    });
    sections.forEach(section => sectionObserver.observe(section));
  } else {
    sections.forEach(section => section.classList.add('is-visible'));
  }
})();


/* ===== Quick booking modal: Name + Mobile Number ===== */
(function(){
  const modal=document.getElementById('bookingFormModal');
  const triggers=document.querySelectorAll('.booking-trigger');
  if(!modal || !triggers.length) return;
  const form=document.getElementById('quickBookingForm');
  const nameInput=document.getElementById('quickBookingName');
  const phoneInput=document.getElementById('quickBookingPhone');
  const open=()=>{modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>nameInput?.focus(),120)};
  const close=()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
  triggers.forEach(trigger=>trigger.addEventListener('click',(e)=>{e.preventDefault();open()}));
  modal.querySelectorAll('[data-close-booking]').forEach(el=>el.addEventListener('click',close));
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape' && modal.classList.contains('show')) close()});
  phoneInput?.addEventListener('input',()=>{phoneInput.value=phoneInput.value.replace(/\D/g,'').slice(0,10)});
  form?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=(nameInput?.value||'').trim();
    const phone=(phoneInput?.value||'').trim();
    if(!name || !/^\d{10}$/.test(phone)){form.reportValidity();return}
    const message=`Hello SPAAHOLIC WELLNESS, I am ${name}. My mobile number is ${phone}. I would like to book a spa appointment. Please share the available time slots.`;
    window.open(waMessage(message),'_blank','noopener');
    form.reset();
    close();
  });
})();

/* Analytics-ready conversion events (connect GA4 by loading your own measurement ID). */
window.dataLayer = window.dataLayer || [];
function trackSpaEvent(eventName, details = {}) {
  window.dataLayer.push({ event: eventName, ...details });
}
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => trackSpaEvent('phone_click', { link_text: (link.innerText || '').trim() }));
});
document.querySelectorAll('.wa').forEach((link) => {
  link.addEventListener('click', () => trackSpaEvent('whatsapp_click', { link_text: (link.innerText || '').trim() }));
});
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', () => trackSpaEvent('booking_enquiry_submit', { form_id: form.id || 'unnamed_form' }));
});
