export default {
  timeoutPromise(ms: number, promise: Promise<any>): Promise<any> {
    // Create a promise that rejects in <ms> milliseconds
    const timeout = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Timed out in ${ms}ms.`)
      }, ms)
    })

    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout])
  },
}
