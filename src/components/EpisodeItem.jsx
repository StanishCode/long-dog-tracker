import LongDogImage from "./LongDogImage";
import FoundForm from "./FoundForm";

function EpisodeItem({ curEpisode, curIndex, found, onUserSubmit }) {
  //TODO: Refactor conditional rendering logic
  const findLongDogImages = (episode) => {
    const currentLongDog = found.find((f) => f.name === episode.name);

    return currentLongDog ? currentLongDog.found : [];
  };

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
      {/* TODO: Look into betterimplementation for unique identifiers */}
      <ul className="flex flex-wrap grow md:basis-1/3">
        {findLongDogImages(curEpisode).map((image) => (
          <LongDogImage key={image} curImage={image} />
        ))}
        <FoundForm
          index={curIndex}
          name={curEpisode.name}
          onUserSub={onUserSubmit}
        />
      </ul>
    </li>
  );
}

export default EpisodeItem;
