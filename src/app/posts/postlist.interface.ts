export interface PostList {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: {
        footnotes: string;
    };
    categories: number[];
    tags: any[]; // If tags have a defined structure, update this type
    class_list: string[];
    _links: {
        self: Array<{ href: string }>;
        collection: Array<{ href: string }>;
        about: Array<{ href: string }>;
        author: Array<{ embeddable: boolean; href: string }>;
        replies: Array<{ embeddable: boolean; href: string }>;
        "version-history": Array<{ count: number; href: string }>;
        "wp:attachment": Array<{ href: string }>;
        "wp:term": Array<{
            taxonomy: string;
            embeddable: boolean;
            href: string;
        }>;
        curies: Array<{ name: string; href: string; templated: boolean }>;
    };
}