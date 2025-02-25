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

  public addBookmark(bookmark: Bookmark): Promise<Bookmark> {
    return this.sqlite.insertBookmark(bookmark);
  }

  public updateBookmark(bookmark: Bookmark): Promise<Bookmark> {
    const id: string = bookmark.id;
    if (this.bookmarkExists(id)) {
      return this.sqlite.updateBookmark(bookmark);
    } else {
      return this.addBookmark(bookmark);
    }
  }

  public deleteBookmark(id: string): Promise<boolean> {
    if (this.bookmarkExists(id)) {
      return this.sqlite.deleteBookmark(id);
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