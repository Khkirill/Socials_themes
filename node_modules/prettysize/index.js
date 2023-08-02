'use strict';
/*
Copyright (c) 2013, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/

var sizes = [
    'Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'
];

/**
Pretty print a size from bytes
@method pretty
@param {Number} size The number to pretty print
@param {Boolean} [nospace=false] Don't print a space
@param {Boolean} [one=false] Only print one character
@param {Number} [places=1] Number of decimal places to return
@param {Boolen} [numOnly] Return only the converted number and not size string
*/

module.exports = function (size, nospace, one, places, numOnly) {
    if (typeof nospace === 'object') {
        var opts = nospace;
        nospace = opts.nospace;
        one = opts.one;
        places = opts.places || 1;
        numOnly = opts.numOnly;
    } else {
        places = places || 1;
    }

    var mysize;

    for (var id = 0; id < sizes.length; ++id) {
        var unit = sizes[id];

        if (one) {
            unit = unit.slice(0, 1);
        }

        var s = Math.pow(1024, id);
        var fixed;
        if (size >= s) {
            fixed = String((size / s).toFixed(places));
            if (fixed.indexOf('.0') === fixed.length - 2) {
                fixed = fixed.slice(0, -2);
            }
            mysize = fixed + (nospace ? '' : ' ') + unit;
        }
    }

    // zero handling
    // always prints in Bytes
    if (!mysize) {
        var _unit = (one ? sizes[0].slice(0, 1) : sizes[0]);
        mysize = '0' + (nospace ? '' : ' ') + _unit;
    }

    if (numOnly) {
        mysize = Number.parseFloat(mysize);
    }

    return mysize;
};
