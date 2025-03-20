import { Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  BASE_URL: string = '/api/';
  constructor() { }

  public async getBookmarks(): Promise<Bookmark[]> {
    return this.get<Bookmark[]>('bookmarks');
    // return new Promise<Bookmark[]>(resolve => {
    //   resolve([
    //     {
    //       id: '1',
    //       title: 'Bookmark 1',
    //       url: 'http://bookmark1.com',
    //       description: 'Bookmark 1 description',
    //       tags: ['tag1', 'tag2'],
    //       created: 1234567890,
    //       updated: 1234567890
    //     },
    //     {
    //       id: '2',
    //       title: 'Bookmark 2',
    //       url: 'http://bookmark2.com',
    //       description: 'Bookmark 2 description',
    //       tags: ['tag1', 'tag2'],
    //       created: 1234567890,
    //       updated: 1234567890
    //     }
    //   ]);
    // });
  }

  private async get<T>(url: string): Promise<T> {
    const response = await fetch(this.BASE_URL + url);
    const data = await response.json();
    return data;
  }
}
