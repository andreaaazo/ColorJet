import { generateShades } from "../utils/colors_func";

const MobileRefreshButton = ({setColors, filter}) => {

  const handleClick = () => {
    setColors([generateShades(filter), generateShades(filter), generateShades(filter), generateShades(filter)])
  }

  return (
    <div className="icon-button-rounded-lg mobile-refresher-button" onClick={handleClick}>
      <span className="material-symbols-outlined">autorenew</span>
    </div>
  );
};

export default MobileRefreshButton;
