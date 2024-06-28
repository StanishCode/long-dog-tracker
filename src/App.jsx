import { useEffect, useState } from "react";
import EpisodeItem from "./components/EpisodeItem";

function App() {
  //TODO: Refactor states, some may be unnecessary
  const [numOfSeasons, setNumOfSeasons] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [foundLongDogs, setFoundLongDogs] = useState([]);

  useEffect(() => {
    async function fetchSeasons() {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/shows/41821/seasons"
        );
        const data = await response.json();
        setNumOfSeasons(data.length);
      } catch (error) {
        console.log("Could not fetch api season data", error);
      }
    }
    fetchSeasons();

    async function fetchEpisode() {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/shows/41821/episodes"
        );
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.log("Could not fetch api episode data", error);
      }
    }
    fetchEpisode();

    async function fetchFoundLongDogs() {
      try {
        const response = await fetch(
          "http://localhost:3000/user-found-longdogs"
        );
        const data = await response.json();
        setFoundLongDogs(data.longDogs);
      } catch (error) {
        console.log("Could not fetch found longdogs", error);
      }
    }
    fetchFoundLongDogs();
  }, []);

  function handleSeasonSelect(event) {
    setCurrentSeason(+event.target.value);
  }

  //TODO: refactor form submission logic
  async function handleUserSubmit(e, episodeName, image) {
    e.preventDefault();

    const alreadyFound = foundLongDogs.find((f) => f.name === episodeName);
    let updatedData = "";

    if (!alreadyFound) {
      updatedData = { name: episodeName, found: [image.name] };
      setFoundLongDogs((prevState) => {
        return [...prevState, { name: episodeName, found: [image.name] }];
      });
    } else {
      alreadyFound.found.push(image.name);
      setFoundLongDogs((prevState) => {
        return [...prevState, alreadyFound];
      });
    }

    const longdogFormData = new FormData();
    longdogFormData.append("image", image);
    const allFoundLongDogs = [...foundLongDogs, updatedData];

    try {
      await fetch("http://localhost:3000/user-found-longdogs", {
        method: "POST",
        body: longdogFormData,
      });
    } catch (error) {
      console.log("Could not send and update found longdog images", error);
    }

    try {
      await fetch("http://localhost:3000/user-found-longdogs", {
        method: "PUT",
        body: JSON.stringify({ allFoundLongDogs }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Could not send and update found longdog info", error);
    }
  }

  const seasonOptions = [];
  for (let i = 1; i <= numOfSeasons; i++) {
    seasonOptions.push(<option key={i} value={i}>{`Season ${i}`}</option>);
  }

  const filteredEpisodes = episodes.filter((episode) => {
    return episode.season === currentSeason;
  });

  return (
    <>
      {/* TODO: Keep looking into color palette */}
      <header className="mx-2 mb-2 p-2 flex justify-between">
        <h1 className="text-3xl text-[#2b2c41] font-extrabold">
          Long Dog Tracker
        </h1>
        <select
          onChange={handleSeasonSelect}
          className="p-2 font-bold text-[#2b2c41] bg-[#88cafc] rounded"
          name="seasons"
          id="season-select"
        >
          {seasonOptions}
        </select>
      </header>
      <main>
        <ul className="w-2/3 mx-auto flex flex-col justify-center">
          {filteredEpisodes.map((episode, index) => (
            <EpisodeItem
              key={episode.id}
              curEpisode={episode}
              curIndex={index}
              found={foundLongDogs}
              onUserSubmit={handleUserSubmit}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
