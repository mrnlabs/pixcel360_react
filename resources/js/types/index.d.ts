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
    country?: string;
    post_code?: string;
    company_name?: string;
    display_name?: string;
    photo?: string;
    roles?: Role[];
    slug?: string;
    permissions?: Permission[];
    current_subscription?: Subscription;
    created_at?: string;
    email_verified_at?: string;
    last_login_at?: string;
}

export interface EventProps {
    event?: Event;
    events?: Event[];
}

export interface Event {
    id?: number;
    name: string;
    start_date?: string;
    end_date?: string;
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

interface Filters {
    search: string;
    status: string;
  }

  interface QueryParams {
    [key: string]: string;
  }

  interface Plan {
    id: number;
    name: string;
    price: string;
    interval: string;
    photo: string;
    description: string;
    slug: string;
    category_id?: number;
    duration_in_days?: number;
    category?: {
      id: number;
      name: string;
    }
    created_at: string;
    updated_at: string;
  }

  interface PlanCardProps {
    plan?: Plan;
    plans?: Plan[];
    original?: Original;
  }

  interface Original {
    data: Plan[];
    pagination: Pagination;
  }

  interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
  }

  interface SubscriptionCardProps {
    subscription?: Subscription;
    subscriptions?: Subscription[];
  }

  interface Subscription {
    id: number;
    plan_id: number;
    user_id: number;
    started_at: string;
    expires_at: string;
    slug: string;
    plan?: Plan;
  }

  interface StripeSetupIntent {
    client_secret: string;
}

export interface Permission {
  name: string;
  description?: string;
}
export type Role = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  users_count?: number;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
  permissions?: Permission[];
}

export type RolesIndexProps = {
  roles: PaginatedRoles;
  categories?: Category[];
  auth: {
      user: {
      id: number;
      name: string;
      // Add other user properties
      };
  };
}

interface Metric {
  label: string;
  value: string;
  percentageChange: number;
  isPositive: boolean;
  icon: string;
  iconBgColor: string;
  outerBgColor: string;
  route: string;
}

interface PageProps {
  metrics: Metric[];
}

interface DashboardProps {
  metrics: {
    metrics: MetricCard[];
    userAnalytics: UserAnalytics;
  };
  events: Event[];
}

export type NotificationsProps = {
  initialNotifications: Notification[];
}

export type Notification = {
  id?: number;
  type: string;
  title: string;
  message: string;
  read_at: string | null;
  data: {
      title: string;
      message: string;
      model_slug: string;
      model_route: string;
  };
  created_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        current_subscription?: Subscription;
    };
    intent: StripeSetupIntent;
    plan: App.Plan;
    stripeKey: string;
};
