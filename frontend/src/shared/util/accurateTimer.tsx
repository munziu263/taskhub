const accurateTimer = (fn: any, timeInterval: number = 1000) => {

  let expectedInterval: number, timeoutID: NodeJS.Timeout
  let isRunning: boolean = false

  const run = () => {
    expectedInterval = Date.now() + timeInterval
    timeoutID = setTimeout(round, timeInterval)
    isRunning = true
    console.log("Timer started!")
  }

  const stop = () => {
    if (!isRunning) {
      return
    }
    clearTimeout(timeoutID)
    isRunning = false
    console.log("Timer stopped!");
  }

  const round = () => {
    let drift: number = Date.now() - expectedInterval
    fn()
    expectedInterval += timeInterval
    timeoutID = setTimeout(round, timeInterval - drift)
  }

  return {run, stop}
}

export { accurateTimer }