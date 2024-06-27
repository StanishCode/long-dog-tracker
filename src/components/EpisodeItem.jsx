import LongDogImage from "./LongDogImage";
import FoundForm from "./FoundForm";

function EpisodeItem({
  curEpisode,
  curIndex,
  found,
  fInput,
  handleInput,
  onUserSubmit,
}) {
  //TODO: Refactor conditional rendering logic
  const findLongDogImages = (episode) => {
    const currentLongDog = found.find((f) => f.name === episode.name);

    return currentLongDog ? currentLongDog.found : [];
  };

  return (
    <li className="m-4 p-2 flex gap-4 rounded-lg bg-slate-500">
      <div className="basis-1/6">
        <img
          className="object-cover h-full w-full rounded"
          src={curEpisode.image.medium}
        />
      </div>
      <div className="basis-1/2">
        <h2 className="text-lg font-bold">{curEpisode.name}</h2>
        <p className="text-sm font-light">
          {curEpisode.summary.replace("<p>", "").replace("</p>", "")}
        </p>
      </div>
      <ul className="flex flex-wrap grow basis-1/3">
        {findLongDogImages(curEpisode).map((image) => (
          <LongDogImage key={image} curImage={image} />
        ))}
        <FoundForm
          index={curIndex}
          input={fInput}
          name={curEpisode.name}
          onUserSub={onUserSubmit}
          onUserInput={handleInput}
        />
      </ul>
    </li>
  );
}

export default EpisodeItem;
