import { ActionType } from ".";
import { SubjectData } from "components/screens/Subjects/Subjects";
import { IFlagInterface } from "state/actions/app";

export interface IAppState {
	version: string
	lastVersion?: string
	sneakPeak?: SubjectData
	sneakPeakSelectionCount: number
	contributor?: string
	fingerprint?: string
	flags: IFlagInterface
}

const defaultState = {
	version: "",
	sneakPeak: undefined,
	sneakPeakSelectionCount: 0,
	flags: {
		editMode: false,
		extendedView: false,
		deadlineView: false,
		replaceCountdownWithDate: false
	}
}

const app = (state: IAppState = defaultState, action: ActionType<any>) => {
	let newState = { ...state };
	switch (action.type) {
		case 'ENABLE_EDIT_MODE':
			newState.flags.editMode = true;
			return newState
		case 'DISABLE_EDIT_MODE':
			newState.flags.editMode = false;
			return newState
		case 'SHOW_SNEAK_PEAK':
			newState.sneakPeak = action.payload.subject
			newState.sneakPeakSelectionCount = 1
			return newState
		case 'HIDE_SNEAK_PEAK':
			newState.sneakPeak = undefined
			newState.sneakPeakSelectionCount = 0
			return newState
		case 'SET_SNEAK_PEAK_SELECTION_COUNT':
			newState.sneakPeakSelectionCount += action.payload.newCount
			if (newState.sneakPeakSelectionCount <= 0) {
				newState.sneakPeak = undefined
				newState.sneakPeakSelectionCount = 0
			}
			return newState
		case 'SET_CONTRIBUTOR':
			newState.contributor = action.payload.name
			return newState
		case 'SET_EXTEND_VIEW_FLAG':
			newState.flags.extendedView = action.payload.mode
			return newState
		case 'SET_DEADLINE_VIEW_FLAG':
			newState.flags.deadlineView = action.payload.mode
			return newState
		case "SET_REPLACE_COUNTDOWN_WITH_DATE_FLAG":
			newState.flags.replaceCountdownWithDate = action.payload.value
			return newState
		case 'SET_FINGERPRINT':
			newState.fingerprint = action.payload.fingerprint
			return newState
		case 'SET_VERSION':
			newState.version = action.payload.version
			return newState
		case 'SET_LAST_VERSION':
			newState.lastVersion = action.payload.version
			return newState
		default:
			return newState
	}
}

export default app;