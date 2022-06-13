import Navigation from "../Navigation";

const SplashPage = (isLoaded) => {
  return (
    <div className="Splash">
      {/* <h1>hello from splash</h1> */}
      <Navigation isLoaded={isLoaded}/>
    </div>
  );
};

export default SplashPage;
