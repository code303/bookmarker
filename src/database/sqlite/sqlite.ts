import sqlite3 from 'sqlite3';
import path, { resolve } from 'path';
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

    public insertBookmark(bookmark: Bookmark): Promise<Bookmark> {
        
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO bookmarks (id, title, url, description, tags, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [bookmark.id, bookmark.title, bookmark.url, bookmark.description, bookmark.tags.join(','),
            bookmark.created, bookmark.updated], function (err) {
                if (err) {
                    reject(err);
                }
                console.log(`A bookmark has been inserted with id ${bookmark.id}`);
                resolve(bookmark);
            });
        });
    }

    public getBookmarks(): Promise<Bookmark[]> {
        return new Promise((resolve, reject) => {
            const bookmarks: Bookmark[] = [];
            this.db.each("SELECT id, title, url, description, tags, created, updated FROM bookmarks", (err, bookmark: Bookmark) => {
                if (err) {
                    reject(err);
                }
                bookmarks.push({
                    id: bookmark.id,
                    title: bookmark.title,
                    url: bookmark.url,
                    description: bookmark.description,
                    tags: bookmark.tags,
                    created: bookmark.created,
                    updated: bookmark.updated
                } as Bookmark);
            }, (err, count) => {
                if (err) {
                    reject(err);
                }
                resolve(bookmarks);
            });
        }); 
           
    }

    public getBookmark(id: string): Promise<Bookmark> {
        return new Promise((resolve, reject) => {
            this.db.get("SELECT id, title, url, description, tags, created, updated FROM bookmarks WHERE id = ?", [id], (err, bookmark: Bookmark) => {
                if (err) {
                    reject(err);
                }
                if (bookmark) {
                    resolve({
                        id: bookmark.id,
                        title: bookmark.title,
                        url: bookmark.url,
                        description: bookmark.description,
                        tags: bookmark.tags,
                        created: bookmark.created,
                        updated: bookmark.updated
                    } as Bookmark);
                } else {
                    reject(new Error('Bookmark not found'));
                }
            });
        });
    }

    public updateBookmark(bookmark: Bookmark): Promise<Bookmark> {
        return new Promise((resolve, reject) => {
            this.db.run("UPDATE bookmarks SET title = ?, url = ?, description = ?, tags = ?, updated = ? WHERE id = ?", [bookmark.title, bookmark.url, bookmark.description, bookmark.tags.join(','), bookmark.updated, bookmark.id], function (err) {
                if (err) {
                    reject(err);
                }
                console.log(`A bookmark has been updated with id ${bookmark.id}`);
                resolve(bookmark);
            });
        });
    }

    public deleteBookmark(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.run("DELETE FROM bookmarks WHERE id = ?", [id], function (err) {
                if (err) {
                    reject(err);
                }
                console.log(`A bookmark has been deleted with id ${id}`);
                resolve(true);
            });
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