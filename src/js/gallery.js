class Gallery {
    
    element;

    constructor(element) {
        this.element = element;
    }
    
    loadJson() {
        fetch("img/gallery/gallery.json").then(r => r.json()).then(response => {
            response.forEach(e => this.addEntry(e));
        })
    }

    addEntry(entryJson) {
        let div = document.createElement("div");
        div.classList.add("gallery-entry");
        div.classList.add("gallery-loading");
        let img = document.createElement("img");
        img.onload = _ => {
            img.classList.add("gallery-image");
            div.classList.remove("gallery-loading");
            div.style.width = div.style.height = "";
            div.appendChild(img);
        };
        let imgWidth = entryJson["width"];
        let imgHeight = entryJson["height"];
        if (imgWidth && imgHeight) {
            div.style.aspectRatio = imgWidth + "/" + imgHeight;
            if (imgWidth > imgHeight) {
                div.style.width = entryJson["width"] + "px";
            } else {
                div.style.height = entryJson["height"] + "px";
            }
        }
        img.src = entryJson["url"];
        this.element.appendChild(div);
    }

}

class Carousel {

    element;
    imageElements;
    index = 1;

    constructor(element) {
        this.element = element;
        this.imageElements = element.querySelector(".carousel-list");
        this.imageElements.onresize = _ => {this.setIndex(this.index)};
        let oldResize = window.onresize;
        window.onresize = _ => {oldResize(_); this.setIndex(this.index)};
    }
    
    setIndex(index) {
        this.index = index;
        let image = this.imageElements.children[this.index];
        let imageBB = image.getBoundingClientRect();
        let delta = - imageBB.x + window.innerWidth / 2 - imageBB.width / 2;
        console.log(delta + "px");
        this.imageElements.style.right = delta + "px";
    }
    
    next() {
        this.setIndex(Math.min(this.imageElements.childElementCount - 3, this.index + 1));
    }
    
    previous() {
        this.setIndex(Math.max(1, this.index - 1));
    }
    
}

const gallery = new Gallery(document.querySelector(".gallery"));
//const carrousel = new Carousel(document.querySelector(".carousel"));
window.addEventListener('DOMContentLoaded',_ => {
    //carrousel.setIndex(1);
    gallery.loadJson();
});