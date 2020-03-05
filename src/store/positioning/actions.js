/*
export function someAction (context) {
}
*/

function cloneAsObject (obj) {
  if (obj === null || !(obj instanceof Object)) {
    return obj
  }
  const temp = {}
  for (var key in obj) {
    temp[key] = cloneAsObject(obj[key])
  }
  return temp
}

export function actionSamplePosition (context) {
  const geolocation = navigator && navigator.geolocation
  if (!geolocation) {
    console.error('Geolocation object not available')
    return
  }
  geolocation.getCurrentPosition(
    position => {
      const positionObj = cloneAsObject(position)
      context.commit('mutationSetPosition', { position: positionObj })
    },
    error => {
      console.error(`Failed getting geolocation: ${error.message}`)
      console.dir(error)
    })
}
