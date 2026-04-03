function processImage(img, cv) {
    // Read the image into an OpenCV Mat
    let src = cv.imread(img);
    let dst = new cv.Mat();

    // Step 1: Convert to Grayscale
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

    // Step 2: Apply Thresholding
    cv.threshold(dst, dst, 100, 255, cv.THRESH_BINARY);

    // Free the source Mat memory
    src.delete();

    return dst;
}

module.exports = { processImage };