/**
 * config : {
 * 
 *  // VALUE, default: '%MDS%'
 *	'value' : '%MDS%',
 * 
 * 	// REPLACE
 *	'replaces' : [
 * 		// if not an array, replace to global value (config.value)
 *		/#{VERSION}#/g,
 *		[/#{VERSION_REPlACE}#/g, '%TS%']
 *	],
 * 
 *	// APPEND
 *	'append' : {
 * 
 *      // keyword
 *		'key' : '_v',
 * 
 *      // Whether to overwrite the existing parameters
 *      //  - default: 0 (don't replace)
 *		'cover' : 0,
 * 
 * 		// Append to：ALL('all') or any specific types(ARRAY),
 *      // others will passing.
 *		'to' : [
 * 
 * 			// (STRING) If this option is a string, apply global replace rules
 * 			'css',
 * 
 * 			// (OBJECT) With custom rules to be replaced, the
 *          // missing items will take the global settings in
 *          // the completion
 * 			{
 *				'type'  : 'js',
 *			    'attr'  : ['src', 'custom-src'] // String or Array, undefined this will use default. css: "href", js: ...
 *				'key'   : '_v',
 *				'value' : '%DATE%',
 *				'cover' : 1
 *			},
 * 
 * 			// (ARRAY) More simple than the object, Just specify
 *          // the type and value
 * 			['image', '%TS%']
 *		},
 * 
 * 		// Output to config file
 *		'output' : {
 *			'file' : 'version.json'
 *		}
 *	}
 *
 * --------------------------------------------
 * Priority - Covering relations:
 *
 *     (OBJECT)config.append.to[x].type == (ARRAY)config.append.to[x][0] == (STRING)config.append.to[x]
 *     config.append.to[x].key > config.append.key
 *     config.append.to[x].cover > config.append.cover
 *     config.append.to[x].value == config.append.to[x][1] [ (if cover == true) > (else) == config.replace[x][1] ] > config.value
 *
 * For details, please read the README
 */

'use strict';

var mapStream = require('map-stream');
var fsPath = require('fs-path');

var md5 = require('./lib/md5');
var randomString = require('./lib/randomString');
var leadZero = require('./lib/leadZero');
var parseURL = require('./lib/parseURL');
var renderingURL = require('./lib/renderingURL');
var queryToJson = require('./lib/queryToJson');
var jsonToQuery = require('./lib/jsonToQuery');

function version(v) {

    if (typeof v === 'undefined') {
        return null;
    }

    if (v.indexOf('%') > -1) {
        v = v.toUpperCase();
    }

    var DT = new Date();
    switch (v) {
        case '%DATE%':
            v = DT.getFullYear() + leadZero(DT.getMonth() + 1, 2) + leadZero(DT.getDate(), 2);
            break;
        case '%DT%':
            v = DT.getFullYear() + leadZero(DT.getMonth() + 1, 2) + leadZero(DT.getDate(), 2) + leadZero(DT.getHours(), 2) + leadZero(DT.getMinutes(), 2) + leadZero(DT.getSeconds(), 2);
            break;
        case '%TS%':
            v = DT.getTime().toString();
            break;
        case '%MD5%':
            v = md5(DT.getTime().toString());
            break;
        case '%MDS%':
            v = md5(md5(DT.getTime().toString()) + randomString(8));
            break;
        default:
            break;
    }

    return v;
}

