"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiveTiming = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _service = require("./service/service");

var _table = require("./table");

require("./App.css");

var _time = require("./service/time");

var _Modal = require("./Modal");

var _dropdown = require("./Dropdown");

var _dotyTable = require("./dotyTable");

var _context3 = require("./context/context");

import React from "react";
var __jsx = React.createElement;
var paxMap = {
  ss: .822,
  fsp: .823,
  as: .819,
  bs: .814,
  cs: .809,
  ds: .806,
  es: .794,
  fs: .803,
  gs: .792,
  hs: .78,
  hcs: .792,
  ssr: .843,
  "xs-a": .844,
  "xs-b": .864,
  ev: .824,
  ssp: .853,
  asp: .849,
  bsp: .852,
  csp: .865,
  dsp: .842,
  esp: .839,
  fsf: .823,
  sts: .812,
  stx: .816,
  str: .827,
  stu: .828,
  sth: .813,
  ssc: .801,
  smf: .841,
  sm: .854,
  ssm: .875,
  xp: .88,
  bp: .867,
  cp: .851,
  dp: .866,
  ep: .85,
  fp: .868,
  hcr: .815,
  am: 1,
  bm: .962,
  cm: .893,
  dm: .895,
  em: .896,
  fm: .911,
  fsae: .963,
  km: .93,
  ja: .855,
  jb: .82,
  jc: .718,
  camc: .818,
  camt: .817,
  cams: .833
};

var getRaw = function getRaw(results) {
  var fixNovice = function fixNovice(times) {
    return times.map(function (time) {
      var runTime = time.time;
      var clazz = time.clazz.substring(1);

      if (runTime !== 999) {
        runTime = (time.time / paxMap[clazz]).toFixed(3);
      }

      var noviceTimes = time.rawTimes.map(function (time) {
        time = time.split("+")[0];
        return (time / paxMap[clazz]).toFixed(3);
      });
      return new _time.Time(time.clazz, time.name, runTime, time.number, noviceTimes, time.car, time.fastestIndex);
    });
  };

  var raw = [];
  Object.keys(results).forEach(function (clazz) {
    if (clazz === 'n') {
      raw = raw.concat(fixNovice(results[clazz]));
    } else {
      raw = raw.concat(results[clazz]);
    }
  });
  raw.sort(function (a, b) {
    return a.time - b.time;
  });
  return raw;
};

var getPax = function getPax(results) {
  var fixNovice = function fixNovice(times) {
    return times.map(function (time) {
      return new _time.Time(time.clazz, time.name, time.time, time.number, time.rawTimes, time.car, time.fastestIndex);
    });
  };

  var applyPax = function applyPax(times, clazz) {
    return times.map(function (time) {
      return new _time.Time(time.clazz, time.name, (time.time * paxMap[clazz]).toFixed(3), time.number, time.rawTimes, time.car, time.fastestIndex);
    });
  };

  var raw = [];
  Object.keys(results).forEach(function (clazz) {
    if (clazz === 'n') {
      raw = raw.concat(fixNovice(results[clazz]));
    } else {
      raw = raw.concat(applyPax(results[clazz], clazz));
    }
  });
  raw.sort(function (a, b) {
    return a.time - b.time;
  });
  return raw;
};

