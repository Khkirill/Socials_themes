2.0.5 / 2019-10-11
==================

 * Updated installation scripts to install `webp 1.1.0` [#22]


  [#22]: https://github.com/Intervox/node-webp/issues/22

2.0.4 / 2019-10-11
==================

 * Updated installation scripts to install `webp 1.0.3` [#20]


  [#20]: https://github.com/Intervox/node-webp/issues/20

2.0.3 / 2018-06-15
==================

 * Updated installation scripts to install `webp 1.0.0`

2.0.2 / 2017-08-30
==================

 * Updated installation scripts to install `webp 0.6.0`

2.0.1 / 2016-06-13
==================

 * Add helpers for all new cwebp/dwebp switches

2.0.0 / 2016-06-09
==================

 * Full stdio streaming support
 * **BREAKING:** WebP `0.4.x` is no longer supported
 * **BREAKING:** NodeJS `0.8.x` is no longer supported

1.1.0 / 2015-06-04
==================

  * Updated `raw-body` to `2.x.x`

1.0.7 / 2015-06-03
==================

  * Fixed npm Readme

1.0.6 / 2015-06-03
==================

  * Fixed error message on Windows

1.0.5 / 2015-05-04
==================

 * Improved tmp directory lookup algorithm [#7]


  [#7]: https://github.com/Intervox/node-webp/issues/4

1.0.4 / 2015-04-20
==================

 * Fixed arguments exception [#4]


  [#4]: https://github.com/Intervox/node-webp/issues/4

1.0.3 / 2014-09-24
==================

 * Fixed webp installaton one-liner in readme

1.0.2 / 2014-09-24
==================

 * Delayed stream ending\buffer promise fulfillment untill cleanup is complete [#3]


  [#3]: https://github.com/Intervox/node-webp/issues/3

1.0.1 / 2014-09-22
==================

 * Fixed deps problem

1.0.0 / 2014-09-22
==================

 * Added native streaming support [#2]
 * Added support for input files, prefixed with `-` symbol [#2]
 * **BREAKING:** Changed `.stream()` behavior
 * **BREAKING:** Old versions of WebP (prior to `0.4.1`) are no longer supported


  [#2]: https://github.com/Intervox/node-webp/issues/2

0.2.0 / 2014-09-19
==================

 * Added dwebp support [#1]
 * Updated installation script to install `webp 0.4.1`


  [#1]: https://github.com/Intervox/node-webp/issues/1

0.1.10 / 2014-09-17
==================

 * Fixed CoffeeScript compilation (removed top-level function wrapping)

0.1.9 / 2014-04-17
==================

 * Updated deps, allowing wider range of `when` versions

0.1.8 / 2014-03-28
==================

 * Fixed tmp files cleanup

0.1.7 / 2014-03-24
==================

  * Updated dependencies to use `when 3.0.x`

0.1.6 / 2014-03-14
==================

  * Added event listeners cleanup
  * Fixed tmp files leak after cwebp error processinf Buffer of Stream

0.1.5 / 2014-03-13
==================

  * Fixed installation script to support old webp versions
  * Added verbose error reporting

0.1.4 / 2014-03-07
==================

  * Added support for stringified numbers
  * Added bin option to specify cwebp path

0.1.3 / 2014-03-05
==================

  * Improved cwebp errors reporting
  * Added install_webp script

0.1.2 / 2014-03-03
==================

  * Fixed crush on non-function passed as a callback

0.1.1 / 2014-02-28
==================

  * Fixed Readme

0.1.0 / 2014-02-28
==================

  * Initial release
