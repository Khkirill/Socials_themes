"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    acceptableTypes: ['ttf', 'woff', 'eot', 'otf', 'svg'],
    isAcceptableType(type) {
        return this.acceptableTypes.includes(type);
    },
    defaults: {
        compound2simple: false,
        combinePath: false,
        deflate: null,
        inflate: false,
        hinting: false,
        subset: null // array of ascii values
    },
    filterFormats({ formats, type }) {
        let fontFormats = [];
        if (formats && formats.length && Array.isArray(formats)) {
            fontFormats = formats.filter((type) => this.isAcceptableType(type));
        }
        if (!fontFormats.length) {
            fontFormats.push(type);
        }
        return fontFormats;
    },
    normalizeConf(options, sourceFormat) {
        const conf = Object.assign(this.defaults, options, {
            type: sourceFormat
        });
        // Filter formats from input
        conf.formats = this.filterFormats(conf);
        // Convert string with letters to ascii codes array
        if (typeof conf.subset === 'string') {
            conf.subset = this.stringToAscii(conf.subset);
        }
        return conf;
    },
    stringToAscii(letters) {
        return letters
            .split('') // make array
            .map((letter) => letter.charCodeAt(0)) //convert to ascii codes
            .filter((code, index, self) => {
            return self.indexOf(code) === index; // remove duplicates
        });
    }
};
