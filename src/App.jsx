import { useEffect, useState } from "react";

function App() {
  //TODO: Refactor states, some seem unnecessary
  const [numOfSeasons, setNumOfSeasons] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [foundLongDogs, setFoundLongDogs] = useState([]);
  const [fileInput, setFileInput] = useState("");
  const [image, setImage] = useState("");

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
    console.log(event.target.value);
    setCurrentSeason(+event.target.value);
  }

  function handleUserInput(input) {
    setFileInput(input.value);
    setImage(input.files[0]);
  }

  //TODO: refactor form submission logic
  async function handleUserSubmit(e, episodeName) {
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

    await fetch("http://localhost:3000/user-found-longdogs", {
      method: "POST",
      body: longdogFormData,
    });

    await fetch("http://localhost:3000/user-found-longdogs", {
      method: "PUT",
      body: JSON.stringify({ allFoundLongDogs }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setFileInput("");
    setImage("");
  }

  const seasonOptions = [];
  for (let i = 1; i <= numOfSeasons; i++) {
    seasonOptions.push(<option key={i} value={i}>{`Season ${i}`}</option>);
  }

  const filteredEpisodes = episodes.filter((episode) => {
    return episode.season === currentSeason;
  });

  //TODO: Refactor conditional rendering logic
  const findLongDogImages = (episode) => {
    const currentLongDog = foundLongDogs.find((f) => f.name === episode.name);

    return currentLongDog ? currentLongDog.found : [];
  };

  //TODO: Finalize styles and layout for episode components
  return (
    <>
      <header className="m-2 p-2 flex justify-between">
        <h1 className="text-3xl font-bold">Long Dog Tracker</h1>
        <select onChange={handleSeasonSelect} name="seasons" id="season-select">
          {seasonOptions}
        </select>
      </header>
      <main>
        <ul className="w-2/3 mx-auto flex flex-col justify-center">
          {/* TODO: make into seperate component */}
          {filteredEpisodes.map((episode, index) => (
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
              <ul className="flex flex-wrap grow basis-1/3">
                {findLongDogImages(episode).map((image) => (
                  <li key={image} className="h-16 w-16 p-2">
                    {
                      <img
                        className="h-full w-full rounded"
                        src={`http://localhost:3000/${image}`}
                        alt=""
                      />
                    }
                  </li>
                ))}
                {/* TODO: make new logic for form data without submitting form */}
                <form
                  onSubmit={(e) => {
                    handleUserSubmit(e, episode.name);
                  }}
                  encType="multipart/form-data"
                  className="p-2 basis-full flex justify-start items-center gap-2"
                >
                  <label
                    className="px-5 py-2 text-sm font-bold bg-green-500 rounded-full"
                    htmlFor={`image-file-${index}`}
                  >
                    Found One!
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id={`image-file-${index}`}
                    capture="environment"
                    accept="image/*"
                    onChange={(event) => handleUserInput(event.target)}
                  />
                  {fileInput !== "" && (
                    <input
                      className="px-3 py-1 bg-red-500 rounded font-bold"
                      type="submit"
                    />
                  )}
                </form>
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
