import { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  console.log(userId);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(
          `https://ldk3f3-8081.csb.app/api/user/${userId}`
        );
        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        console.log("lỗi khi fetchApi: ", e);
      }
    };
    fetchApi();
  }, [userId]);

  console.log(user);

  return (
    <>
      <Paper
        elevation={3}
        className="user-detail-container"
        style={{ padding: "16px" }}
      >
        <Typography variant="h5" gutterBottom>
          Thông tin người dùng
        </Typography>
        <Typography variant="body1">
          <strong>Họ và tên:</strong> {user?.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>Địa chỉ:</strong> {user?.location}
        </Typography>
        <Typography variant="body1">
          <strong>Mô tả:</strong> {user?.description}
        </Typography>
        <Typography variant="body1">
          <strong>Nghề nghiệp:</strong> {user?.occupation}
        </Typography>
        <Typography variant="body1">
          <Link to={`/photos/${userId}`} style={{ color: "#000" }}>
            <strong>Bộ sưu tập ảnh</strong>
          </Link>
        </Typography>
      </Paper>
    </>
  );
}

export default UserDetail;
