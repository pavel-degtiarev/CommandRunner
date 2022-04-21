import { IOutputHandler } from "../output/outputHandlerInterface";
import { OutputStream } from "../output/outputStream";
import { ICommand } from "./commandInterface";

export abstract class Executor<Input> {
	constructor(public output: IOutputHandler) {}

	async execute() {
		const data = await this.getParameters();
		const command = this.buildCommand(data);
		const spawn = this.spawnCommand(command);
		this.streamResult(spawn);
	}

	abstract getParameters(): Input;
	abstract buildCommand(data: Input): ICommand;
	abstract spawnCommand(command: ICommand): OutputStream;
	abstract streamResult(stream: OutputStream): void;
}
