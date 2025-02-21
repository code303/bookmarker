import { randomUUID } from "crypto";
import Bookmark from "../model/bookmark";

function createBookmark(data: string): Bookmark {
  const uuid:string = randomUUID();

  return {
    id: uuid,
    title: 'My Bookmark',
    url: 'https://www.example.com',
    description: 'This is a bookmark',
    tags: ['tag1', 'tag2'],
    created: Date.now(),
    updated: Date.now()
    } as Bookmark;
}

export default createBookmark;
