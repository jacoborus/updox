updox
=====

Get markdown documentation from your javascript comments


Installation
------------

```
npm install updox
```

Usage
-----

```javascript
var updox = require('updox');

updox('./updox.js', {dest: './documentation'});
```

updox API
---------

### updox( route, options )

Document files in glob route path

**Parameters:**

- **route** *String*: glob path of javascript files
- **options** *Object*: destiny and out name file
- **Return** *Array*: list of documented files


Options:

- `dest`: documentation folder ('./docs' by default)
- `destname`: name of docfile (only when one file is documented)


<br><br>

---

© 2014 Jacobo Tabernero - [jacoborus](https://github.com/jacoborus)

Released under [MIT License](https://raw.github.com/jacoborus/updox/master/LICENSE)