var DETECTION = {
    css  : /<link[^>]*rel=['"]?stylesheet['"]?[^>]*>/g,
    js   : /<script [^>]+>[^<]*<\/script>/g,
    image: /<img [^>]+>/g,
    preload: /<link[^>]*rel=['"]?preload['"]?[^>]*>/g
};

var DEFAULT_ATTR = {
    css  : 'href',
    preload  : 'href',
    js   : 'src',
    image: 'src'
}

/**
 * options:
 *  type:
 *      %DATE% - date
 *      %DT% - date + time
 *      %TS% - timestamp length:10
 *      %TSM% - timestamp(millisecond length:13)
 *      %MD5% - MD5(timestamp)
 *      %MDS% - MD5(MD5(timestamp)+salt)
 *
 *      default: %TS%
 */
module.exports = function (options) {

    var options = Object.assign({
        'value': '%TS%' // default
    }, options || {});

    var versionNumberList = {
        main: version(options.value)
    };

    function apply_replace(content, config) {
        config = config || [];
        if (config.length) {
            for (var i = 0, len = config.length; i < len; i++) {
                var rep, v;
                if (Array.isArray(config[i])) {
                    rep = config[i][0];
                    v = version(config[i][1]);
                    if (v === null)
                        v = versionNumberList.main;
                }
                else {
                    rep = config[i];
                    v = versionNumberList.main;
                }
                content = content.replace(rep, v);
            }
        }
        return content;
    }

    function apply_append(content, config) {
        var apList = [];
        if (config['to']) {
            if (config.to === 'all') {
                apList = ['css', 'js', 'image'];
            }
            else {
                apList = config.to;
            }

            if (Array.isArray(apList)) {
                var apRule = {};
                for (var i = 0, key; i < apList.length; i++) {
                    if (typeof apList[i] === 'string') {
                        key = apList[i];
                        apRule[key] = {
                            'type': '' + apList[i]
                        };
                    }
                    else if (Object.prototype.toString.call(apList[i]) === '[object Array]') {
                        if (apList[i].length && apList[i][0]) {
                            key = apList[i][0];
                            apRule[key] = {
                                'type': '' + apList[i][0]
                            };
                            apList[i][1] && (apRule[key].value = '' + apList[i][1]);
                        }
                    }
                    else if (Object.prototype.toString.call(apList[i]) === '[object Object]') {
                        if (apList[i]['type']) {
                            key = apList[i].type;
                            apRule[key] = apList[i];
                        }
                    }

                    apRule[key].cover = !!config['cover'] || !!apRule[key].cover;
                }

                for (var type in apRule) {
                    !versionNumberList[type] && (versionNumberList[type] = apRule[type]['value'] ? version(apRule[type]['value']) : versionNumberList.main);
                    content = appendto.call(apRule[type], content, apRule[type]['key'] || config['key'] || '_v', versionNumberList[type]);
                }

            }

        }
        return content;
    }

    function appendto(content, k, v) {
        this.attr = this['attr'] ? [].concat(this.attr) : [DEFAULT_ATTR[this.type]];
        var sts = content.match(DETECTION[this.type]);

        if (Array.isArray(sts) && sts.length && this['files']) {
            var files = this.files;
            
            sts = sts.filter(function(element) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    if (typeof file == 'string') {
                        if (element.indexOf(file) > -1) {
                            return true;
                        }
                    } else if (file instanceof RegExp) {
                        if (element.match(file)) {
                            return true;
                        }
                    }
                }
                
                return false;
            });
        }

        if (Array.isArray(sts) && sts.length) {
            var regExp = new RegExp('(' + this.attr.join('|') + ')' + '=[\'"]?([^>\'"]*)[\'"]?', 'g');
            sts.forEach(function (_s) {
                var _r = _s;
                var _RULE;
                while (_RULE = regExp.exec(_s)) {
                    if (_RULE[2]) {
                        var _UrlPs = parseURL(_RULE[2]);
                        var _Query = queryToJson(_UrlPs.query);
                        var _Append = {};
                        if (!_Query.hasOwnProperty(k) || this['cover']) {
                            _Append[k] = v;
                        }
                        _UrlPs.query = jsonToQuery(Object.assign(_Query, _Append));
                        _r = _r.replace(_RULE[2], renderingURL(_UrlPs));
                    }
                }
                content = content.replace(_s, _r);
            }.bind(this));
        }
        return content;
    }

    /**
     * output a json version file
     */
    if (options.output && options.output.file) {
        fsPath.writeFile(options.output.file, JSON.stringify(versionNumberList, null, 4), function (err) {
            if (err)
                throw err;
            console.log('[gulp-version-number] Output to file: ' + options.output.file);
        });
    }

    return mapStream(function (file, cb) {

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            throw new Error('Streaming not supported');
        }

        var data = file.contents.toString();

        options['replaces'] && ( data = apply_replace(data, options.replaces));
        options['append'] && ( data = apply_append(data, options.append));
        file.contents = new Buffer(data);

        cb(null, file);
    });
};
