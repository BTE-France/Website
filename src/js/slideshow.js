class Slideshow {

    #element;
    #transitionElement;
    #images;
    #currentIndex = 0;

    constructor(element, images) {
        this.#element = element;
        this.#images = images;
        this.#element.classList.add("slideshow");
        this.#transitionElement = document.createElement("div");
        this.#transitionElement.classList.add("slideshow-transition-helper");
        this.#element.appendChild(this.#transitionElement);
        this.#changeTo(0);
    }

    changeToNextImage() {
        this.#changeTo((this.#currentIndex + 1) % this.#images.length);
    }

    #changeTo(index) {
        this.#transitionElement.style.backgroundImage = this.#getImageBackgroundProperty(this.#currentIndex);
        this.#element.style.backgroundImage = this.#getImageBackgroundProperty(index) ;
        this.#transitionElement.classList.add("slideshow-hidden");
        setTimeout(_ => this.#transitionElement.classList.remove("slideshow-hidden"), 3050);
        this.#currentIndex = index;
    }

    #getUrlProperty(url) {
        return 'url("' + CSS.escape(url) + '")';
    }

    #getImageBackgroundProperty(index) {
        return this.#getUrlProperty(this.#images[index]);
    }

}