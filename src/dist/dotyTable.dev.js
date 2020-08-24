"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotyTable = DotyTable;

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

function createData(name, sum) {
  return {
    name: name,
    sum: sum
  };
}

function DotyTable(props) {
  var data = props.data,
      onClose = props.onClose;
  var rows = data.map(function (row) {
    return createData(row.name, row.sum);
  });
  var classes = useStyles();
  var position = 0;
  return __jsx(_react.default.Fragment, null, __jsx("a", {
    href: "#",
    onClick: onClose
  }, "Back"), __jsx(_TableContainer.default, {
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
  }, "Score"))), __jsx(_TableBody.default, null, rows.map(function (row, index) {
    console.log(row);
    position++;
    return __jsx(_TableRow.default, {
      style: index % 2 ? {
        background: "#f2f2f2"
      } : {}
    }, __jsx(_TableCell.default, {
      align: "left"
    }, position), __jsx(_TableCell.default, {
      component: "th",
      scope: "row"
    }, __jsx("div", null, row.name)), __jsx(_TableCell.default, {
      align: "left"
    }, row.sum.toFixed(2)));
  }))))));
}