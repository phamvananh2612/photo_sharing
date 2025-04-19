import React from "react";
import { Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  console.log(userId);
  const user = models.userModel(userId);
  console.log(user);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        UserDetail
      </Typography>
      <Paper
        elevation={3}
        className="user-detail-container"
        style={{ padding: "16px" }}
      >
        <Typography variant="h5" gutterBottom>
          Thông tin người dùng
        </Typography>
        <Typography variant="body1">
          <strong>Họ và tên:</strong> {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>Địa chỉ:</strong> {user.location}
        </Typography>
        <Typography variant="body1">
          <strong>Mô tả:</strong> {user.description}
        </Typography>
        <Typography variant="body1">
          <strong>Nghề nghiệp:</strong> {user.occupation}
        </Typography>
        <Typography variant="body1">
          <Link to={`/photos/${userId}`}>
            <strong>Bộ sưu tập ảnh</strong>
          </Link>
        </Typography>
      </Paper>
    </>
  );
}

export default UserDetail;
