import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.scss']
})
export class AiChatComponent {
  userInput = '';
  messages: { text: string; sender: 'user' | 'ai' }[] = [];
  isLoading = false;
  showOptions = false; // Controls the visibility of extra options
  youtubeUrl = '';
  showYouTubeInput = false;
  constructor(private apiService: ApiServiceService) {

  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.unshift({ text: this.userInput, sender: 'user' }); // Add message at the top
    this.isLoading = true;

    try {
      const aiResponse = await this.apiService.askQuestion(this.userInput);
      this.formatAndPushResponse(aiResponse);
    } catch (error) {
      this.messages.unshift({ text: 'Error fetching response.', sender: 'ai' });
      console.error('AI Error:', error);
    }

    this.isLoading = false;
    this.userInput = '';
  }

  clearConversation() {
    this.messages = [];
  }

  formatAndPushResponse(response: string) {
    response.split('\n\n').forEach((para) => {
      if (para.trim()) {
        this.messages.unshift({ text: para.trim(), sender: 'ai' }); // AI response at the top
      }
    });
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
  toggleYouTubeInput() {
    console.log('asas');
    
    this.showYouTubeInput = !this.showYouTubeInput;
  }

  // Extract Video ID from YouTube URL
  extractVideoId(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^?&]+)/);
    return match ? match[1] : null;
  }

  // Process YouTube Video
  async processYouTubeVideo() {
    if (!this.youtubeUrl.trim()) return;

    const videoId = this.extractVideoId(this.youtubeUrl);
    if (!videoId) {
      this.messages.unshift({ text: 'Invalid YouTube URL.', sender: 'ai' });
      return;
    }

    this.messages.unshift({ text: `Processing video: ${this.youtubeUrl}`, sender: 'user' });
    this.isLoading = true;

    try {
      const response = await this.apiService.summarizeYouTubeVideo(videoId);
      this.messages.unshift({ text: response, sender: 'ai' });
    } catch (error) {
      this.messages.unshift({ text: 'Error processing video.', sender: 'ai' });
    }

    this.isLoading = false;
    this.youtubeUrl = '';
    this.showYouTubeInput = false;
  }
}
