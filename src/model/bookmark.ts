import { UUID } from "crypto";

interface Bookmark {
    id: UUID;
    title: string;
    url: string;
    description: string;
    tags: string[];
    created: number;
    updated: number;
}

export default Bookmark;