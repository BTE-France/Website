class BackgroundSlideshow {

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

class ImageSlideshow {

    #element;
    #transitionDiv;
    #currentIndex = 0;

    constructor(element) {
        this.#element = element;
        this.#transitionDiv = document.createElement("div");
        this.#element.insertBefore(this.#transitionDiv, this.#element.children[0]);
        this.#element.onclick = _ => this.changeTo(this.#currentIndex + 1);
    }

    changeTo(index) {
        index = index % (this.#element.childElementCount - 1);
        let transitionElement = document.createElement("img");
        this.#transitionDiv.insertBefore(transitionElement, this.#transitionDiv.children[0]);
        transitionElement.src = this.#element.children[1].src;
        while (this.#currentIndex !== index) {
            this.#element.appendChild(this.#element.children[1]);
            this.#currentIndex = (this.#currentIndex + 1) % (this.#element.childElementCount - 1);
        }
        transitionElement.classList.add("fadeout");
        setTimeout(_ => {
            this.#transitionDiv.removeChild(transitionElement);
        }, 1010);
    }

}

const initializeAllIllustrationSlideshows = () => {
    document.querySelectorAll("div.illustration").forEach(element => {
        let slideshow = new ImageSlideshow(element);
    });
}