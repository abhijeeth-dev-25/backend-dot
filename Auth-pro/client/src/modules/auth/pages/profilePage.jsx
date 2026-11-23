import { useAuthContext } from "../context/authProvider"
import useApi from '../../shared/useApi'
import { useEffect } from "react";

const ProfilePage = () => {

  const { user, setUser } = useAuthContext();
  const api = useApi();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api.get('user/me');
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    getProfile();
  }, []);

  return (
    <main>
      <h1>Profile</h1>
      <p>Name: {user?.fullname}</p>
      <p>Email: {user?.email}</p>
    </main>
  )
}

export default ProfilePage
