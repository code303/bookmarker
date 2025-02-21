import Bookmark from "../model/bookmark";

class Database {
  private static instance: Database;

  private constructor() {
    // Initialize database connection
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getBookmarks(): string {
    return 'Get all bookmarks.';
}

  public getBookmark(id: string): Bookmark {
    const bookmark: Bookmark = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'My Bookmark',
        url: 'https://www.example.com',
        description: 'This is a bookmark',
        tags: ['tag1', 'tag2'],
        created: Date.now(),
        updated: Date.now()
        } as Bookmark;
    return bookmark;
  }

  public addBookmark(bookmark: Bookmark): Bookmark {
    // save the bookmark to the database
    return bookmark;
  }

  public updateBookmark(id: string): string {
    return `Update bookmark with id ${id}`;
  }

  public deleteBookmark(id: string): boolean {
    if (this.bookmarkExists(id)) {
      // ToDo: delete bookmark from database
      return true;
    } else {
      throw new Error('Bookmark not found');
    }
  }

  public bookmarkExists(id: string): boolean {
    // ToDo: check if bookmark exists in database
    return true;
  }
}

export default Database;