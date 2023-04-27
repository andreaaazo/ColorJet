import React, { useEffect, useState } from "react";
import { RGBtoHEX, getContrastRatio, HSLtoRGB, HEXtoRGB } from "../utils/colors_func";

const Color = ({ rgbColor }) => {
    // Define state for CSS classes
    const [colorTitleClass, setColorTitleClass] = useState("") // class for color title
    const [tooltipClass, setTooltipClass] = useState("tooltip") // class for tooltip

    // Calculate the background color from the RGB color value
    const backgroundColor = `#${RGBtoHEX(rgbColor)}`.toUpperCase();

    // Use effect to determine the contrast ratio between the color and text-black-primary
    useEffect(() => {
        // Get the value for text-black-primary and convert it to RGB
        const textBlack = getComputedStyle(document.documentElement).getPropertyValue('--text-black-primary');
        const rgbTextBlack = textBlack.charAt(0) === "#" ? HEXtoRGB(textBlack) : HSLtoRGB(
            textBlack
            .substring(5, textBlack.length - 1) // Extract the HSL values from the string
            .replace(/[a-z() %]/g, "")
            .split(",")
            .map(colorValue => Number(colorValue))
        )

        // Calculate the contrast ratio between the two colors
        const contrastRatio = getContrastRatio(rgbColor, rgbTextBlack);

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
