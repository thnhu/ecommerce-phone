import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const RefreshToken = () => {
    const navigate = useNavigate(); 

    const handleRefreshToken = () => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            const token = {
                token: authToken,
            };
            axios
            .post("http://localhost:8080/phone/auth/refresh", token)
            .then((response) => {
                if(response.data.data.token === token) {
                    console.log("token co trong localStorage");
                }
                else {
                    console.log("token chua co trong localStorage");
                    navigate("/login");
                }
                
            }
            )
    
        } 

    }
    return <button onClick={handleRefreshToken}>RefreshToken</button>;

}

export default RefreshToken
