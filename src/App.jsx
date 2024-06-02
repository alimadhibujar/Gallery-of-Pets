import Gallery from "./component/gallery/Gallery.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Gallery />
      <br />
      <br />
      <br />
      {/* this is github icon and link to my github repository */}
      <p className="githubIcon">
        Code on &nbsp;
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/alimadhibujar/Gallery-of-Pets"
        >
          <i className="fa fa-github" title="github"></i>
        </a>
      </p>
    </div>
  );
}

export default App;
