import { useEffect, useState } from "react";
import longDogImage from "./assets/Long_dog.webp";

function App() {
  //TODO: Refactor states, some seem unnecessary
  const [numOfSeasons, setNumOfSeasons] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchSeasons() {
      const response = await fetch(
        "https://api.tvmaze.com/shows/41821/seasons"
      );
      const data = await response.json();
      setNumOfSeasons(data.length);
    }
    fetchSeasons();

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

  //TODO: create seasons dropdown handler and user input

  const seasonOptions = [];
  for (let i = 1; i <= numOfSeasons; i++) {
    seasonOptions.push(
      <option key={i} value={`season-${i}`}>{`Season ${i}`}</option>
    );
  }

  const filteredEpisodes = episodes.filter(
    (episode) => episode.season === currentSeason
  );

  //TODO: Finalize styles and layout for episode components
  return (
    <>
      <header className="m-2 p-2 flex justify-between">
        <h1 className="text-3xl font-bold">Long Dog Tracker</h1>
        <select name="seasons" id="season-select">
          <option value="">Please select a season</option>
          {seasonOptions}
        </select>
      </header>
      <main>
        <ul className="w-2/3 mx-auto flex flex-col justify-center">
          {filteredEpisodes.map((episode) => (
            <li
              key={episode.id}
              className="m-4 p-2 flex gap-4 rounded-lg bg-slate-500"
            >
              <div className="basis-1/6">
                <img
                  className="object-cover h-full w-full rounded"
                  src={episode.image.medium}
                />
              </div>
              <div className="basis-1/2">
                <h2 className="text-lg font-bold">{episode.name}</h2>
                <p className="text-sm font-light">
                  {episode.summary.replace("<p>", "").replace("</p>", "")}
                </p>
              </div>
              <ul className="flex flex-wrap grow">
                <li className="h-16 w-16 p-2">
                  <img
                    className="h-full w-full rounded"
                    src={longDogImage}
                    alt=""
                  />
                </li>
                <li className="h-16 w-16 p-2">
                  <img
                    className="h-full w-full rounded"
                    src={longDogImage}
                    alt=""
                  />
                </li>
                <li className="h-16 w-16 p-2">
                  <img
                    className="h-full w-full rounded"
                    src={longDogImage}
                    alt=""
                  />
                </li>
                {/* TODO: create button for submitting found long dogs */}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
