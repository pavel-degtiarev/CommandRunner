import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";

export async function isExist(path: string): Promise<boolean> {
	try {
		await promises.stat(path);
		return true;
	} catch {
		return false;
	}
}

export function getFilePath(path: string, name: string, ext: string): string {
	if (!isAbsolute(path)) {
		path = join(__dirname + "/" + path);
	}
	return join(dirname(path) + "/" + name + "." + ext);
}

export async function deleteIfExist(path: string): Promise<void> {
	if (await isExist(path)) {
		promises.unlink(path);
	}
}
