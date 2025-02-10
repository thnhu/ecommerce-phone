import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton = () => {
  const navigate = useNavigate(); 
  const handleLogOut = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const token = {
        token: authToken,
      };
      
      axios
        .post("http://localhost:8080/phone/auth/logout", token)
        .then((response) => {
          if (response.data.success) {
            localStorage.removeItem("authToken"); 
            navigate("/");
          } else {
            console.error("Logout thất bại: ", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Lỗi trong quá trình thoát:", error);
        });
    } else {
      console.log("Không tìm thấy token");
    }
  };

  return <button onClick={handleLogOut}>Log out</button>;
};

export default LogoutButton;
