export type VaultItemSummary = {
  id: string;
  title: string;
  username: string;
  website: string;
  isFavorite: boolean;
  isReused: boolean;
  isWeak: boolean;
  updatedAt: number;
  deletedAt: number | null;
};

export type ReusedSibling = {
  id: string;
  title: string;
};

export type VaultItemDetail = VaultItemSummary & {
  password: string;
  notes: string;
  createdAt: number;
  reusedWith?: ReusedSibling[];
};

export type VaultItemInput = {
  title: string;
  username: string;
  password: string;
  website: string;
  notes: string;
  isFavorite: boolean;
};
