
const Filter = ({setFilter}) => {

    const handleClick = (number) => {
        setFilter(number)
    }

    return (
        <div className="container-fluid filter">
            <h4>Filter</h4>
            <div className="button-group-lg-4">
                <div className="button" onClick={() => handleClick("all")} value={"all"}>
                    <div className="circle all"></div>
                    <p>All</p>
                </div>
                <div className="button" onClick={() => handleClick("red")} value={"red"}>
                    <div className="circle red"></div>
                    <p>Red</p>
                </div>
                <div className="button" onClick={() => handleClick("blue")} value={"blue"}>
                    <div className="circle blue"></div>
                    <p>Blue</p>
                </div>
                <div className="button" onClick={() => handleClick("green")} value={"green"}>
                    <div className="circle green"></div>
                    <p>Green</p>
                </div>
            </div>
        </div>
    )
}

export default Filter;