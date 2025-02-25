import { randomUUID } from "crypto";
import Bookmark from "../model/bookmark";

export function createBookmark(data: Bookmark): Bookmark {
    return createBookmarkWithId(randomUUID(), data);
}

export function createBookmarkWithId(uuid: string, data: Bookmark): Bookmark {

    return {
        id: uuid,
        title: data.title,
        url: data.url,
        description: data.description,
        tags: data.tags,
        created: data.created || Date.now(),
        updated: Date.now()
        } as Bookmark;
}

