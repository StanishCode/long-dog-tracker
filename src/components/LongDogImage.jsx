function LongDogImage({ curImage }) {
  return (
    <li className="h-16 w-16 p-2">
      <img className="h-full w-full rounded" src={curImage} alt="" />
    </li>
  );
}

export default LongDogImage;
