import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { ICommand } from "../../Core/executor/commandInterface";
import { Executor } from "../../Core/executor/executor";
import { IOutputHandler } from "../../Core/output/outputHandlerInterface";
import { OutputStream } from "../../Core/output/outputStream";
import { PromptService } from "../../Core/prompt/promptService";
import { getFilePath } from "../../Core/utilities/fileUtilities";
import { FfmpegBuilder } from "../ffmpegBuilder/ffmpegBuilder";
import { FfmpegPrompts } from "./FfmpegPrompts";

export class FfmpegExecutor extends Executor<FfmpegPrompts> {
	constructor(outputPlugin: IOutputHandler) {
		super(outputPlugin);
	}

	async getParameters(): Promise<FfmpegPrompts> {
		const prompt = new PromptService();

		const path: string = await prompt.input<string>("Source", "input");
		const width: number = await prompt.input<number>("Width", "number");
		const height: number = await prompt.input<number>("Height", "number");
		const output: string = await prompt.input<string>("Destination", "input");
		return {path, width, height, output};
	}

	buildCommand({width, height, path, output}: FfmpegPrompts): ICommand {
		const outFile = getFilePath(path, output, "mp4");		
		const builder = new FfmpegBuilder();

		builder.setInput(path).setSize(width, height).setOutput(outFile);
		return builder.buildCommand();
	}

	spawnCommand(command: ICommand): ChildProcessWithoutNullStreams {
		return spawn(command.command, command.args);
	}

	streamResult(stream: ChildProcessWithoutNullStreams): void {
		const str = new OutputStream(this.output);
		str.processStream(stream);
	}
}
