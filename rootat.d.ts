declare class rootat {
	/** Where the path '/' starts from when user requires a module using absolute path. **/
	static search_root:string;

	/** The root of current project. **/
	static readonly project_root:string;

	static map(identifier:string, path:string):string;

	static unmap(identifier:string):string;
}

export = rootat;