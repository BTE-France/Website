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