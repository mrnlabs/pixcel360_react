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
    event?: Event;
    events?: Event[];
}

export interface Event {
    id?: number;
    name: string;
    language: string;
    country: string;
    countdown: string;
    beep_sounds: string;
    gallery_name: string;
    attract_screen: string;
    app_logo: string;
    app_background: string;
    webgallery_background: string;
    slug: string;
    setting? : {
        id: number;
        event_id?: number;
        count_down: 1;
        beep_sounds: number;
        mirror_overlay: number;
        front_rear_camera: number;
        camera_exposure: number;
        qr_app_protection: number;
        gallery_name: null;
        attract_screen: null;
        app_logo: null;
        text_button_color: null;
        app_background: null;
        webgallery_background: null;
        created_at: string;
        updated_at: string
      },
      boomerang_setting? : {
        id: number;
        event_id?: number;
        editing: number;
        sharing: number;
        props: number;
        thanks: number;
        boomerang_speed: number;
        boomerang_bounce: number;
        slomo_recording_time: number;
        slomo_boomerang: number;
        created_at: string;
      },
      sharing_method? : {
        event_id: number;
        text_message: string;
        email_subject: string
        default_text_email: string
        webgallery_email_subject: string
        webgallery_email_message: string
        social_share_description: string
      },
      videos?: Array<{ id: number; event_id: number; name: string; path: string }>;
    created_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
