import React, { ReactElement } from "react";

export class Cell extends React.Component<{ color: string, onclick?: (x: number, y: number) => void, x: number, y: number }> {
	render(): ReactElement {
		return (
			<div className="cell" onClick={() => this.props.onclick ? this.props.onclick(this.props.x, this.props.y) : () => { return false }}>
				<div className="cell-circle" style={{ backgroundColor: this.props.color }} />
			</div >
		)
	}
}