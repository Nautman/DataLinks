import React, { Component } from 'react'
import { IReduxRootState } from '../../../../state/reducers'
import RenderData from '../../../templates/RenderData'
import { SubjectData } from '../Subjects'
import { connect } from 'react-redux'

import "./SneakPeak.css"
import { IAppState } from '../../../../state/reducers/app'
import { hideSneakPeak, IHideSneakPeak, ISetSneakPeakSelectionCount, IShowSneakPeak, setSneakPeakSelectionCount, showSneakPeak } from '../../../../state/actions/app'

class SneakPeak extends Component<PropsForComponent, StateForComponent> {

	constructor(props: PropsForComponent) {
		super(props)

		this.state = {
			eventsAllowed: false
		}
	}

	_mouseEnter = () => {
		this.props.setSneakPeakSelectionCount(this.props.app.sneakPeakSelectionCount + 1)
	}

	_mouseLeave = () => {
		this.props.setSneakPeakSelectionCount(this.props.app.sneakPeakSelectionCount - 1)
	}

	render() {
		if (this.props.app.sneakPeak?.group == null) {
			console.warn("Subject " + this.props.app.sneakPeak?.name + " has no root")
			return null;
		}

		return (
			<div 
				className="SneakPeakWrapper" 
				onMouseEnter={this._mouseEnter}
				onMouseLeave={this._mouseLeave}
			>
				<div className="ContentContainer">
					<RenderData 
						updateSubjects={this.props.updateSubjects}
						group={(this.props.app.sneakPeak as SubjectData).group}
					/>
				</div>
			</div>
		)
	}
}

export interface PropsForComponent {
	showSneakPeak: IShowSneakPeak,
	hideSneakPeak: IHideSneakPeak,
	updateSubjects: () => void,
	setSneakPeakSelectionCount: ISetSneakPeakSelectionCount,
	app: IAppState
}

export interface StateForComponent {
	eventsAllowed: boolean
}

const reduxSelect = (state: IReduxRootState) => {
	return {
		app: state.app
	}
}

const reduxDispatch = () => {
	return {
		setSneakPeakSelectionCount,
		showSneakPeak,
		hideSneakPeak
	}
}

export default connect(reduxSelect, reduxDispatch())(SneakPeak)