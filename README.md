# ReRoot #
This library is designed to limit the require path in the specific directory

## Intall ##
```sh
npm install rerootat
```

## Usage ##
```javascript
// Where the cloest node_modules isa
require('reroot').project_root;

// Assign where does the root '/' start from
require('reroot').search_root = "/PATH/YOU/WANT/TO/START";

// Locate and load module starts from path location you specified previously
require('@/a/b/c'); // This will load module at "/PATH/YOU/WANT/TO/START/a/b/c"
```