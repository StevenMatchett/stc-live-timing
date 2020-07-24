import React, { Component, PropTypes } from 'react';
import SortableTable from 'react-sortable-table';

const FamilyNameSorter = {
desc: (data, key) => {
    var result = data.sort(function (_a, _b) {
        const a = getFamilyName(_a[key]);
        const b = getFamilyName(_b[key]);
        if ( a <= b ) {
        return 1;
        } else if ( a > b) {
        return -1;
        }
    });
    return result;
    },
    
    asc: (data, key) => {
    return data.sort(function (_a, _b) {
        const a = getFamilyName(_a[key]);
        const b = getFamilyName(_b[key]);
        if ( a >= b ) {
        return 1;
        } else if ( a < b) {
        return -1;
        }
    })
    }
};

export const classTable = (props) => {
    return (
        <SortableTable
          data={this.state.data}
          columns={columns}
          style={style}
          iconStyle={iconStyle} />
    );
}