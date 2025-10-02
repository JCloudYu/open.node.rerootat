# RootAt #
A tiny helper to redefine the root where Node.js `require` resolves from.

## Install ##
```sh
npm install rootat
```

## Basic Usage ##
```javascript
// Get detected project root (a folder that contains both package.json and node_modules)
require('rootat').project_root;

// Set the search root used by absolute requires that start with '@/'
require('rootat').search_root = "/PATH/YOU/WANT/TO/START";

// Load modules using '@/' from the configured search root
require('@/a/b/c'); // Resolves to "/PATH/YOU/WANT/TO/START/a/b/c"
```

## Aliases: map / unmap ##
Use `map(identifier, path)` to create handy aliases for subdirectories. Then require with `identifier/...`.

```javascript
const rootat = require('rootat');

// Optionally set a custom search root
rootat.search_root = "/WORKSPACE/ROOT";

// Map the identifier 'lib' to the "src/lib" subpath
rootat.map('#', 'src/lib');

// Now you can require via the alias
require('#/utils'); // Resolves to "/WORKSPACE/ROOT/src/lib/utils"

// Remove the mapping
rootat.unmap('#');
```

### Notes ###
- `@` is a reserved identifier for the search root and cannot be used in `map`.
- `identifier` passed to `map` must not contain `/`.
- `search_root` defaults to the detected project root (contains `package.json` and `node_modules`).
- `map`/`unmap` only affect requires that start with `identifier/`. Other relative/absolute requires are not changed.