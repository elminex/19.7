"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function pad0(value) {
  var result = value.toString();

  if (result.length < 2) {
    result = "0".concat(result);
  }

  return result;
}

var Stopwatch =
/*#__PURE__*/
function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    }
  }, {
    key: "print",
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: "format",
    value: function format(times) {
      return "".concat(pad0(times.minutes), ":").concat(pad0(times.seconds), ":").concat(pad0(Math.floor(times.miliseconds)));
    }
  }, {
    key: "result",
    value: function result() {
      var item = document.createElement('li');
      var list = document.querySelector('.results');

      if ((this.times.miliseconds !== 0 || this.times.seconds !== 0 || this.times.minutes !== 0) && (list.childNodes.length === 0 || list.lastChild.innerHTML !== this.format(this.times))) {
        item.innerHTML = this.format(this.times);
        list.appendChild(item);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
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
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }]);

  return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
  stopwatch.reset();
});
var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
  resetButton.classList.add('disabled');
  resetButton.disabled = true;
  stopwatch.start();
});
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  resetButton.classList.remove('disabled');
  resetButton.disabled = false;
  stopwatch.stop();
  stopwatch.result();
});
var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
  document.querySelector('.results').innerHTML = '';
});