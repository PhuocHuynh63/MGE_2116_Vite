import { useForm } from "react-hook-form";
import userService from "../../services/user";
import { CookiesService } from "../../utils/helpers/cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Admin = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Check if user is already logged in
     */
    const token = CookiesService.get("access_token");
    useEffect(() => {
        if (token) {
            navigate("/admin/mge");
        }
    }, [token]);
    //------------------------------End------------------------------//

    /**
     * Handle login form submission
     */
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const res = await userService.login(data);
            if (res.status === 201) {
                CookiesService.set("access_token", res.data.data.access_token);
                navigate("/admin/mge");
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    //------------------------------End------------------------------//

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card w-100 py-3 px-2" style={{ maxWidth: "480px" }}>
                <div className="card-body">
                    <h3 className="text-center mb-2">Xin chào Admin</h3>
                    <p className="text-center text-muted mb-4">Nhập thông tin đăng nhập để tiếp tục</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
                        <div className="mb-3">
                            <label className="form-label">Tên người dùng</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-envelope"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg>
                                </span>
                                <input
                                    type="username"
                                    className="form-control"
                                    id="username"
                                    placeholder="Nhập tên nguời dùng"
                                    required
                                    {...register("username", { required: true })}
                                />
                                <div className="invalid-feedback">Vui lòng nhập username hợp lệ.</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-lock"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                    {...register("password", { required: true })}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                                        viewBox="0 0 16 16"
                                    >
                                        {showPassword ? (
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709zM8 12.5a5.5 5.5 0 0 1-5.348-4.148c-.14-.202-.293-.404-.453-.615l.77-.771c.147.196.294.392.44.587A4.5 4.5 0 0 0 8 11.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8c-.058-.087-.122-.183-.195-.288-.335-.48-.83-1.12-1.465-1.755l.708-.709C12.94 6.614 12.5 7.258 12.5 8c0 1.21-.672 2.338-1.757 3.243l.77.771A7.028 7.028 0 0 0 8 12.5zM2.192 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755.165.165.337.328.517.486l-.708.709C.94 9.72 0 8 0 8s3-5.5 8-5.5c.672 0 1.338.087 1.986.255l-.77.771C8.672 3.338 8.338 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.134 13.134 0 0 0 1.172 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755l-.708.709C2.94 9.386 3.5 8.742 3.5 8c0-1.21.672-2.338 1.757-3.243l-.77-.771A7.028 7.028 0 0 0 8 2.5C3.5 2.5 0 5.5 0 8s.94 3.72 2.641 5.238l.708-.709C2.06 10.28 1.172 9.086 1.172 8z" />
                                        ) : (
                                            <path d="M8 1.5c-4.5 0-8 5.5-8 5.5s3.5 5.5 8 5.5 8-5.5 8-5.5-3.5-5.5-8-5.5zm0 10c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z" />
                                        )}
                                    </svg>
                                </button>
                                <div className="invalid-feedback">Vui lòng nhập mật khẩu.</div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn mt-1 background-primary text-white w-100 hover-background-primary"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;