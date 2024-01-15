import { Container } from '@/components/ui/container';

/**
 * ProfilePage #7
 * - parse username from url
 * - request user infomation by server action
 */
interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage = (props: ProfilePageProps) => {
  const { username } = props.params;

  return <Container>ProfilePage Username: {username}</Container>;
};

export default ProfilePage;
