declare interface User {
  id: number;
  username: string;
  displayName: string | null;
  email: string;
  password: string;
  avatarUrl: string | null;
  description: string | null;
  location: string | null;
  website: string | null;
  createdAt: Date | null;
  bannedAt: Date | null;
}

declare interface Recipe {
  id: number;
  userId: number;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  public: boolean | null;
  /** minutes */
  estimatedTime: number | null;
  createdAt: Date | null;
  editedAt: Date | null;
}

declare interface Metric {
  id: number;
  metric: string;
}

export { User, Recipe, Metric };
