export declare type InputConfiguration = {
    compound2simple?: Boolean;
    combinePath?: Boolean;
    hinting?: Boolean;
    deflate?: Boolean | null | Function;
    inflate?: Boolean | Function;
    formats?: String | String[];
    subset?: null | String | Number[];
};
export declare enum FontType {
    'ttf' = 0,
    'woff' = 1,
    'eot' = 2,
    'otf' = 3,
    'svg' = 4
}
export declare type FinalConfiguration = InputConfiguration & {
    type: FontType;
    subset: Number[];
    formats: FontType[];
};
