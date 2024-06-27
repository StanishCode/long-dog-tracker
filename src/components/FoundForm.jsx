function FoundForm({ index, input, name, onUserSub, onUserInput }) {
  return (
    <form
      onSubmit={(e) => {
        onUserSub(e, name);
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
        onChange={(event) => onUserInput(event.target)}
      />
      {/* TODO: make only selected form submit button render */}
      {input !== "" && (
        <input
          className="px-3 py-1 bg-red-500 rounded font-bold"
          type="submit"
        />
      )}
    </form>
  );
}

export default FoundForm;
