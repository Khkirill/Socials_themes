export type InputConfiguration = {
    compound2simple?: Boolean;
    combinePath?: Boolean;
    hinting?: Boolean;
    deflate?: Boolean | null | Function;
    inflate?: Boolean | Function;
    formats?: String | String[];
    subset?: null | String | Number[];
};

export enum FontType {
    'ttf',
    'woff',
    'eot',
    'otf',
    'svg'
}

export type FinalConfiguration = InputConfiguration & {
    type: FontType;
    subset: Number[];
    formats: FontType[];
};


