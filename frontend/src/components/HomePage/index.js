import Navigation from "../Navigation"

const HomePage = (isLoaded) => {
    return (
        <div className="Home">
            {/* <h1>Hello from Home Page</h1> */}
            <Navigation isLoaded={isLoaded}/>
        </div>
    )
}

export default HomePage
