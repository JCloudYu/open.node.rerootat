/**
 *	Author: JCloudYu
 *	Create: 2021/03/17
**/
(()=>{
	"use strict";
	
	const fs = require('fs');
	const path = require('path');
	const RUNTIME_DATA = {
		proto_require: module.constructor.prototype.require,
		proj_root: require.main?require.main.path:process.cwd(),
		user_root: '',
		search_root: '',
		map: {}
	};
	
	// Look for the directory that contains node_modules and package.json
	{
		let currentDir = __dirname, node_modules_dir = false;
		while(true) {
			const pkgPath = path.join(currentDir, 'package.json');
			const node_modulesPath = path.join(currentDir, 'node_modules');
			if (fs.existsSync(pkgPath) && fs.existsSync(node_modulesPath)) {
				node_modules_dir = currentDir;
				break;
			}

			const parentDir = path.dirname(currentDir);
			if (parentDir === currentDir) break;
			
			currentDir = parentDir;
		}

		RUNTIME_DATA.proj_root = node_modules_dir||RUNTIME_DATA.proj_root;
	}
	
	
	
	RUNTIME_DATA.search_root = RUNTIME_DATA.user_root||RUNTIME_DATA.proj_root;
	Object.defineProperty(module.exports, 'search_root', {
		set:(v)=>{
			RUNTIME_DATA.user_root = path.resolve(process.cwd(), '' + v);
			RUNTIME_DATA.search_root = RUNTIME_DATA.user_root||RUNTIME_DATA.proj_root;
		},
		get: ()=>RUNTIME_DATA.search_root,
		configurable:false, enumerable:true
	});
	Object.defineProperty(module.exports, 'project_root', {
		get: ()=>RUNTIME_DATA.proj_root,
		configurable:false, enumerable:true
	});
	Object.defineProperty(module.exports, 'map', {
		value: (identifier, path)=>{
			if ( identifier === '@' ) {
				throw new RangeError('Identifier "@" is reserved for project root!');
			}
			
			if ( identifier.indexOf('/') >= 0 ) {
				throw new RangeError('Identifier cannot contain "/"!');
			}

			RUNTIME_DATA.map[identifier] = path;
		},
		configurable:false, enumerable:true
	});
	Object.defineProperty(module.exports, 'unmap', {
		value: (identifier)=>{
			delete RUNTIME_DATA.map[identifier];
		},
		configurable:false, enumerable:true
	});
	


	module.constructor.prototype.require = function(id) {
		const root_dir = RUNTIME_DATA.search_root;
		
		let resolved_path = null;
		let dir_divider = id.indexOf('/');
		let identifier = id.substring(0, dir_divider);

		
		if ( identifier === '@' ) {
			resolved_path = path.resolve(root_dir, id.substring(dir_divider + 1));
		}
		else 
		if ( RUNTIME_DATA.map[identifier] ) {
			resolved_path = path.resolve(root_dir, RUNTIME_DATA.map[identifier], id.substring(dir_divider + 1));
		}


		
		return RUNTIME_DATA.proto_require.call(this, resolved_path||id);
	};
})();
