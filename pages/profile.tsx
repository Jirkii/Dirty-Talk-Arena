import Primary from "@/components/primary/Primary";
import useUser from "@/lib/useUser";

const Profile = () => {
  const { user } = useUser();
  return (
    <Primary>
      <div className="max-w-2xl mx-auto shadow-topic my-20 rounded-lg">
        <div className="max-w-md mx-auto py-10">
          <div>
            <h1 className="text-2xl font-semibold mb-6">Profil</h1>
            <img src="" />
          </div>
        </div>
      </div>
    </Primary>
  );
};

export default Profile;
