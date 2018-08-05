import React from 'react';

export default class  Number extends React.Component {
	render() {
		return (
			<button className="number" onClick={() => this.props.onClick()} disabled={this.props.value.isClicked}>
				{this.props.value.val}
			</button>
		);
	}
}