export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address?: string;
    address2?: string;
    city?: string;
    province?: string;
    post_code?: string;
    company_name?: string;
    display_name?: string;
    photo?: string;
    role?: string;
    created_at?: string;
    email_verified_at?: string;
}

export interface EventProps {
    event: Event;
    events: Event[];
}

export interface Event {
    id?: number;
    name: string;
    language: string;
    country: string;
    countdown: string;
    beep_sounds: string;
    face_props: string;
    gallery_name: string;
    attract_screen: string;
    app_logo: string;
    app_background: string;
    webgallery_background: string;
    created_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
