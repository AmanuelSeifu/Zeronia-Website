import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";



function GamePage({thumbnail,info}) {
  return (
    <div>
      <h1>{info["name"]}</h1>
      <img src={thumbnail}/>
    </div>
  );
}



function Home({links,descList}) {
  const [gameList,setGameList] = useState([]);
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
      <h1>Game List</h1>
      {gameList}
    </div>

  );
}




function App() {
  
  const [gameRoutes, setGameRoutes] = useState([]);
  const [homeRoute, setHomeRoute] = useState([]);

  useEffect(()=> {
    fetch("/api").then(response=>response.json()).then(data => {
      let descList = data["descs"];
      let routeList = [];
      let linkPaths = [];
      for (let i = 0; i < descList.length; i++) {
        let str = "/"+descList[i]["name"].replace(" ","_")
        routeList.push(<Route key = {i} path={str} element={<GamePage info={descList[i]} thumbnail={data["thumbnails"][i]}/>} />);
        linkPaths.push(str);
      }
      setGameRoutes(routeList);
      setHomeRoute(<Route path="/" element={<Home links={linkPaths} descList={descList}/>} />);
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

export default App;
