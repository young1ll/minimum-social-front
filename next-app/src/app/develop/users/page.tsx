import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const DevUserListPage = () => {
  const query = useSearchParams();
  const username = query.get("username");

  const getTopicsByUserId = async () => {
    const url = new URL(`/api/topic`);
    url.searchParams.append("username", username as string);

    const response = await fetch(url);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["development", username],
    queryFn: getTopicsByUserId,
  });

  return (
    <div className="tw-w-full">
      <pre className="tw-w-full">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DevUserListPage;
