import { AppInitialState, appReducer, setAppError, setAppStatus } from "app/appSlice"

let startState: AppInitialState

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppError({ error: "some error" }))

  expect(endState.error).toBe("some error")
})
test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatus({ status: "failed" }))

  expect(endState.status).toBe("failed")
})
