import React, { useEffect, useState } from "react";
import { RGBtoHEX, getContrastRatio, HSLtoRGB } from "../utils/colors_func";

const Color = ({ rgbColor }) => {
    // Define state for CSS classes
    const [colorTitleClass, setColorTitleClass] = useState("") // class for color title
    const [tooltipClass, setTooltipClass] = useState("tooltip") // class for tooltip

    // Calculate the background color from the RGB color value
    const backgroundColor = `#${RGBtoHEX(rgbColor)}`.toUpperCase();

    // Use effect to determine the contrast ratio between the color and text-black-primary
    useEffect(() => {
        // Get the HSL value for text-black-primary and convert it to RGB
        const hslTextBlack = getComputedStyle(document.documentElement).getPropertyValue('--text-black-primary');
        const rgbTextBlack = HSLtoRGB(hslTextBlack.substring(5, hslTextBlack.length - 1));

        // Calculate the contrast ratio between the two colors
        const contrastRatio = getContrastRatio(rgbColor, rgbTextBlack);
        console.log(contrastRatio)
        console.log(rgbColor)
        console.log(rgbTextBlack)
        console.log(hslTextBlack)

        // Set the color title class based on the contrast ratio
        setColorTitleClass(contrastRatio < 4 ? "white normal" : "black normal");
    }, [rgbColor]);

    // Handle copying color value to clipboard and showing tooltip
    const handleTitleClick = () => {
        navigator.clipboard.writeText(backgroundColor);
        setTooltipClass("tooltip copied");
    };

    // Reset tooltip class after 3 seconds
    useEffect(() => {
        if (tooltipClass === "tooltip copied") {
        const timeoutId = setTimeout(() => {
            setTooltipClass("tooltip");
        }, 1000);
        return () => {
            clearTimeout(timeoutId);
        };
        }
    }, [tooltipClass]);

    // Render the color component
    return (
        <div className="color" style={{ backgroundColor }}>
        <h4 className={colorTitleClass} onClick={handleTitleClick}>
            {backgroundColor.replace(/^./, "")}
            <span className={tooltipClass}>
            <span className="material-symbols-outlined tooltip-icon">content_copy</span>
            <p>{tooltipClass === "tooltip" ? "Copy To Clipboard" : "Copied"}</p>
            </span>
        </h4>
        </div>
    );
};

export default Color;
