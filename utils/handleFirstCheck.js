const handleFirstCheck = (status) => {
  if (status === "ON") {
    return "Checking for the first time, A stream is ongoing";
  }
  if (status === "OFF") {
    console.log("First check: Stream is not running.");
    return null;
  }
};

export { handleFirstCheck };
