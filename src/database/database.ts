import Bookmark from "../model/bookmark";
import SQLite from "./sqlite/sqlite";

class Database {
  private static instance: Database;
  private sqlite: SQLite;

  private constructor() {
    // Initialize database connection
    this.sqlite = SQLite.getInstance();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getBookmarks(): Promise<Bookmark[]> {
    return this.sqlite.getBookmarks();
  }

  public getBookmark(id: string): Promise<Bookmark> {
    return this.sqlite.getBookmark(id);
  }

  public addBookmark(bookmark: Bookmark): Bookmark {
    // save the bookmark to the database
    this.sqlite.insertBookmark(bookmark);
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