var LiveTiming = function LiveTiming(props) {
  var _useState = (0, _react.useState)(),
      data = _useState[0],
      setData = _useState[1];

  var _useState2 = (0, _react.useState)(""),
      classes = _useState2[0],
      setClasses = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      topPax = _useState3[0],
      setTopPax = _useState3[1];

  var _useState4 = (0, _react.useState)(null),
      dotyData = _useState4[0],
      setDoty = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      showDoty = _useState5[0],
      setShowDoty = _useState5[1];

  var getData =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(promise) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return promise;

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var checkurl = function checkurl() {
    if (window.location.search && window.location.search.includes("?class=")) {
      var val = window.location.search.replace("?class=", "").trim();

      if (Object.keys(paxMap).includes(val)) {
        dispatch({
          type: "UPDATE_DROPDOWN",
          data: val
        });
      } else if (val === "RAW") {
        dispatch({
          type: "UPDATE_DROPDOWN",
          data: val
        });
      }
    } else {
      dispatch({
        type: "UPDATE_DROPDOWN",
        data: "PAX"
      });
    }
  };

  var calculateDOTY = function calculateDOTY(dotyRes, pax) {
    pax.forEach(function (driver) {
      if (dotyRes[driver['name']]) {
        var currentPointsForEvent = (pax[0].time / driver.time * 1000).toFixed(2);

        if (dotyRes[driver['name']].lowTime < currentPointsForEvent) {
          if (dotyRes[driver['name']].totalTimes == 6) {
            dotyRes[driver['name']].points.pop();
            dotyRes[driver['name']].points.push(currentPointsForEvent);
          } else {
            dotyRes[driver['name']].points.push(currentPointsForEvent);
          }
        }
      }
    });

    var reducer = function reducer(accumulator, currentValue) {
      return parseFloat(accumulator) + parseFloat(currentValue);
    };

    Object.keys(dotyRes).forEach(function (driver) {
      dotyRes[driver].sum = dotyRes[driver].points.reduce(reducer);
    });
    var arr = Object.keys(dotyRes).map(function (driver) {
      return dotyRes[driver];
    });
    arr = arr.sort(function (a, b) {
      return a.sum > b.sum;
    });
    setDoty(arr);
    console.log(arr);
  };

  var _useStateValue = (0, _context3.useStateValue)(),
      _useStateValue2 = (0, _slicedToArray2.default)(_useStateValue, 2),
      _useStateValue2$ = _useStateValue2[0],
      dropdown = _useStateValue2$.dropdown,
      conesHit = _useStateValue2$.conesHit,
      runCount = _useStateValue2$.runCount,
      dispatch = _useStateValue2[1];

  (0, _react.useEffect)(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var results, dotyResults, raw, pax, classList;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return getData((0, _service.getTiming)("https://api.allorigins.win/get?url=stcsolo.com/live/results_live.htm?cache=" + new Date().getTime(), dispatch));

              case 2:
                results = _context2.sent;
                _context2.next = 5;
                return getData((0, _service.getDOTY)("https://api.allorigins.win/get?url=stcsolo.com/wp-content/uploads/2020/08/2020_event8_paxpoints_6scores.htm?cache=" + new Date().getTime(), dispatch));

              case 5:
                dotyResults = _context2.sent;
                raw = getRaw(results);
                pax = getPax(results);
                results['RAW'] = raw;
                results['PAX'] = pax;
                setTopPax(results['PAX'][0].time);
                setData(results);
                classList = Object.keys(results);
                classList = ["PAX", "RAW"].concat((0, _toConsumableArray2.default)(classList.slice(0, classList.length - 2)));
                setClasses(classList);
                checkurl();
                calculateDOTY(dotyResults, pax);

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
  }, []);

  window.onpopstate = function (e) {
    return checkurl();
  };

  return __jsx(_react.default.Fragment, null, data && classes && dropdown && !showDoty && __jsx("div", null, __jsx(_Modal.DriverModal, null), __jsx(_dropdown.Dropdown, {
    clazzes: classes
  }), __jsx("a", {
    style: {
      float: "right",
      paddingRight: "1em",
      paddingTop: "1em"
    },
    href: "mailto:gosefroba22@gmail.com"
  }, "Issue or Suggestion?"), __jsx("br", null), __jsx("a", {
    style: {
      float: "right",
      paddingRight: "1em",
      paddingTop: "1em"
    },
    onClick: function onClick() {
      setShowDoty(true);
    },
    href: "#"
  }, "Show Live DOTY"), dropdown !== 'PAX' && dropdown !== 'RAW' ? __jsx("div", null, __jsx("br", null), __jsx("div", null, "Time needed to match top PAX: ", (topPax / paxMap[dropdown]).toFixed(3))) : __jsx("div", null, __jsx("br", null), __jsx("div", null, "Number of runs: ", runCount, " "), __jsx("div", null, "Cones hit: ", conesHit)), __jsx(_table.AutoXTable, {
    class: "col",
    data: data[dropdown],
    name: dropdown,
    topPax: topPax
  })), data && classes && dropdown && showDoty && dotyData && __jsx(_dotyTable.DotyTable, {
    data: dotyData,
    onClose: function onClose() {
      setShowDoty(false);
    }
  }));
};

exports.LiveTiming = LiveTiming;