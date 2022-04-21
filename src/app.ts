import { FfmpegExecutor } from "./commands/ffmpegExecutor/ffmpegExecutor";
import { ConsoleOutput } from "./outputPlugins/consolePlugin";

class App {
	async run() {
		new FfmpegExecutor(new ConsoleOutput()).execute();
	}
}

const app = new App();
app.run();
