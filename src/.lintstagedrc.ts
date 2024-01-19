import type {Config} from "lint-staged";

/** https://github.com/lint-staged/lint-staged */
const lintstagedConfig: Config = {
	/**
	 * Note 1: Run "format" and "lint" as their base scripts (i.e. _not_ "format:check" and "lint:check")
	 * because lint-staged will pass just the paths of the staged files as an argument to these commands.
	 *
	 * Note 2: Running "test" with the "--findRelatedTests" flag scopes the test run to just the staged files.
	 */
	// Check code formatting for all file types that Prettier supports.
	"*": "npm run format -- --check --ignore-unknown",
	"*.{js,jsx,ts,tsx}": "npm run lint",
	// This repo has unit tests for JSON files, so include them here.
	"*.{js,jsx,json,ts,tsx}": "npm test -- --findRelatedTests",
	// TODO: Enable typechecking after relocating tsconfig.json files to avoid the following error:
	// ERROR: Option 'project' cannot be mixed with source files on a command line. ts(5042)
	// "*.{ts,tsx}": "npm run typecheck",
} as const;

export default lintstagedConfig;
