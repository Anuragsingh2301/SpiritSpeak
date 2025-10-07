import Calendar from "./components/Calendar/Calendar";
import UserProfileCard from "./components/UserProfileCard";
import Sidebar from '../Sidebar/Sidebar';

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-row gap-10 items-start">
            <UserProfileCard />
            <Calendar />
        </div>
      </main>
    </div>
  );
};

export default Profile;