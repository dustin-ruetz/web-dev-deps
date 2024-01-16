import {readdir, rename} from "node:fs/promises";
import {compiledFiles} from "../__mocks__/files";
import {renameFilesInLibESM} from "../renameFilesInLibESM";

jest.mock("node:fs/promises", () => ({
	readdir: jest.fn(() => compiledFiles),
	rename: jest.fn(),
}));

test("it renames the files in lib/esm/ by changing their extensions from .js to .mjs ", async () => {
	await renameFilesInLibESM();

	// Verify that `readdir` was called once and on the lib/esm/ directory.
	expect(readdir).toHaveBeenCalledTimes(1);
	expect(readdir).toHaveBeenCalledWith("lib/esm/");

	// Verify that `rename` was called once for each item in `compiledFiles`.
	expect(rename).toHaveBeenCalledTimes(7);
	// Verify that a sampling of `rename` calls received the correct arguments.
	expect(rename).toHaveBeenNthCalledWith(
		1,
		"lib/esm/.commitlintrc.js",
		"lib/esm/.commitlintrc.mjs",
	);
	expect(rename).toHaveBeenNthCalledWith(
		7,
		"lib/esm/jestTransformerSVGFile.js",
		"lib/esm/jestTransformerSVGFile.mjs",
	);
});
