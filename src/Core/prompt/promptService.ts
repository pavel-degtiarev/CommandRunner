import inquirer from "inquirer";
import { PromptType } from "./promptTypes";

export class PromptService {
	async input<T>(message: string, type: PromptType) {
		const { answer } = await inquirer.prompt<{ answer: T }>([{ name: "answer", message, type }]);
		return answer;
	}
}
