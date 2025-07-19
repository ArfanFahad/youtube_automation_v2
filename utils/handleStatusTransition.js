const handleStatusTransition = (previous, current) => {
  if (previous === "ON" && current === "OFF") {
    console.log("Stream has ended. Someone please start it ASAP!");
    return;
  }

  if (previous === "OFF" && current === "ON") {
    console.log("Someone started the live.");
    return;
  }

  if (previous === "ON" && current === "ON") {
    console.log("Stream is still ongoing.");
    return;
  }

  if (previous === "OFF" && current === "OFF") {
    console.log("Stream is still OFF! Please start it!");
    return;
  }

  return null;
};

export { handleStatusTransition };
