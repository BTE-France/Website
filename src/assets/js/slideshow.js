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
    #selectors;

    constructor(element) {
        this.#element = element;
        this.#transitionDiv = document.createElement("div");
        this.#element.insertBefore(this.#transitionDiv, this.#element.children[0]);
        this.#selectors = document.createElement("div");
        this.#selectors.classList.add("slideshow-selectors");
        let previousButton = document.createElement("button");
        previousButton.classList.add("previous");
        previousButton.textContent = "<";
        previousButton.onclick = _ => this.changeToPrevious()
        let nextButton = document.createElement("button");
        nextButton.classList.add("next");
        nextButton.textContent = ">";
        nextButton.onclick = _ => this.changeToNext();
        this.#element.appendChild(previousButton);
        this.#element.appendChild(nextButton);
        this.#element.appendChild(this.#selectors);
        this.#createSelectors();
        this.#selectors.children[0].checked = true;
    }

    changeTo(index) {
        this.#createSelectors(); // If an image is injected after the page has loaded, this takes care of it
        let n = this.#element.childElementCount - 4;
        index = (index % n + n) % n; // JS is dumb with negative modulos
        this.#selectors.children[index].click();
    }

    changeToNext() {
        this.changeTo(this.#currentIndex + 1);
    }

    changeToPrevious() {
        this.changeTo(this.#currentIndex - 1);
    }

    /**
     * Internal method to change the displayed image, with a transition.
     * Calling this.changeTo(index) is preferred as it ensures the selectors are updated as well.
     *
     * @param index
     */
    #changeTo(index) {

        // Setup the transition element
        let transitionElement = document.createElement("img");
        this.#transitionDiv.insertBefore(transitionElement, this.#transitionDiv.children[0]);
        transitionElement.src = this.#element.children[1].src;

        // Cycle the images until we are at the desired index
        let children = this.#element.children;
        while (this.#currentIndex !== index) {
            this.#element.insertBefore(children[1], children[children.length - 3]);
            this.#currentIndex = (this.#currentIndex + 1) % (this.#element.childElementCount - 4);
        }

        // Start the transition and remove the transition element once it is no longer visible
        transitionElement.classList.add("fadeout");
        setTimeout(_ => {
            this.#transitionDiv.removeChild(transitionElement);
        }, 1010);
    }

    #createSelectors() {
        let imageCount = this.#element.children.length - 4;
        let index = this.#selectors.children.length;
        while (this.#selectors.children.length < imageCount) {
            let selector = document.createElement("input");
            selector.type = "radio";
            selector.name = "index";
            let i = index++;
            selector.onchange = _ => this.#changeTo(i);
            this.#selectors.appendChild(selector);
        }
    }

}

const initializeAllIllustrationSlideshows = settings => {
    document.querySelectorAll("div.illustration").forEach(element => {
        let slideshow = new ImageSlideshow(element);
        let cycleInterval = settings["cycle-interval"];
        if (cycleInterval) {
            setInterval(() => slideshow.changeToNext(), cycleInterval);
        }
    });
}