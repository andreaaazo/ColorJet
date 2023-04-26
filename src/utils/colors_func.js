/**
 * Random RGB color
 * 
 * @returns {Array} [r, g, b] - Random rgb values
 *  
 */
export function generateRGB() {
    const R = Math.floor(Math.random() * 255)
    const G = Math.floor(Math.random() * 255)
    const B = Math.floor(Math.random() * 255)

    return [R, G, B]
}


/**
 * Change random brightness of RGB color
 * 
 * @param {Array} rgb - Color to change brightness
 * 
 * @returns {Array} [r, g, b] - Color with brightness changed
 * 
 */
export function randomChangeRGBBrightness(rgb) {
    let randomBrightness = (Math.random() * 100) / 100

    return [Math.round(rgb[0] * randomBrightness), Math.round(rgb[1] * randomBrightness), Math.round(rgb[2] * randomBrightness)]
}


/**
 * Returns every shade of Red, Green or Blue
 * 
 * @param {string} baseColor - Allowed red, green, blue or all
 * 
 * @returns {Array} [r, g, b] - Shaded color
 *  
 */
export function generateShades(baseColor) {
    switch (baseColor) {
        case 'red':
            return randomChangeRGBBrightness([255, Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)])
        case 'green':
            return randomChangeRGBBrightness([Math.floor(Math.random() * 255), 255, Math.floor(Math.random() * 255)])
        case 'blue':
            return randomChangeRGBBrightness([Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 255])
        case 'all':
            return generateRGB()
        default:
            Error("You have to select 'red', 'green' or 'blue'")
    }
}

/**
 * Transform RGB to HEX
 * 
 * @param {Array} rgb - Array of color [R, G, B] to transform
 * 
 * @returns {string} HEX - HEX code of the given rgb param
 * 
 */
export function RGBtoHEX(rgb) {
    return (rgb[0].toString(16).padStart(2, '0') + rgb[1].toString(16).padStart(2, '0') + rgb[2].toString(16).padStart(2, '0'))
}

/**
 * Contrast Ratio Between 2 RGB Colors
 * 
 * @param {Array} rgb1 - Array of the first color [R, G, B]
 * @param {Array} rgb2 - Array of the second color [R, G, B]
 * @returns {Int32Array} Contrast - Contrast ratio
 */
export function getContrastRatio(rgb1, rgb2) {
    const luminance1 = getRelativeLuminance(rgb1);
    const luminance2 = getRelativeLuminance(rgb2);
    const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return contrastRatio.toFixed(2);
}

/**
 * Relative Luminance of a RGB color
 * 
 * @param {Array} rgb - Array of the color [R, G, B]
 * @returns {Int32Array} Luminance - luminance of the color
 */
export function getRelativeLuminance(rgb) {
    const [r, g, b] = rgb.map((value) => {
        const sRGBValue = value / 255;
        return sRGBValue <= 0.03928 ? sRGBValue / 12.92 : Math.pow((sRGBValue + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/**
 * Transform HSL to RGB Color
 * 
 * @param {Array} hsl - Array of the HSL Color [H, S, L] 
 * @returns {Array} RGB - Array of the RGB Color [R, G, B]
 */
export function HSLtoRGB(hsl) {
    let [h, s, l] = hsl;

    // Convert h, s, l to fractional values
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        // If the saturation is 0, the color is a shade of gray
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert R, G, B values to integers between 0 and 255
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    // Return the RGB array
    return [r, g, b];
}