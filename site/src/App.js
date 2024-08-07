import './App.css';
import React, {useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function GamePage({thumbnail, info, links, descList}) {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    let routeList = [];
    for (let i = 0; i < links.length; i++) {
      routeList.push(<button key = {i} onClick={()=>navigate(links[i])}>{descList[i]["name"]}</button>);
    }
    setGameList(routeList);
  },[]);

  return (
    <div>
      <h1>{info["name"]}</h1>
      <img src={thumbnail} alt="thumbnail"/>
      {gameList}
    </div>
  );
}

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="app">
      <div className="collage">
        <div className="first-three">
          <img className="back-pic"  src="/pngs/background-pic-1.png" alt="background-pic-1"/>
          <img className="back-pic"  src="/pngs/background-pic-2.png" alt="background-pic-2"/>
          <img className="back-pic"  src="/pngs/background-pic-3.png" alt="background-pic-3"/>
        </div>
        <img className="clouds" src="/pngs/cloud-pixel-art.png"
        alt="cloud-scroll-handling" style={{marginTop:`${700-scrollY}px`}}/>
      </div>
      <div className="top-bar">
        <div id="logo">
          <img id = "logo-icon" src="/pngs/zeronialogo-2021.png" alt="logo"/>
          <h1 id="logo-text">Zeronia</h1>
        </div>
        <ul className="nav-bar">
          <label className="top-text" href="default.asp">Home</label>
          <label className="top-text" href="default.asp">Announcements</label>
          <label className="top-text" href="default.asp">Minigames</label>
          <label className="top-text" href="default.asp">About</label>
        </ul>
      </div>
      <div className="main-body">
        <h1 id="welcome-text">We Are Zeronia</h1>
      </div>
    </div>
  );
}

function App() {
  const [gameRoutes, setGameRoutes] = useState([]);
  const [homeRoute, setHomeRoute] = useState([]);

  useEffect(()=> {
    fetch("/api").then(response => response.json()).then(data => {
      let descList = data["descs"];
      let routeList = [];
      let linkPaths = [];

      for (let i = 0; i < descList.length; i++) {
        let str = "/" + descList[i]["name"].replace(" ", "_")
        routeList.push(<Route key = {i} path={str} element={<GamePage info={descList[i]} 
          thumbnail={data["thumbnails"][i]} links={linkPaths} descList={descList}/>} />);
        linkPaths.push(str);
      }

      setGameRoutes(routeList);
      setHomeRoute(<Route path="/" element={<Home/>} />);
    });
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        {homeRoute}
        {gameRoutes}
      </Routes>
    </BrowserRouter>
  );
}

// Helper functions

export default App;