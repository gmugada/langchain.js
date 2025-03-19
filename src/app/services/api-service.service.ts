import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private genAI = new GoogleGenerativeAI(environment.GOOGLE_API_KEY);

  constructor(private httpClient:HttpClient) { }

  async askQuestion(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("AI Error:", error);
      return "Error getting response from AI.";
    }
  }
  async summarizeYouTubeVideo(videoId: string): Promise<string> {
    try {
      // Fetch Video Captions (Replace with your own API if needed)
      const captions = await this.fetchYouTubeCaptions(videoId);
      if (!captions) {
        return "No captions found for this video.";
      }

      // Send Captions to AI for Summary
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(`Summarize this YouTube video transcript:\n\n${captions}`);
      return result.response.text();
    } catch (error) {
      console.error("AI Error:", error);
      return "Error processing video summary.";
    }
  }

  async fetchYouTubeCaptions(videoId: string): Promise<string> {
    try {
      const response: any = await this.httpClient
        .get(`https://api.example.com/get-captions?videoId=${videoId}`)
        .toPromise();

      return response.transcript || "";
    } catch (error) {
      console.error("YouTube Captions Error:", error);
      return "";
    }
  }
}
