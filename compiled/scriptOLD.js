function pad0(value) {
  let result = value.toString();

  if (result.length < 2) {
    result = `0${result}`;
  }

  return result;
}

class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  result() {
    const item = document.createElement('li');
    const list = document.querySelector('.results');

    if ((this.times.miliseconds !== 0 || this.times.seconds !== 0 || this.times.minutes !== 0) && (list.childNodes.length === 0 || list.lastChild.innerHTML !== this.format(this.times))) {
      item.innerHTML = this.format(this.times);
      list.appendChild(item);
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
    console.log(this.watch);
  }

  calculate() {
    this.times.miliseconds += 1;

    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }

    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
  stopwatch.reset();
});
const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
  resetButton.classList.add('disabled');
  resetButton.disabled = true;
  stopwatch.start();
});
const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
  resetButton.classList.remove('disabled');
  resetButton.disabled = false;
  stopwatch.stop();
  stopwatch.result();
});
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  document.querySelector('.results').innerHTML = '';
});
/*
render() {
  return (
    <div className='container'>
      <nav className='controls'>
        <button className='button' id='start' onClick={this.start.bind(this)}>Start</button>
        <button className='button' id='stop' onClick={this.stop.bind(this)}>Stop</button>
        <button className='button' id='reset' onClick={this.reset.bind(this)}>Reset</button>
      </nav>
      <div className='stopwatch'></div>
      <div className='results-wrapper'>
        <ul className='results'>
        </ul>
        <button className='button' id='clear' >Clear</button>
      </div>
    </div>
  );
}
}
*/