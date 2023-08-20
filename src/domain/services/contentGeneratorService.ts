import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openAI/openAIService';

@Injectable()
export class ContentGeneratorService {
  constructor(private readonly openAIService: OpenAIService) { }

  async generateContent(content: string, contentLevel: string): Promise<any> {
    const prompt = this.generatePrompt(content, contentLevel);
    const [completion] = await this.openAIService.call(prompt);
    return completion.message.content;
  }

  private generatePrompt(content: string, contentLevel: string): string {
    if (contentLevel === 'simplified') {
      return `Explain the following content as if were for a 5 years old child.\n content: ${content}\n`;
    }
    return `Explain the following content from a different perspective.\n content: ${content} \n`;
  }
}
