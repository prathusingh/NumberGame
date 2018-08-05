import React from 'react';
import Number from './number';
import sampleSize from 'loadash';

const randomNumberBetween = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export default class Game extends React.Component {
	challengeNumbers = Array.from({length: this.props.challengeSize}).map(() => {
		return randomNumberBetween(...this.props.challengeRange)
	});

	constructor(props) {
		super(props);
		this.state = {
			directionsText: `You will have 10 seconds to click the ${props.answerSize} correct numbers once you click Start`,
			sum: 0,
			clickCount: 0,
			buttonsState: this.challengeNumbers.map((val) => {
				return {
					val: val,
					isClicked: false
				}
			}),
			target: sampleSize(this.challengeNumbers, props.challengeSize - 2).reduce((acc,curr) => {
				acc + curr;
			}, 0)
		}
	}

	renderButton(i) {
		return(
			<Number value={this.state.buttonsState[i]} onClick={() => this.handleClick(i)} />
		);
	}

	handleClick(btnIndex) {
		let clickCount  = this.state.clickCount + 1;
		if (clickCount > 4) {
			this.setState({directionsText: 'Ah, You lost mate! Click start to play again'});
		} else {
			this.setState({clickCount});
			let buttonsState = this.state.buttonsState.slice();
			buttonsState[btnIndex].isClicked = true;
			this.state.sum += buttonsState[btnIndex].val;

			this.setState({buttonsState});
		}
	}


	onStart() {
		this.setState({directionsText: `You will have 10 seconds to click the ${this.props.answerSize} correct numbers once you click Start`});
		this.setState({timerVal: 0});
		let timeout = setInterval(() => {
			this.setState({timerVal: this.state.timerVal + 1});
			if (this.state.timerVal === 10) {
        this.setState({directionsText: 'Ah, You lost mate! Click start to play again'});
        clearInterval(timeout);
			}
		}, 1000);
	}

	render() {
		return (
			<div className="game">
				<p className="direction-text">
					{this.state.directionsText}
				</p>
				<div className="target">
					{this.state.target}
				</div>
				<div className="row">
					{this.renderButton(0)}
					{this.renderButton(1)}
				</div>
				<div className="row">
					{this.renderButton(2)}
					{this.renderButton(3)}
				</div>
				<div className="row">
					{this.renderButton(4)}
					{this.renderButton(5)}
				</div>
				<div className="footer">
					<span className="timer">{this.props.timer}</span>
					<button className="start" onClick={() => this.onStart()}>Start</button>
				</div>
			</div>
		);
	}
}