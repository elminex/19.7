/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-multi-comp */
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = `0${result}`;
  }
  return result;
}
class Stopwatch extends React.PureComponent {
  render() {
    return (
      <div className="stopwatch">
        {this.props.time}
      </div>
    );
  }
}

class Result extends React.Component {
  get times() {
    if (this.props.results.length) {
      return this.props.results.map((time, index) => <li key={index}>{time}</li>);
    }
  }

  render() {
    return (
      <ul className="results">
        {this.times}
      </ul>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watch: 0,
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      },
      result: [],
    };
    this.currTime = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    };
  }

  reset() {
    this.currTime = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    };
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      },
    });
  }

  format(time) {
    return `${pad0(time.minutes)}:${pad0(time.seconds)}:${pad0(Math.floor(time.miliseconds))}`;
  }

  result() {
    if (
      (this.state.times.miliseconds !== 0 || this.state.times.seconds !== 0 || this.state.times.minutes !== 0)
      && (this.state.result.length === 0 || this.state.result[this.state.result.length - 1] !== this.format(this.state.times))
    ) {
      this.setState(() => this.state.result.push((this.format(this.state.times))));
    }
  }

  start() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.state.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    this.currTime.miliseconds += 1;
    if (this.currTime.miliseconds >= 100) {
      this.currTime.seconds += 1;
      this.currTime.miliseconds = 0;
    }
    if (this.currTime.seconds >= 60) {
      this.currTime.minutes += 1;
      this.currTime.seconds = 0;
    }
    this.setState({
      times: {
        minutes: this.currTime.minutes,
        seconds: this.currTime.seconds,
        miliseconds: this.currTime.miliseconds,
      }
    });
  }

  stop() {
    if (this.state.running) {
      this.setState({ running: false });
      clearInterval(this.state.watch);
      this.result();
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="controls">
          <button className="button" id="start" onClick={this.start.bind(this)}>Start</button>
          <button className="button" id="stop" onClick={this.stop.bind(this)}>Stop</button>
          <button className="button" id="reset" onClick={this.reset.bind(this)}>Reset</button>
        </nav>
        <Stopwatch time={this.format(this.state.times)} />
        <div className="results-wrapper">
          <Result results={this.state.result} />
          <button className="button" id="clear" onClick={() => { this.setState({ result: [] }) }} >Clear</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
