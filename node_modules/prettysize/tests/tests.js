var assert = require('assert'),
    pretty = require('../index');

describe('prettysize', function () {

    it('should export a function', function () {
        assert.ok(pretty);
    });

    it('should print bytes', function () {
        assert.equal(pretty(12), '12 Bytes');
    });

    it('should print bytes with no space', function () {
        assert.equal(pretty(12, true), '12Bytes');
    });
    
    it('should print bytes with no space and one char', function () {
        assert.equal(pretty(12, true, true), '12B');
    });

    it('should print bytes with space and one char', function () {
        assert.equal(pretty(12, false, true), '12 B');
    });
    
    it('should print kilobytes', function () {
        assert.equal(pretty(123456), '120.6 kB');
    });
    
    it('should print exact kilobytes', function () {
        assert.equal(pretty(1024), '1 kB');
    });
    
    it('should print megs', function () {
        assert.equal(pretty(123456789), '117.7 MB');
    });
    
    it('should print exact megs', function () {
        assert.equal(pretty(1024 * 1024), '1 MB');
    });
    
    it('should print gigs', function () {
        assert.equal(pretty(12345678901), '11.5 GB');
    });

    it('should print exact gigs', function () {
        assert.equal(pretty(1024 * 1024 * 1024), '1 GB');
    });
    
    it('should print teras', function () {
        assert.equal(pretty(1234567890123), '1.1 TB');
    });

    it('should print exact teras', function () {
        assert.equal(pretty(1024 * 1024 * 1024 * 1024), '1 TB');
    });
    
    it('should print petas', function () {
        assert.equal(pretty(1234567890123456), '1.1 PB');
    });
    
    it('should print exact petas', function () {
        assert.equal(pretty(1024 * 1024 * 1024 * 1024 * 1024), '1 PB');
    });
    
    it('should print exabyte', function () {
        assert.equal(pretty(1234567890123456789), '1.1 EB');
    });
    
    it('should print exact exobyte', function () {
        assert.equal(pretty(1024 * 1024 * 1024 * 1024 * 1024 * 1024), '1 EB');
    });

    it('should print zero bytes', function () {
        assert.equal(pretty(0), '0 Bytes');
    });

    it('should print zero bytes with no space', function () {
        assert.equal(pretty(0, true), '0Bytes');
    });

    it('should print zero bytes with no space [opts]', function () {
        assert.equal(pretty(0, {nospace: true}), '0Bytes');
    });

    it('should print zero bytes with no space and one char', function () {
        assert.equal(pretty(0, true, true), '0B');
    });

    it('should print zero bytes with no space and one char [opts]', function () {
        assert.equal(pretty(0, {nospace: true, one: true}), '0B');
    });

    it('should print zero bytes with space and one char', function () {
        assert.equal(pretty(0, false, true), '0 B');
    });

    it('should print zero bytes with space and one char [opts]', function () {
        assert.equal(pretty(0, {one: true}), '0 B');
    });

    it('should print, two decimal places', function () {
        assert.equal(pretty(123456789, false, false, 2), '117.74 MB');
    });

    it('should print, two decimal places [opts]', function () {
        assert.equal(pretty(123456789, {places: 2}), '117.74 MB');
    });

    it('should print three decimal places', function () {
        assert.equal(pretty(123456789, false, false, 3), '117.738 MB');
    });

    it('should print three decimal places [opts]', function () {
        assert.equal(pretty(123456789, {places: 3}), '117.738 MB');
    });

    it('should print three decimal places no space [opts]', function () {
        assert.equal(pretty(123456789, {nospace: true, places: 3}), '117.738MB');
    });

    it('should print only number no string', function () {
        assert.equal(pretty(123456789, false, false, false, true), 117.7);
    });

    it('should print only number no string [opts]', function () {
        assert.equal(pretty(123456789, {numOnly: true}), 117.7);
    });


});
