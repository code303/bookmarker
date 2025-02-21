import sqlite3 from 'sqlite3';
import path from 'path';
import Bookmark from '../../model/bookmark';

class SQLite {
    private static instance: SQLite;
    private db: sqlite3.Database;

    private constructor() {
        // Initialize database
        this.db = new sqlite3.Database(path.join(__dirname, 'data.sqlite'), (err) => {
            if (err) {
                console.error(err.message);
                throw err;
            }
            console.log('Connected to the database.');
            this.createTableIfNotExists();
            console.log('Table created successfully.');
        });
    }

    public static getInstance(): SQLite {
        if (!SQLite.instance) {
            SQLite.instance = new SQLite();
        }
        return SQLite.instance;
    }

    private createTableIfNotExists(): void {
        this.db.run("CREATE TABLE IF NOT EXISTS bookmarks (id TEXT PRIMARY KEY, title TEXT, url TEXT, description TEXT, tags TEXT, created INTEGER, updated INTEGER)");
    }

    public insertBookmark(bookmark: Bookmark): Bookmark {
        this.db.run("INSERT INTO bookmarks (id, title, url, description, tags, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [bookmark.id, bookmark.title, bookmark.url, bookmark.description, bookmark.tags.join(','),
            bookmark.created, bookmark.updated], function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`A bookmark has been inserted with id ${bookmark.id}`);
            });
        return bookmark;
    }

    public getBookmarks(): Bookmark[] {
        const bookmarks: Bookmark[] = [];
        this.db.each("SELECT id, title, url, description, tags, created, updated FROM bookmarks", (err, row: Bookmark) => {
            if (err) {
                throw err;
            }
            bookmarks.push({
                id: row.id,
                title: row.title,
                url: row.url,
                description: row.description,
                tags: row.tags,
                created: row.created,
                updated: row.updated
            } as Bookmark);
        });
        return bookmarks;
    }

    public getBookmark(id: string): Bookmark {
        let bookmark: Bookmark = {} as Bookmark;
        this.db.each("SELECT id, title, url, description, tags, created, updated FROM bookmarks WHERE id = ?", [id], (err, row: Bookmark) => {
            if (err) {
                throw err;
            }
            bookmark = {
                id: row.id,
                title: row.title,
                url: row.url,
                description: row.description,
                tags: row.tags,
                created: row.created,
                updated: row.updated
            } as Bookmark;
        });
        return bookmark;
    }

    public updateBookmark(bookmark: Bookmark): Bookmark {
        this.db.run("UPDATE bookmarks SET title = ?, url = ?, description = ?, tags = ?, updated = ? WHERE id = ?", [bookmark.title, bookmark.url, bookmark.description, bookmark.tags.join(','), bookmark.updated, bookmark.id], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`A bookmark has been updated with id ${bookmark.id}`);
        });
        return bookmark;
    }

    public deleteBookmark(id: string): void {
        this.db.run("DELETE FROM bookmarks WHERE id = ?", [id], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`A bookmark has been deleted with id ${id}`);
        });
    }

    private closeConnection(): void {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Database connection closed.');
        });
    }

    public close(): void {
        this.closeConnection();
    }
} 
export default SQLite;