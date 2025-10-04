import Calendar from "./components/Calendar/Calendar";
import UserProfileCard from "./components/UserProfileCard";

const Profile = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 px-10 flex flex-row gap-10 items-center">
      <UserProfileCard />
      <Calendar />
    </div>
  );
};

export default Profile;
