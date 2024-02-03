export interface FeedPageProps {
  params: { topicId: string };
  searchParams: { edit?: string };
}

const FeedPage = (props: FeedPageProps) => {
  const { topicId } = props.params;
  const { edit } = props.searchParams;

  return (
    <div>
      {topicId}
      {edit}
    </div>
  );
};

export default FeedPage;
