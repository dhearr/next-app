import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data }: any = useSession();
  //   console.log(data);
  return (
    <div>
      <h1>profile</h1>
      <p>{data && data.user.username}</p>
    </div>
  );
};

export default ProfilePage;
