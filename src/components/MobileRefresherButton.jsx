import { generateRGB } from "../utils/colors_func";

const MobileRefreshButton = ({ setColors }) => {

  const handleClick = () => {
    setColors([generateRGB(), generateRGB(), generateRGB(), generateRGB()]);
  };

  return (
    <div className="icon-button-rounded-lg mobile-refresher-button" onClick={handleClick}>
      <span className="material-symbols-outlined">autorenew</span>
    </div>
  );
};

export default MobileRefreshButton;
