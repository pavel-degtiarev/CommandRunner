import { ChildProcessWithoutNullStreams } from "child_process";
import { IOutputHandler } from "./outputHandlerInterface";

export class OutputStream {
	constructor(private handler: IOutputHandler) { }
	
	processStream(stream: ChildProcessWithoutNullStreams) {
		stream.stdout.on("data", (data) => this.handler.log(data.toString()));
		stream.stderr.on("data", (data) => this.handler.error(data.toString()));
		stream.stdout.on("close", () => this.handler.final());
	}
}
