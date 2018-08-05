import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game
	challengeRange={[2,9]}
	challengeSize={6}
	answerSize={4}
	timer={15}
/>, document.getElementById('root'));
registerServiceWorker();