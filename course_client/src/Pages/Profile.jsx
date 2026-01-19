import CustomBtn from "../components/CustomBtn";

const Profile = () => {
  let isPurchased = false;
  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">My Profile</h1>
      <p className="text-gray-500 text-sm mb-6">
        Manage your personal settings and security preferences
      </p>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-gray-200 shadow-md p-6 bg-white gap-4">
          <div>
            <p className="text-lg font-medium">Change Password</p>
            <p className="text-sm text-gray-500">
              Update your password to keep your account secure.
            </p>
          </div>
          <div>
            <CustomBtn label="Change Password" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Purchases</h2>
        {isPurchased ? (
          <>
            <div className="flex flex-col md:flex-row rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden">
              <img
                src="https://appxcontent.kaxa.in/paid_course3/2024-07-09-0.27031454992467685.png"
                alt="harkirat course thumbnail"
                className="w-full md:w-1/3 object-cover"
              />
              <div className="p-6 flex flex-col justify-between">
                <p className="font-bold text-2xl mb-2">
                  Complete Web Development Cohort
                </p>
                <p className="text-md italic text-gray-600 mb-4">
                  Complete syllabus - https://blog.100xdevs/Starts 2nd August
                  2024 In web dev cohort
                </p>
                <CustomBtn label="View Content" />
              </div>
            </div>
          </>
        ) : (
          <p>No purchases</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
