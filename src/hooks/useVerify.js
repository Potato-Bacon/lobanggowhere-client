import useAxiosPrivate from "./useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const useVerify = (path) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  let isMounted = true;
  const controller = new AbortController();

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(path, {
        signal: controller.signal,
      });
      console.log(response.data);
      isMounted && setUsers(response.data);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  getUsers();

  return () => {
    isMounted = false;
    controller.abort();
  };
};

export default useVerify;
