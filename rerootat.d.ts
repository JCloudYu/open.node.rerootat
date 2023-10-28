declare class reroot {
	/** Where the path '/' starts from when user requires a module using absolute path. **/
	static search_root:string;

	/** The root of current project. **/
	static readonly project_root:string;
}

export = reroot;