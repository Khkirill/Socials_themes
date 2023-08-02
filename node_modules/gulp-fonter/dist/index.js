"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Transform } = require('stream');
const { Font } = require('fonteditor-core');
const config = require('./lib/config');
module.exports = function (options = {}) {
    const transformStream = new Transform({ objectMode: true });
    transformStream._transform = function (source, encoding, callback) {
        const fontType = source.extname.substr(1);
        // Check if font type is proper
        if (!config.isAcceptableType(fontType)) {
            console.log(fontType, 'is not accepted type of font. Will just copy file');
            return callback(null, source);
        }
        const normalizedConf = config.normalizeConf(options, fontType);
        const fontBuffer = source.contents;
        try {
            var font = Font.create(fontBuffer, normalizedConf);
            for (let type of normalizedConf.formats) {
                //clone file
                const newFont = source.clone();
                newFont.path = source.dirname + '\\' + source.stem + '.' + type;
                //convert font buffer
                newFont.contents = font.write(config.normalizeConf(normalizedConf, type));
                this.push(newFont); // add new file to stream
            }
            callback();
        }
        catch (e) {
            //Fallback: copy original file;
            console.log(e.message, 'on', source.basename, '- Will just copy file');
            return callback(null, source);
        }
    };
    return transformStream;
};
