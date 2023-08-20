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
      return `Explique o seguinte conteudo para uma criança de 5 anos.\n conteudo: ${content}\n`;
    }
    return `Explique o seguinte conteudo de uma perspectiva diferente.\n conteudo: ${content} \n`;
  }
}
