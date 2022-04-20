import { IOutputHandler } from "../Core/output/outputHandlerInterface";

export class ConsoleOutput implements IOutputHandler {
	private static instance: ConsoleOutput;

	constructor() {
		if (ConsoleOutput.instance) return ConsoleOutput.instance;
		ConsoleOutput.instance = this;
	}

	static getInstance(): ConsoleOutput {
		if (!ConsoleOutput.instance) ConsoleOutput.instance = new ConsoleOutput();
		return ConsoleOutput.instance;
	}

	log(...args: any[]): void {
		console.log(...args);
	}
	error(...args: any[]): void {
		console.log(...args);
	}
	final(): void {
		console.log("Done");
	}
}
