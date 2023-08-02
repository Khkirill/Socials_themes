const config = require('../lib/config');

describe('font type validation tests', () => {
    test('should accept woff font', () => {
        expect(config.isAcceptableType('woff')).toBeTruthy();
    });
    test('should accept ttf font', () => {
        expect(config.isAcceptableType('ttf')).toBeTruthy();
    });
    test('should reject woff2 font', () => {
        expect(config.isAcceptableType('woff2')).toBeFalsy();
    });
});

describe('normalize config tests', () => {
    test('should accept null options parameter', () => {
        expect(() => config.normalizeConf(null, 'ttf')).not.toThrow();
    });

    test('should match object', () => {
        expect(
            config.normalizeConf(
                {
                    compound2simple: true,
                    combinePath: true,
                    deflate: null,
                    inflate: false,
                    hinting: false,
                    subset: [66, 67, 68, 69],
                    formats: ['ttf', 'eot', 'woff']
                },
                'eot'
            )
        ).toEqual(
            expect.objectContaining({
                compound2simple: true,
                combinePath: true,
                deflate: null,
                inflate: false,
                hinting: false,
                type: 'eot',
                subset: [66, 67, 68, 69],
                formats: ['ttf', 'eot', 'woff']
            })
        );
    });
    test('should filter formats', () => {
        expect(
            config.normalizeConf(
                {
                    formats: ['ttf', 'eot', 'woff', 'woff2', 'zip', 'otf']
                },
                'woff'
            )
        ).toEqual(
            expect.objectContaining({
                type: 'woff',
                formats: ['ttf', 'eot', 'woff', 'otf']
            })
        );
    });
    test('should use default format', () => {
        expect(
            config.normalizeConf(
                {
                    formats: ['zip']
                },
                'ttf'
            )
        ).toEqual(
            expect.objectContaining({
                type: 'ttf',
                formats: ['ttf']
            })
        );
    });
});
describe('subset conversion tests', () => {
    test('should make array from string', () => {
        expect(config.stringToAscii('azzzertyyyy')).toEqual([
            97,
            122,
            101,
            114,
            116,
            121
        ]);
    });
});
describe('filter tests', () => {
    test('should filter inappropriate formats', () => {
        expect(config.filterFormats({formats:['ttf', 'woff', 'woff2'], type:'ttf'}))
        .toEqual([
            'ttf', 'woff'
        ])
    })
    test('should create array from string', () => {
        expect(config.filterFormats({type:'ttf'})).toEqual([
            'ttf'
        ])
    })
    test('should chose proper type', () => {

        expect(config.filterFormats({formats:['zip'],type:'ttf'})).toEqual([
            'ttf'
        ])
    })
});
