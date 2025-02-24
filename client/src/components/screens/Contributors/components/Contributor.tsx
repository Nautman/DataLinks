import { Component } from 'react'
import Moment from "moment"
import "./Contributor.css"
import { IReduxRootState } from 'state/reducers'
import { connect } from "react-redux"

class Contributor extends Component<PropsForComponent, StateForComponent> {

	fadeIn?: NodeJS.Timeout
	timeout?: NodeJS.Timeout
	constructor(props: PropsForComponent) {
		super(props)

		this.state = {
			hidden: true
		}
	}

	componentDidMount = () => {
		this.timeout = setTimeout(() => {
			let newState = { ...this.state }
			newState.hidden = false
			this.setState(newState)
		}, this.props.place * 100)
	}

	componentWillUnmount() {
		if (this.timeout)
			clearTimeout(this.timeout)
	}

	displayDate() {
		// Is the edit today?
		
		const editDate = Moment(this.props.contributor.updatedAt)
		if (editDate.diff(Moment().startOf("day")) > 0)
			return "Today " + editDate.format("HH:mm")
		else if (editDate.diff(Moment().subtract(1, "day").startOf("day")) > 0)
			return "Yesterday " + editDate.format("HH:mm")
		else
			return editDate.format("HH:mm DD/MM")
	}

	render() {
		const totalEdits = this.props.contributor.contributions.operations.creates + 
			this.props.contributor.contributions.operations.updates + 
			this.props.contributor.contributions.operations.deletes
		const containerWidth = 150		

		const createsWidth = containerWidth * (this.props.contributor.contributions.operations.creates / totalEdits)
		const updatesWidth = containerWidth * (this.props.contributor.contributions.operations.updates / totalEdits)
		const deletesWidth = containerWidth * (this.props.contributor.contributions.operations.deletes / totalEdits)

		return (
			<div className={`${this.state.hidden ? "hidden" : "contributorElementWrapper"}`}>
				<div className="contributor">
					<p className={`name`}>
						{this.props.place}. <span>{this.props.contributor.name ?? "Anonymous"}</span>
						{this.props.contributor.identifier.findIndex((current) => current === this.props.fingerprint) >= 0 ?
							<span className="contributorIsSelf">You</span> : null
						}
					</p>
					<p className="score">{this.props.contributor.contributionCount}</p>
					<p className="date">{this.displayDate()}</p>
				</div>
				<div className="editSummeryBar">
					{createsWidth > 0 ? 
						<div className="creates segment" style={{ width: createsWidth }} /> : 
						null
					}
					{updatesWidth > 0 ? 
						<div className="updates segment" style={{ width: updatesWidth }} /> :
						null
					}
					{deletesWidth > 0 ?
						<div className="deletes segment" style={{ width: deletesWidth }} /> :
						null
					}
				</div>
			</div>
		)
	}
}

export interface IContributor {
	name?: string,
	contributions: {
		operations: {
			creates: number,
			updates: number,
			deletes: number
		},
	},
	contributionCount: number,
	identifier: string[],
	updatedAt: string
}

interface PropsForComponent {
	place: number,
	contributor: IContributor,
	fingerprint?: string
}

interface StateForComponent {
	hidden: boolean
}

const reduxSelect = (state: IReduxRootState) => ({
	fingerprint: state.app.fingerprint
})

export default connect(reduxSelect)(Contributor)