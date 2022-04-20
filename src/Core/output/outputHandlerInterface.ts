export interface IOutputHandler {
	log(...args: any[]): void;
	error(...args: any[]): void;
	final(): void;
}
