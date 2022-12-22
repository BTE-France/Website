const header = document.querySelector("header");
const nav = header.querySelector("nav");

if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
    let observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) {
            header.setAttribute("data-collapsed", "yes");
        }
    });
    observer.observe(header.querySelector(".blue-stripe"));
    addEventListener('scroll', _ => {
        if (window.scrollY <= 0) {
            header.setAttribute("data-collapsed", "no");
        }
    });
}

const toggleMobileMenu = () => {
    let current = nav.getAttribute("data-collapsed");
    nav.setAttribute("data-collapsed",
        current === "no" ? "yes": "no"
    );
};