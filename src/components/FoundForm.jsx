import { useState } from "react";

function FoundForm({ index, name, onUserSub, afterSub }) {
  const [fileInput, setFileInput] = useState("");
  const [image, setImage] = useState("");

  function handleUserInput(input) {
    setFileInput(input.value);
    setImage(input.files[0]);
  }

  function handleInputSubmission() {
    setFileInput("");
    setImage("");
  }

  return (
    <form
      onSubmit={async (e) => {
        await onUserSub(e, name, image);
        await afterSub();
        handleInputSubmission();
      }}
      encType="multipart/form-data"
      className="p-2 basis-full flex justify-center items-center gap-2 md:justify-start"
    >
      <label
        className="px-5 py-2 text-sm font-bold text-[#404066] bg-[#edcc6f] rounded-full cursor-pointer"
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
      {/* TODO: make only selected form submit button render */}
      {fileInput !== "" && (
        <input
          className="px-3 py-1 text-white bg-[#2b2c41] rounded font-bold"
          type="submit"
        />
      )}
    </form>
  );
}

export default FoundForm;
