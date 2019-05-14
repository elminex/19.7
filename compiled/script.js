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
    return React.createElement("div", {
      className: "stopwatch"
    }, this.props.time);
  }

}

class Result extends React.Component {
  get times() {
    if (this.props.results.length) {
      return this.props.results.map(time => React.createElement("li", null, time));
    }
  }

  render() {
    return React.createElement("ul", {
      className: "results"
    }, this.times);
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
        miliseconds: 0
      },
      result: []
    };
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  result() {
    if ((this.state.times.miliseconds !== 0 || this.state.times.seconds !== 0 || this.state.times.minutes !== 0) && (this.state.result.length === 0 || this.state.result[this.state.result.length - 1] !== this.format(this.state.times))) {
      this.setState(() => this.state.result.push(this.format(this.state.times)));
    }
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    this.setState(prevState => {
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
    this.setState({
      running: false
    });
    clearInterval(this.watch);
    this.result();
  }

  render() {
    return React.createElement("div", {
      className: "container"
    }, React.createElement("nav", {
      className: "controls"
    }, React.createElement("button", {
      className: "button",
      id: "start",
      onClick: this.start.bind(this)
    }, "Start"), React.createElement("button", {
      className: "button",
      id: "stop",
      onClick: this.stop.bind(this)
    }, "Stop"), React.createElement("button", {
      className: "button",
      id: "reset",
      onClick: this.reset.bind(this)
    }, "Reset")), React.createElement(Stopwatch, {
      time: this.format(this.state.times)
    }), React.createElement("div", {
      className: "results-wrapper"
    }, React.createElement(Result, {
      results: this.state.result
    }), React.createElement("button", {
      className: "button",
      id: "clear",
      onClick: () => {
        this.setState({
          result: []
        });
      }
    }, "Clear")));
  }

}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));