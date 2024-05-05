import { Api } from "@/components/features/discussions/discussionsSlice";
import { User } from "@/types/User";

export interface Discussion {
    discussion_id: string;
    content: string;
    title: string;
    discussion_date: string;
    user: User;
    api: Api;
  }