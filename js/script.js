// Inizializzazione AOS
AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 120,
    delay: 0,
    duration: 800,      
    easing: 'ease-in-out', 
    once: true,         
    mirror: false,
    anchorPlacement: 'top-bottom',
});

const sections = ['welcome', 'skills-section', 'projects', 'footer'];
const arrowLink = document.getElementById('scrollArrow');
const arrowIcon = document.getElementById('arrow');
const footer = document.getElementById('footer');

function updateArrowDirection() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const footer = document.getElementById('footer');

    if (footer) {
        const footerBottom = footer.offsetTop + footer.offsetHeight;

        if (scrollBottom >= footerBottom) {
            // siamo in fondo → freccia punta a welcome
            arrowIcon.classList.remove('bi-chevron-down');
            arrowIcon.classList.add('bi-chevron-up');
            arrowLink.href = '#welcome';
            return;
        }
    }

    // altrimenti freccia punta alla prossima sezione
    const currentIndex = sections.findIndex(id => {
        const sec = document.getElementById(id);
        return sec && sec.offsetTop > window.scrollY;
    });

    let nextIndex = currentIndex >= 0 ? currentIndex : 1;
    arrowIcon.classList.remove('bi-chevron-up');
    arrowIcon.classList.add('bi-chevron-down');
    arrowLink.href = '#' + sections[nextIndex];
}

function updateMobileArrow() {
    const isMobile = window.innerWidth <= 768; // breakpoint mobile
    if (!footer) return;

    const scrollBottom = window.scrollY + window.innerHeight;
    const footerBottom = footer.offsetTop + footer.offsetHeight;

    if (isMobile && scrollBottom >= footer.offsetTop) {
        // mostra freccia su mobile solo quando il footer entra in vista
        arrowLink.style.display = 'block';
        arrowIcon.classList.remove('bi-chevron-down');
        arrowIcon.classList.add('bi-chevron-up');
        arrowLink.href = '#welcome';
    } else if (isMobile) {
        // nascondi freccia su mobile fino a footer
        arrowLink.style.display = 'none';
    }
}

// scroll smooth
arrowLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(arrowLink.getAttribute('href'));
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});

// eventi
window.addEventListener('scroll', updateArrowDirection);
window.addEventListener('load', updateArrowDirection);

window.addEventListener('scroll', updateMobileArrow);
window.addEventListener('resize', updateMobileArrow);
window.addEventListener('load', updateMobileArrow);
