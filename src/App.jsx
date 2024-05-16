import { useEffect, useState } from "react";
import longDogImage from "./assets/Long_dog.webp";

function App() {
  const [episodes, setEpisodes] = useState([]);

  //TODO: dynamic fetch results based on user input and dynamic dropdown menu
  useEffect(() => {
    async function fetchEpisode() {
      const response = await fetch(
        "https://api.tvmaze.com/shows/41821/episodes"
      );
      const data = await response.json();
      setEpisodes(data);
      console.log(data);
    }
    fetchEpisode();
  }, []);

  //TODO: Finalize styles and layout for episode components
  return (
    <>
      <header className="m-2 p-2 flex justify-between">
        <h1 className="text-3xl font-bold">Long Dog Tracker</h1>
        <select name="seasons" id="season-select">
          <option value="">Please select a season</option>
          <option value="all">All</option>
          <option value="season-1">Season 1</option>
        </select>
      </header>
      <main>
        <div className="m-4 p-2 rounded bg-slate-500">
          <div>
            <h2>{episodes[0].name}</h2>
            {episodes[0].summary.replace("<p>", "").replace("</p>", "")}
          </div>
          <div className="h-16 w-16 p-2">
            <img className="h-full w-full rounded" src={longDogImage} alt="" />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
