import {useEffect} from "react";
import {axiosInstance} from "../config/axiosInstance";
import {useNavigate} from "react-router-dom";

export const useAuthenticate = () => {

    const navigate = useNavigate();

    const loginCheck = async () => {
        await axiosInstance.get("/sessioncheck")
            .then((res) => {
            })
            .catch((res) => {
                navigate("/");
            });
    }


    useEffect(() => {
        loginCheck();
    }, []);


    return true;
}