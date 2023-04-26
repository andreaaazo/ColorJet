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

    useEffect(() => {
    const handleSpacePress = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        filter == "all" ? setColors([
            generateRGB(),
            generateRGB(),
            generateRGB(),
            generateRGB(),
        ]) : setColors([generateShades(filter), generateShades(filter), generateShades(filter), generateShades(filter)])

      }
    };
    document.body.addEventListener("keydown", handleSpacePress);
    return () => {
      document.body.removeEventListener("keydown", handleSpacePress);
    };
  }, []);

  return (
    <>
      <MobileRefreshButton
        className="mobile-refresher-button icon-button-rounded-lg"
        setColors={setColors}
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
