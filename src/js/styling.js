const header = document.querySelector("header");

if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
) {
    let observer = new IntersectionObserver(entries => {
        console.log(entries);
        if (!entries[0].isIntersecting) {
            header.setAttribute("data-collapsed", "yes");
        }
    });
    observer.observe(header.querySelector(".blue-stripe"));
    addEventListener('scroll', event => {
        if (window.scrollY <= 0) {
            header.setAttribute("data-collapsed", "no");
        }
    });
}
