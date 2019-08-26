export function exists(object) {
  return object !== null && object !== undefined;
}

export function roundToSpecifiedPlaces(number, places) {
  return Math.round(number * Math.pow(10, places)) / Math.pow(10, places);
}

export function snooze(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isEmpty(obj) {
  if (obj === "" || obj === {} || obj === []) return false;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

//Method for checking if object is empty
export function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function existsAndIsNotEmpty(object) {
  return exists(object) && !isObjectEmpty(object);
}
