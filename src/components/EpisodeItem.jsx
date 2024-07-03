import { useEffect, useState } from "react";
import LongDogImage from "./LongDogImage";
import FoundForm from "./FoundForm";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

//TODO: must optimize loading performance and api calls
function EpisodeItem({ curEpisode, curIndex, onUserSubmit }) {
  const [foundLongDogs, setFoundLongDogs] = useState([]);
  const foundLongdogList = ref(storage, `${curEpisode.name}/`);

  useEffect(() => {
    findLongDogImages();
  }, []);

  //TODO: Refactor ref list mapping for URLs
  async function findLongDogImages() {
    console.log("requesting longdog images!");
    console.log(foundLongDogs);
    const response = await listAll(foundLongdogList);

    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setFoundLongDogs((prev) => {
          if (!prev.includes(url)) {
            console.log("State changed!");
            console.log(prev);
            return [...prev, url];
          }

          return prev;
        });
      });
    });
  }

  //TODO: Refactor conditional rendering logic

  return (
    <li className="m-4 p-2 flex flex-wrap gap-4 rounded-lg bg-[#88cafc] md:flex-nowrap">
      <div className="basis-full md:basis-1/6">
        <img
          className="object-cover h-full w-full rounded"
          src={curEpisode.image.medium}
        />
      </div>
      <div className="md:basis-1/2">
        <h2 className="text-lg font-extrabold text-[#2b2c41] text-center md:text-left">
          {curEpisode.name}
        </h2>
        <p className="text-base font-normal text-[#2b2c41]">
          {curEpisode.summary.replace("<p>", "").replace("</p>", "")}
        </p>
      </div>
      {/* TODO: Refactor found longdog state update */}
      <ul className="flex flex-wrap grow md:basis-1/3">
        {foundLongDogs.map((imageURL) => (
          <LongDogImage key={imageURL} curImage={imageURL} />
        ))}
        <FoundForm
          index={curIndex}
          name={curEpisode.name}
          onUserSub={onUserSubmit}
          afterSub={findLongDogImages}
        />
      </ul>
    </li>
  );
}

export default EpisodeItem;
