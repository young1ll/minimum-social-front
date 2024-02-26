import { toast } from "@/components/ui/use-toast";
import config from "@/config";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserByUserId = ({ userId }: { userId: string }) => {
  const getUserByUserId = async () => {
    const response = await fetch(`${config.rootUrl}/api/user?id=${userId}`);
    const result = await response.json();

    return result[0];
  };

  const useUserQuery = useQuery({
    queryKey: ["users", userId, "profile"],
    queryFn: getUserByUserId,
  });

  return useUserQuery;
};

export const useUserByUsername = ({ username }: { username: string }) => {
  const getUserByUserName = async () => {
    // const url = new URL(`${config.rootUrl}/api/user`);
    // url.searchParams.append("username", username);

    // const url = `${config.rootUrl}/api/user?username=${username}`;
    const url = `${config.rootUrl}/api/user?username=${username}`;
    const response = await fetch(url);
    const result = await response.json();

    return result[0];
  };

  const useUserQuery = useQuery({
    queryKey: ["users", username],
    queryFn: getUserByUserName,
  });

  return useUserQuery;
};

export const useUserTopicCountByUserId = ({ userId }: { userId: string }) => {
  const getUserTopicCounts = async () => {
    const response = await fetch(
      `${config.rootUrl}/api/topic/count?userId=${userId}`,
    );
    const result = await response.json();
    return result;
  };

  const useUserTopicCountQuery = useQuery({
    queryKey: ["users", userId, "topic-counts"],
    queryFn: getUserTopicCounts,
  });

  return useUserTopicCountQuery;
};

export const useUpdateUser = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const queryClient = useQueryClient();

  const updateUser = async (data: Partial<User>) => {
    const url = `${config.rootUrl}/api/user?id=${userId}`;
    try {
      const userUpdateRes = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });

      return userUpdateRes.json();
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  };

  const updateUserMutation = useMutation({
    mutationFn: (data: Partial<User>) => updateUser(data),
    onSuccess: async () => {
      toast({
        variant: "default",
        title: "Update User Success!",
        description: "Successfully updated user profile!",
      });

      await queryClient.fetchQuery({ queryKey: ["users", username] }); // TopicList 리로드
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Update User Failed",
        description: "Failed to update user",
      });
    },
  });

  return updateUserMutation;
};
