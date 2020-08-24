"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTiming = exports.getDOTY = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _time = require("./time");

var axios = require('axios');

var getDOTY =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(url, dispatch) {
    var res, parser, doc, data, startSkipping;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.get(url);

          case 2:
            res = _context.sent;
            parser = new DOMParser();
            doc = parser.parseFromString(res.data.contents, "text/html");
            data = {};
            startSkipping = false;
            doc.querySelectorAll("body > table:nth-child(6) > tbody > tr").forEach(function (tr) {
              if (startSkipping) {
                return;
              }

              var trs = tr.querySelectorAll('td');
              trs = Array.prototype.slice.call(trs);
              var name = trs[1].innerText;
              trs = trs.slice(4);
              var points = trs.map(function (point) {
                return parseFloat(point.innerText);
              });
              points = points.filter(function (a) {
                return !isNaN(a);
              });
              startSkipping = points.length < 5 ? true : false;

              if (startSkipping) {
                return;
              }

              points = points.sort(function (a, b) {
                return b - a;
              });
              points = points.slice(0, 6);
              var lowTime = 0;

              if (points.length > 5) {
                lowTime = points[5];
              }

              data[name] = {
                name: name,
                lowTime: lowTime,
                totalTimes: points.length,
                points: points
              };
            });
            return _context.abrupt("return", data);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDOTY(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getDOTY = getDOTY;

var getTiming =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(url, dispatch) {
    var res, parser, doc, data, currentClass, maxNumberOfRuns, conesHit, numberOfRun;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.get(url);

          case 2:
            res = _context2.sent;
            parser = new DOMParser();
            doc = parser.parseFromString(res.data.contents, "text/html");
            data = {};
            currentClass = "";
            maxNumberOfRuns = 0;
            conesHit = 0;
            numberOfRun = 0;
            doc.querySelectorAll("body > a > table:nth-child(4) > tbody > tr").forEach(function (tr) {
              if (tr.querySelector("th")) {
                currentClass = tr.querySelector("a").name;
                data[currentClass] = [];
              } else {
                var clazz = tr.querySelector("td:nth-child(2)").innerText;
                var number = tr.querySelector("td:nth-child(3)").innerText;
                var name = tr.querySelector("td:nth-child(4)").innerText;
                var car = tr.querySelector("td:nth-child(5)").innerText;
                var times = Array.prototype.slice.call(tr.querySelectorAll("td:nth-child(n+7)"));
                times = times.slice(0, times.length - 2);
                var actualTimes = [];
                var rawTimes = [];
                var fastest = 999;
                var fastestIndex = -1;
                times.forEach(function (timeHtml, index) {
                  var time = timeHtml.innerText.split("+").map(function (s) {
                    return s.trim();
                  });
                  rawTimes.push(timeHtml.innerText.trim());

                  if (time.length === 1) {
                    if (time[0] === "") {
                      return;
                    }

                    var raw = parseFloat(time, 10);
                    actualTimes.push(raw);
                    numberOfRun++;

                    if (raw < fastest) {
                      fastest = raw;
                      fastestIndex = index;
                    }
                  } else if (time.length === 2) {
                    if (time[1] === "dnf" || time[1] === "dns") {
                      actualTimes.push(999);
                      return;
                    }

                    var cones = parseFloat(time[1], 10);
                    if (isNaN(cones)) cones = 0;

                    var _raw = parseFloat(time, 10) + cones * 2;

                    conesHit += cones;
                    numberOfRun++;
                    actualTimes.push(_raw);

                    if (_raw < fastest) {
                      fastest = _raw;
                      fastestIndex = index;
                    }
                  }
                });
                var bestTime = actualTimes.sort(function (a, b) {
                  return a - b;
                })[0];
                data[currentClass].push(new _time.Time(clazz, name, bestTime, number, rawTimes, car, fastestIndex));

                if (rawTimes.length > maxNumberOfRuns) {
                  maxNumberOfRuns = rawTimes.length;
                }
              }
            });
            dispatch({
              type: "RUNS_AND_CONES",
              data: {
                conesHit: conesHit,
                runCount: numberOfRun,
                maxRuns: maxNumberOfRuns
              }
            });
            return _context2.abrupt("return", data);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTiming(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTiming = getTiming;