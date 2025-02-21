interface Bookmark {
    id: string;
    title: string;
    url: string;
    description: string;
    tags: string[];
    created: number;
    updated: number;
}

export default Bookmark;