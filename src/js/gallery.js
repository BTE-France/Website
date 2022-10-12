class Gallery {
    
    element;
    entries = [];

    constructor(element) {
        this.element = element;
    }
    
    loadJson() {
        fetch("img/gallery/gallery.json").then(r => r.json()).then(response => {
            response.forEach(e => this.addEntry(e));
        })
    }

    addEntry(entryJson) {
        let entry = new GalleryEntry();
        entry.setTitle(entryJson["name"]);
        entry.setDescription(entryJson["description"]);
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
            '<p></p>' +
            '<button class="gallery-button close">X</button>' +
            '<img src="img/camera.svg" class="camera" alt="">' +
            '<span class="author"></span>' +
            '<img src="img/axe.svg" class="axe" alt="">' +
            '<span class="builders"></span>'
        ;
        this.title = this.info.querySelector("h4");
        this.description = this.info.querySelector("p");
        this.author = this.info.querySelector(".author");
        this.builders = this.info.querySelector(".builders");
        this.info.querySelector(".info").onclick = _ => {this.showDescriptionFullscreen()};
        this.info.querySelector(".close").onclick = _ => {this.closeDescriptionFullscreen()};
        this.element.appendChild(this.info);
    }

    setImageSize(width, height) {
        if (width && height) {
            this.element.style.aspectRatio = width + "/" + height;
            if (width > height) {
                this.element.style.width = width + "px";
            } else {
                this.element.style.height = height + "px";
            }
        } else {
            this.element.style.width = "1280px";
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

    closeDescriptionFullscreen() {
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