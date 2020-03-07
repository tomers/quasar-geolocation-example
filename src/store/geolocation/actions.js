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
  return new Promise((resolve, reject) => {
    const geolocation = navigator && navigator.geolocation
    if (!geolocation) {
      console.error('Geolocation object not available')
      reject('Geolocation object not available')
    }
    geolocation.getCurrentPosition(
      position => {
        const positionObj = cloneAsObject(position)
        context.commit('mutationSetPosition', { position: positionObj })
        resolve()
      },
      error => {
        console.error(`Failed getting geolocation: ${error.message}`)
        reject(error)
      })
  })
}

export function actionQueryPermission (context) {
  return new Promise((resolve, reject) => {
    navigator.permissions.query({ name: 'geolocation' })
      .then((result) => {
        // one of (granted, prompt, denied)
        context.commit('mutationSetPermission', { permission: result.state })
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}
