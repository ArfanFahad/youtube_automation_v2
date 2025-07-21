const handleStatusTransition = (previous, current) => {
  if (previous === "ON" && current === "OFF") {
    console.log("Stream has ended. Someone please start it ASAP!");
    return "Stream has ended. Someone please start it ASAP!";
  }

  if (previous === "OFF" && current === "ON") {
    console.log("Someone started the live.");
    return "Someone started the live.";
  }

  if (previous === "ON" && current === "ON") {
    console.log("Stream is still ongoing.");
    return "Stream is still ongoing.";
  }

  if (previous === "OFF" && current === "OFF") {
    console.log("Stream is still OFF! Please start it!");
    return "Stream is still OFF! Please start it!";
  }

  return console.log("Returning null.", null);
};

export { handleStatusTransition };
