export interface UserProfile {
  id: string;
  auth_id: string;
  username: string;
  full_name: string;
  display_name: string | null;
  bio: string | null;
  profile_picture: string | null;
  background_picture: string | null;
  email_address: string;
}

export interface UserActivity {
  topics_created: number;
  entries_created: number;
  comments_created: number;
  topic_upvotes: number;
  topic_downvotes: number;
  entry_upvotes: number;
  entry_downvotes: number;
  comment_upvotes: number;
  comment_downvotes: number;
  total_points: number;
  weekly_points: number;
  monthly_points: number;
  user_id: string;
  updated_at: string;
}

export interface UserResponse {
  profile: UserProfile;
  activity: UserActivity;
}

export class User {
  profile: UserProfile;
  activity: UserActivity;

  constructor(profile: UserProfile, activity: UserActivity) {
    this.profile = profile;
    this.activity = activity;
  }

  static fromJSON(json: UserResponse): User {
    return new User(json.profile, json.activity);
  }

  get userFirstName(): string {
    return this.profile.full_name.split(" ")[0];
  }

  get displayName(): string {
    if (this.profile.display_name) {
      return this.profile.display_name;
    }
    return this.profile.full_name;
  }

  get totalPoints(): number {
    return this.activity.total_points;
  }

  get avatar(): string | null {
    return this.profile.profile_picture;
  }
}
