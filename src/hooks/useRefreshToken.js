import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, setUser } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    setUser(response?.data?.user);
    setAuth((prev) => {
      console.log(prev);
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
