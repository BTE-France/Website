class Gallery {
    
    element;
    entries = [];
    image;
    fullscreenContainer;

    constructor(element) {
        this.element = element;
        this.fullscreenContainer = element.querySelector(".container.fullscreen");
        this.fullscreenContainer.onclick = _ => this.closeImageFullscreen();
        this.image = this.fullscreenContainer.querySelector("img");
    }
    
    loadJson() {
        fetch("/assets/img/gallery/gallery.json").then(r => r.json()).then(response => {
            response.forEach(e => this.addEntry(e));
        })
    }

    addEntry(entryJson) {
        let entry = new GalleryEntry(this);
        entry.setTitle(entryJson["name"][locale]);
        entry.setDescription(entryJson["description"][locale]);
        entry.setImageSize(entryJson["width"], entryJson["height"]);
        entry.setAuthor(entryJson["author"]);
        entry.setBuilders(entryJson["builders"].join(", "));
        entry.loadImage(entryJson["url"]);
        this.element.appendChild(entry.getElement());
        if (!this.entries.length) {
            entry.hideSeparator();
        }
        this.entries.push(entry);
    }

    openImageFullscreen(src) {
        this.fullscreenContainer.classList.remove("hidden");
        this.image.src = src;
    }

    closeImageFullscreen() {
        this.fullscreenContainer.classList.add("hidden");
    }

}

class GalleryEntry {

    parent;
    element;
    info;
    title;
    description;
    author;
    builders;

    constructor(parent) {
        this.parent = parent;
        this.element = document.createElement("div");
        this.element.classList.add("gallery-entry");
        this.element.classList.add("gallery-loading");
        this.img = document.createElement("img");
        this.info = document.createElement("div");
        this.info.classList.add("gallery-info");
        this.info.innerHTML =
            '<h4></h4>' +
            '<button class="gallery-button info">i</button>' +
            '<button class="gallery-button download"></button>' +
            '<button class="gallery-button fullscreen"></button>' +
            '<p></p>' +
            '<button class="gallery-button close">X</button>' +
            '<img src="/assets/img/camera.svg" class="camera" alt="">' +
            '<span class="author"></span>' +
            '<img src="/assets/img/axe.svg" class="axe" alt="">' +
            '<span class="builders"></span>'
        ;
        this.title = this.info.querySelector("h4");
        this.description = this.info.querySelector("p");
        this.author = this.info.querySelector(".author");
        this.builders = this.info.querySelector(".builders");
        this.img.onclick = _ => {this.parent.openImageFullscreen(this.img.src)};
        this.info.querySelector(".fullscreen").onclick = _ => {this.parent.openImageFullscreen(this.img.src)};
        this.info.querySelector(".info").onclick = _ => {this.showDescriptionFullscreen()};
        this.info.querySelector(".close").onclick = _ => {this.closeFullscreen()};
        this.element.appendChild(this.info);
    }

    setImageSize(width, height) {
        if (width && height) {
            this.element.style.aspectRatio = width + "/" + height;
            if (width > height) {
                this.element.style.width = "45vw";
            } else {
                this.element.style.height = "50vh";
            }
        } else {
            this.element.style.width = "45vw";
            this.element.style.aspectRatio = "16/9";
        }
    }

    loadImage(src) {
        this.info.querySelector(".download").onclick = _ => {
            downloadImage(src, this.getTitle());
        };
        this.img.onload = _ => {
            this.img.classList.add("gallery-image");
            this.element.classList.remove("gallery-loading");
            this.element.style.width = this.element.style.height = this.element.style.aspectRatio = "";
            this.element.appendChild(this.img);
        };
        this.img.src = src;
    }

    getTitle() {
        return this.title.innerText;
    }

    setTitle(title) {
        this.title.innerText = title;
    }

    setDescription(description) {
        this.description.innerText = description;
    }

    setAuthor(author) {
        this.author.innerText = author;
    }

    setBuilders(builders) {
        this.builders.innerText = builders;
    }

    getElement() {
        return this.element;
    }

    hideSeparator() {
        this.element.classList.add("no-top-border");
    }

    showDescriptionFullscreen() {
        this.element.classList.add("description-fullscreen");
    }

    closeFullscreen() {
        this.element.classList.remove("description-fullscreen");
    }

}

/**
 * Saves an image to disk.
 *
 * @param url      image Data
 * @param filename  the file name under which the image should be saved
 */
function downloadImage(url, filename) {
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const gallery = new Gallery(document.querySelector(".gallery"));
window.addEventListener('DOMContentLoaded',_ => {
    gallery.loadJson();
});