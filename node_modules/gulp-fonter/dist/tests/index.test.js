"use strict";
const fonter = require('../index');
const fs = require('fs');
const VinylFile = require('vinyl');
const Font = require('fonteditor-core').Font;
describe('Integration tests', () => {
    const fileDir = __dirname + '/Roboto-Regular.ttf';
    const fakeFile = new VinylFile({
        contents: fs.readFileSync(fileDir),
        path: fileDir,
    });
    test('should match format extensions', done => {
        let myFonter = fonter();
        myFonter.write(fakeFile);
        myFonter.once('data', function (file) {
            // make sure it came out the same way it went in
            expect(file.isBuffer());
            expect(file.extname).toEqual('.ttf');
            done();
        });
    });
    test('should create 3 files', done => {
        let fontFormats = ['ttf', 'woff', 'eot'];
        let myFonter = fonter({ formats: fontFormats });
        myFonter.write(fakeFile);
        let onFile = jest.fn();
        myFonter.on('data', (file) => {
            // expect file matching filetypes
            expect(fontFormats.includes(file.extname.substring(1)));
            onFile();
        });
        myFonter.on('end', () => {
            // expect to be created 3 files
            expect(onFile).toBeCalledTimes(fontFormats.length);
            done();
        });
        myFonter.end();
    });
    test('should cut out glyphs', done => {
        let myStringSubset = 'abcdef';
        let myFonter = fonter({ subset: myStringSubset });
        myFonter.write(fakeFile);
        myFonter.once('data', (file) => {
            // Read font to get info
            let font = Font.create(file.contents, {
                type: 'ttf',
                subset: myStringSubset
            });
            // Glyphs count should be equal
            expect(Object.keys(font.data.cmap).length).toEqual(myStringSubset.length);
            // Glyphs ascii codes should match
            expect(Object.keys(font.data.cmap)).toEqual(myStringSubset.split('').map(l => l.charCodeAt(0).toString()));
            done();
        });
    });
});
