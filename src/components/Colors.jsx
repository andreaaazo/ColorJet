import { useEffect, useState } from "react";
import { generateRGB, generateShades } from "../utils/colors_func";
import Color from "./Color";
import MobileRefreshButton from "./MobileRefresherButton";
import Filter from "./Filter";

const Colors = () => {
  const [colors, setColors] = useState([
    generateRGB(),
    generateRGB(),
    generateRGB(),
    generateRGB(),
  ]);
  const [filter, setFilter] = useState("all")

  const handleColorChange = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      setColors([generateShades(filter), generateShades(filter), generateShades(filter), generateShades(filter)])
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleColorChange);
    return () => {
      document.body.removeEventListener("keydown", handleColorChange);
    };
  }, [filter, colors]);

  return (
    <>
      <MobileRefreshButton
        className="mobile-refresher-button icon-button-rounded-lg"
        setColors={setColors}
        filter={filter}
      />
      <Filter setFilter={setFilter}/>
      <div className="colors container-fluid">
        {colors.map((color, index) => (
          <Color key={index} rgbColor={color} />
        ))}
      </div>
    </>
  );
};

export default Colors;
