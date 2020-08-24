"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoXTable = AutoXTable;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _context = require("./context/context");

import React from "react";
var __jsx = React.createElement;
var useStyles = (0, _styles.makeStyles)({
  table: {
    minWidth: 500
  },
  height: "35px"
});

function createData(name, number, time, clazz, rawTimes, car, fastestIndex) {
  return {
    name: name,
    number: number,
    time: time,
    clazz: clazz,
    rawTimes: rawTimes,
    car: car,
    fastestIndex: fastestIndex
  };
}

function AutoXTable(props) {
  var data = props.data,
      name = props.name;

  var _useStateValue = (0, _context.useStateValue)(),
      _useStateValue2 = (0, _slicedToArray2.default)(_useStateValue, 2),
      maxRuns = _useStateValue2[0].maxRuns,
      dispatch = _useStateValue2[1];

  var rows = data.map(function (row) {
    return createData(row.name, row.number, row.time, row.clazz, row.rawTimes, row.car, row.fastestIndex);
  });
  var topPaxtime = null;

  if (rows && rows.length > 1 && name === 'PAX') {
    topPaxtime = rows[0].time;
  } else if (rows && name !== "RAW") {
    topPaxtime = rows[0].time;
  }

  var classes = useStyles();
  var position = 0;
  return __jsx(_react.default.Fragment, null, __jsx(_TableContainer.default, {
    component: _Paper.default
  }, __jsx("div", null, __jsx(_Table.default, {
    className: classes.table,
    "aria-label": "simple table"
  }, __jsx(_TableHead.default, null, __jsx(_TableRow.default, {
    style: {
      background: "gray"
    }
  }, __jsx(_TableCell.default, {
    style: {
      width: 25,
      color: "white"
    },
    align: "left"
  }, "Position"), __jsx(_TableCell.default, {
    style: {
      color: "white"
    }
  }, "Name"), __jsx(_TableCell.default, {
    style: {
      color: "white"
    },
    align: "left"
  }, "Number"), __jsx(_TableCell.default, {
    style: {
      color: "white"
    },
    align: "left"
  }, "Best"), __jsx(_TableCell.default, {
    style: {
      color: "white"
    },
    align: "left"
  }, "Diff"), new Array(maxRuns).fill().map(function (em, index) {
    return __jsx(_TableCell.default, {
      style: {
        color: "white"
      },
      align: "left"
    }, index + 1);
  }), topPaxtime && __jsx(_TableCell.default, {
    style: {
      color: "white"
    },
    align: "left"
  }, "DOTY Points"))), __jsx(_TableBody.default, null, rows.map(function (row, index) {
    position++;
    return __jsx(_TableRow.default, {
      style: index % 2 ? {
        background: "#f2f2f2"
      } : {}
    }, __jsx(_TableCell.default, {
      align: "left"
    }, position), __jsx(_TableCell.default, {
      onClick: function onClick() {
        return dispatch({
          type: "SELECTED_DRIVER",
          data: row
        });
      },
      component: "th",
      scope: "row"
    }, __jsx("div", {
      style: {
        color: "blue",
        cursor: "pointer"
      }
    }, row.name)), __jsx(_TableCell.default, {
      align: "left"
    }, row.number + " " + row.clazz.toUpperCase()), __jsx(_TableCell.default, {
      align: "left"
    }, row.time), __jsx(_TableCell.default, null, row && row.fastestIndex && row.rawTimes && index === 0 || !rows[index - 1] ? 0 : (rows[index - 1].time - row.time).toFixed(3)), new Array(maxRuns).fill().map(function (em, index) {
      if (row.fastestIndex === index) {
        return __jsx(_TableCell.default, {
          align: "left",
          style: {
            backgroundColor: "lightgreen"
          }
        }, row.rawTimes.length > index ? row.rawTimes[index] : "");
      } else {
        return __jsx(_TableCell.default, {
          align: "left"
        }, row.rawTimes.length > index ? row.rawTimes[index] : "");
      }
    }), topPaxtime && __jsx(_TableCell.default, null, (topPaxtime / row.time * 1000).toFixed(3)));
  }))))));
}