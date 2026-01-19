import axiosClient from "./ApiClient";

export const loginCall = async (email, password) => {
    try {
        const { data } = await axiosClient.post("/api/v1/auth/login", {
            email, password
        });

        const { message, token } = data;

        if (!token) return { success: false, message: "No token received" };

        localStorage.setItem("token", token);

        return {
            success: true,
            token,
            message
        }

    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Login Failed"
        }
    };
};

export const registerCall = async (username, email, password) => {
    try {
        const { data } = await axiosClient.post("/api/v1/auth/register", {
            username, email, password
        });

        const { token, message } = data;

        if (!token) return { success: false, message: "No token received" }

        localStorage.setItem("token", token);

        return {
            success: true,
            token,
            message
        }

    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Registration Failed"
        }
    }
};

export const changePasswordCall = async (oldPassword, newPassword) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axiosClient.post("/api/v1/auth/change-password", {
            oldPassword, newPassword
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            success: true,
            message: data.message || "Password changed successfully"
        };

    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Password changes Failed"
        }
    }
}