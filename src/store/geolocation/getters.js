export function getterIsPermissionKnown (state) {
  return state.permission !== null
}

export function getterIsPermissionGranted (state) {
  return state.permission === 'granted'
}

export function getterIsPermissionPrompt (state) {
  return state.permission === 'prompt'
}

export function getterIsPermissionDenied (state) {
  return state.permission === 'denied'
}

export function getterHasPosition (state) {
  return state.position && state.position.timestamp
}

export function getterTimestamp (state) {
  return state.position && state.position.timestamp
}

export function getterCoords (state) {
  return state.position && state.position.coords
}

export function getterLatitude (state, getters) {
  return getters.getterCoords && getters.getterCoords.latitude
}

export function getterLongitude (state, getters) {
  return getters.getterCoords && getters.getterCoords.longitude
}

export function getterAltitude (state, getters) {
  return getters.getterCoords && getters.getterCoords.altitude
}

export function getterAccuracy (state, getters) {
  return getters.getterCoords && getters.getterCoords.accuracy
}

export function getterAltitudeAccuracy (state, getters) {
  return getters.getterCoords && getters.getterCoords.altitudeAccuracy
}

export function getterHeading (state, getters) {
  return getters.getterCoords && getters.getterCoords.heading
}

export function getterSpeed (state, getters) {
  return getters.getterCoords && getters.getterCoords.speed
}
