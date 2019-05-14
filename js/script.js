/* eslint-disable react/no-multi-comp */
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = `0${result}`;
  }
  return result;
}
class Stopwatch extends React.Component {
  render() {
    return (
      <div className="stopwatch">
        {this.props.format(this.props.time)}
      </div>
    );
  }
}

class Result extends React.Component {
  get times() {
    if (this.props.results.length) {
      return this.props.results.map(time => <li>{time}</li>);
    }
  }

  render() {
    return (
      <div className="search-result">
        {this.times}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      },
      result: [],
    };
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      },
    });
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  result() {
    const list = document.querySelector('.results');
    if (
      (this.state.times.miliseconds !== 0 || this.state.times.seconds !== 0 || this.state.times.minutes !== 0)
      && (list.childNodes.length === 0 || this.state.result[this.state.result.length - 1] !== this.format(this.state.times))
    ) {
      this.setState(() => this.state.result.push((this.format(this.state.times))));
    }
  }

  start() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    this.setState((prevState) => {
      prevState.times.miliseconds += 1;
      if (this.state.times.miliseconds >= 100) {
        this.state.times.seconds += 1;
        this.state.times.miliseconds = 0;
      }
      if (this.state.times.seconds >= 60) {
        this.state.times.minutes += 1;
        this.state.times.seconds = 0;
      }
    });
  }

  stop() {
    this.setState({running: false });
    clearInterval(this.watch);
    this.result();
  }

  render() {
    return (
      <div className="container">
        <nav className="controls">
          <button className="button" id="start" onClick={this.start.bind(this)}>Start</button>
          <button className="button" id="stop" onClick={this.stop.bind(this)}>Stop</button>
          <button className="button" id="reset" onClick={this.reset.bind(this)}>Reset</button>
        </nav>
        <Stopwatch time={this.state.times} format={this.format} />

        <div className="results-wrapper">
          <ul className="results">
            <Result results={this.state.result} />
          </ul>
          <button className="button" id="clear" onClick={() => { this.setState({ result: [] }) }} >Clear</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
