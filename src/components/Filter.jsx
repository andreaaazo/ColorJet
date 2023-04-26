
const Filter = ({setFilter}) => {

    const handleClick = (number) => {
        switch (number) {
            case 0:
                setFilter("all")
                break
            case 1:
                setFilter("red")
                break
            case 2:
                setFilter("green")
                break
            case 3:
                setFilter("blue")
                break
            }
    }

    return (
        <div className="container-fluid filter">
            <h4>Filter</h4>
            <div className="button-group-lg-4">
                <div className="button" onClick={() => handleClick(0)}>
                    <div className="circle all"></div>
                    <p>All</p>
                </div>
                <div className="button" onClick={() => handleClick(1)}>
                    <div className="circle red"></div>
                    <p>Red</p>
                </div>
                <div className="button" onClick={() => handleClick(2)}>
                    <div className="circle blue"></div>
                    <p>Blue</p>
                </div>
                <div className="button" onClick={() => handleClick(3)}>
                    <div className="circle green"></div>
                    <p>Green</p>
                </div>
            </div>
        </div>
    )
}

export default Filter;