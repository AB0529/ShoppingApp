import { createGlobalState } from "react-hooks-global-state"

const state = {
	cartCount: 0
}

const { setGlobalState, useGlobalState } = createGlobalState(state);
export { setGlobalState, useGlobalState };