import { useEffect, useState } from "react"
import { RGBtoHEX, getContrastRatio, HSLtoRGB } from "../utils/colors_func"


export default function Color({rgbColor}) {
    // Class of the color title
    const [colorTitleClass, setColorTitleClass] = useState("")

    // Calculate the background color from the RGB color value
    const backgroundColor = `#${RGBtoHEX(rgbColor)}`.toUpperCase()

    // Extract the black text color value from the CSS variables
    const hslTextBlack = getComputedStyle(document.documentElement).getPropertyValue('--text-black-primary')
    const rgbTextBlack = HSLtoRGB(hslTextBlack
        .substring(5, hslTextBlack.length -1) // Eliminate hsl( and )
        .replace(/[a-z() %]/g, "")
        .split(",")
        .map(colorValue => Number(colorValue))
    ) 

    // Change the text color based on the contrast with the black text color
    useEffect(() => {
        const contrastRatio = getContrastRatio(rgbColor, rgbTextBlack)
        setColorTitleClass(contrastRatio < 4 ? "white normal" : "black normal")
    }, [rgbColor])

    return (
        <div className="color" style={{backgroundColor}}>
            <h4 className={colorTitleClass}>{backgroundColor.replace(/^./, "")}</h4>
        </div>
    )
}