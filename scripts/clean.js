import {rm} from "node:fs/promises";

/** Delete the lib/ directory where the compiled code is built to. */
export const clean = async () => {
	const dirToDelete = "lib/";

	// eslint-disable-next-line no-console
	console.log(`🧹 Removing ${dirToDelete} directory`);

	// The following line simulates the behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm(dirToDelete, {force: true, recursive: true});
};

const environments = {
	/**
	 * Excerpt from https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables:
	 * > `CI` - Always set to `true`.
	 */
	isCI: process.env.CI === "true",
	/**
	 * Excerpt from https://jestjs.io/docs/environment-variables:
	 * > `NODE_ENV` - Set to `"test"` if it's not already set to something else.
	 */
	isTest: process.env.NODE_ENV === "test",
};
// Since it's difficult to test whether or not the `clean` function is called based on mocking environment variables,
// use the special `v8 ignore next #` comment to exclude the following lines from the test coverage report.
// TODO: Post this issue as a question on Stack Overflow.
/* v8 ignore next 12 */
//
// Don't call the `clean` function in the CI/CD or test environments because:
if (
	// 1. The CI/CD environment will never have the lib/ directory because A) lib/ is in the .gitignore file,
	//    and B) GitHub Actions does a fresh Git checkout of the repo every time a workflow is run.
	!environments.isCI &&
	// 2. The unit test for this file imports the `clean` function to test it, but
	//    the `clean` function itself should not be called during the test run.
	!environments.isTest
) {
	void clean();
}
