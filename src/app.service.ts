import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';

@Injectable()
export class AppService {
  private async getMovieParentGuideHTML(id: string): Promise<{ data: string }> {
    try {
      return await axios.get(`https://www.imdb.com/title/${id}/parentalguide`, {
        responseType: 'text',
      });
    } catch {
      throw new NotFoundException(null, 'Movie Not Found!');
    }
  }

  async getParentGuide(id: string): Promise<any> {
    const html = await this.getMovieParentGuideHTML(id);
    const dom = new JSDOM(html.data);

    const titles = dom.window.document.querySelectorAll(
      "[class='ipl-list-title']",
    );
    const lists = dom.window.document.querySelectorAll(
      '[class="ipl-zebra-list"]',
    );
    return [...titles].map((title, idx) => {
      return {
        title: title.textContent,
        list: [
          ...lists[idx].querySelectorAll("[class='ipl-zebra-list__item']"),
        ].map(item => item.textContent),
      };
    });
  }
}
