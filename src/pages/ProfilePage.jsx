import ProfileHeader from '../components/ProfileHeader';
import JourneyStats from '../components/JourneyStats';

const ProfilePage = () => {
  return (
    // This div sets the background color and centers the content
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10">
      <div className="flex flex-col gap-6 w-full max-w-md px-4">
        <ProfileHeader />
        <JourneyStats />
      </div>
    </div>
  );
};

export default ProfilePage;