import { getPosts, getRecommendedUsers } from "@/actions/get.post.actions";
import { useQuery } from "@tanstack/react-query";

export const usePost = () => {
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => getRecommendedUsers(),
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => getPosts(),
  });

  return { recommendedUsers, posts };
};
