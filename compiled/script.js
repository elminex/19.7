function pad0(value) {
  let result = value.toString();

  if (result.length < 2) {
    result = `0${result}`;
  }

  return result;
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
      }
    };
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState(() => {
      this.state.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    });
  }

  print() {
    document.querySelector('.stopwatch').innerText = this.format(this.state.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  result() {
    const item = document.createElement('li');
    const list = document.querySelector('.results');

    if ((this.state.times.miliseconds !== 0 || this.state.times.seconds !== 0 || this.state.times.minutes !== 0) && (list.childNodes.length === 0 || list.lastChild.innerHTML !== this.format(this.state.times))) {
      item.innerHTML = this.format(this.state.times);
      list.appendChild(item);
    }
  }

  start() {
    if (!this.state.running) {
      this.setState(() => {
        this.state.running = true;
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.state.times.miliseconds += 1;

    if (this.state.times.miliseconds >= 100) {
      this.state.times.seconds += 1;
      this.state.times.miliseconds = 0;
    }

    if (this.state.times.seconds >= 60) {
      this.state.times.minutes += 1;
      this.state.times.seconds = 0;
    }
  }

  stop() {
    this.setState(() => {
      this.state.running = false;
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
    }, "Reset")), React.createElement("div", {
      className: "stopwatch"
    }, this.format(this.state.times)), React.createElement("div", {
      className: "results-wrapper"
    }, React.createElement("ul", {
      className: "results"
    }), React.createElement("button", {
      className: "button",
      id: "clear",
      onClick: () => {
        document.querySelector('.results').innerHTML = '';
      }
    }, "Clear")));
  }

}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));