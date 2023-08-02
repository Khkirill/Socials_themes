import { FinalConfiguration, InputConfiguration, FontType } from './types';

module.exports = {
    acceptableTypes: ['ttf', 'woff', 'eot', 'otf', 'svg'],
    isAcceptableType(type: string): Boolean {
        return this.acceptableTypes.includes(type);
    },
    defaults: {
        compound2simple: false, // transform ttf compound glyph to simple
        combinePath: false, // for svg path
        deflate: null, // deflate function
        inflate: false, // inflate function for woff
        hinting: false, // save font hinting
        subset: null // array of ascii values
    },

    filterFormats({ formats, type }: FinalConfiguration): FontType[] {
        let fontFormats: FontType[] = [];
        if (formats && formats.length && Array.isArray(formats)) {
            fontFormats = formats.filter((type: FontType) =>
                this.isAcceptableType(type)
            );
        }
        if (!fontFormats.length) {
            fontFormats.push(type);
        }
        return fontFormats;
    },

    normalizeConf(
        options: InputConfiguration,
        sourceFormat: FontType
    ): FinalConfiguration {
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

    stringToAscii(letters: String): Number[] {
        return letters
            .split('') // make array
            .map((letter: String) => letter.charCodeAt(0)) //convert to ascii codes
            .filter((code: Number, index: Number, self: Number[]) => {
                return self.indexOf(code) === index; // remove duplicates
            });
    }
};
