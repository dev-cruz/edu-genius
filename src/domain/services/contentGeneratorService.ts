import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/openAI/openAIService';

@Injectable()
export class ContentGeneratorService {
  constructor(private readonly openAIService: OpenAIService) {}
    
  async generateSubejcts(content:string, contentLevel: string): Promise<any> {  
    const prompt = this.generatePrompt(content, contentLevel);
    const completion = await this.openAIService.call(prompt);
    return completion.choices;
  }

  private generatePrompt(content:string, contentLevel: string): string {
    if(contentLevel === 'simplefied') {
      return `Explique o seguinte conteudo para uma criança de 8 anos\n conteudo: ${content}\n`;
    }
    return `Explique o seguinte conteudo com um ponto de vista diferente\n ${content} \n`;
  }
}
