import { ICommand } from "../../Core/executor/commandInterface";

export class FfmpegBuilder {
	private input: string = "";
	private output: string = "";
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set("-s:v", "libx264");
	}

	setInput(path: string): FfmpegBuilder {
		this.input = path;
		return this;
	}

	setOutput(path: string): FfmpegBuilder {
		this.output = path;
		return this;
	}

	setSize(width: number, height: number): FfmpegBuilder {
		this.options.set("-s", `${width}x${height}`);
		return this;
	}

	buildCommand(): ICommand {
		if(!this.input || !this.output) throw new Error("No input or output!");

		const args: string[] = ["-i", this.input];
		
		this.options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		});
		args.push(this.output);

		return {
			command: "ffmpeg",
			args: args,
		};
	}
}
