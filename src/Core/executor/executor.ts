import { ChildProcessWithoutNullStreams } from "child_process";
import { IOutputHandler } from "../output/outputHandlerInterface";
import { OutputStream } from "../output/outputStream";
import { ICommand } from "./commandInterface";

export abstract class Executor<Input> {
	constructor(public output: IOutputHandler) {}

	async execute() {
		const data = await this.getParameters();
		const command = this.buildCommand(data);
		const spawnStream = this.spawnCommand(command);
		this.streamResult(spawnStream);
	}

	abstract getParameters(): Promise<Input>;
	abstract buildCommand(data: Input): ICommand;
	abstract spawnCommand(command: ICommand): ChildProcessWithoutNullStreams;
	abstract streamResult(stream: ChildProcessWithoutNullStreams): void;
}
