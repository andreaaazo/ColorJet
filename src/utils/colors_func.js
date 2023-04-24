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
    let randomBrightness = Math.floor((Math.random() * 100) / 100)

    return [rgb[0] * randomBrightness, rgb[1] * randomBrightness, rgb[2] * randomBrightness]
}


/**
 * Returns every shade of Red, Green or Blue
 * 
 * @param {string} baseColor - Allowed Red, Green or Blue
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