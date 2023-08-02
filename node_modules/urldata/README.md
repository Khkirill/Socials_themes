urldata
=======
Library to extract url data from css property
=======
[![Build Status](https://travis-ci.org/lexich/urldata.svg)](https://travis-ci.org/lexich/urldata)
[![npm version](https://badge.fury.io/js/urldata.svg)](http://badge.fury.io/js/urldata)
[![Coverage Status](https://coveralls.io/repos/lexich/urldata/badge.png)](https://coveralls.io/r/lexich/urldata)
[![Dependency Status](https://david-dm.org/lexich/urldata.svg)](https://david-dm.org/lexich/urldata)
[![devDependency Status](https://david-dm.org/lexich/urldata/dev-status.svg)](https://david-dm.org/lexich/urldata#info=devDependencies)
### Instalation

```
npm install urldata --save
```

### Example

```javascript
var urldata = require("urldata");
var prop = "red url(cat.png) center bottom no-repeat, green url(\'dog.png\') center bottom no-repeat";
urldata(prop) // ["cat.png", "dog.png"]
```

