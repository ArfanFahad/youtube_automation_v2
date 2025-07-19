let prevState = null;

function getState() {
  return prevState;
}

function setStatus(status) {
  prevState = status;
}

export { getState, setStatus };
