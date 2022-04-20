import { PromptService } from "./Core/prompt/promptService";

class App{
	async run() {
		const prompt = new PromptService();
		const resp = await prompt.input("Input number", "number");
		console.log(resp);
	}
}

const app = new App();
app.run()
