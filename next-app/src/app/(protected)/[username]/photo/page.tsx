import { redirect } from "next/navigation";

interface ProfilePhotoPageProps {
  params: {
    username: string;
  };
}
export default function ProfilePhotoPage(props: ProfilePhotoPageProps) {
  const { params } = props;
  const { username } = params;
  redirect(`/${username}`);
}
