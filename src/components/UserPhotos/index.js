import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);
  console.log(photos);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Ảnh của người dùng: {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "24px" }}>
          <CardMedia
            component="img"
            image={require(`../../images/${photo.file_name}`)}
            alt="Ảnh"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Đăng lúc: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider style={{ margin: "10px 0" }} />
            <Typography variant="subtitle1" gutterBottom>
              Bình luận:
            </Typography>

            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment, index) => {
                return (
                  <div key={index} style={{ marginBottom: "12px" }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(comment.date_time).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Người bình luận:{" "}
                      <Link to={`/users/${comment.user._id}`}>
                        {models.userModel(comment.user._id).first_name}{" "}
                        {models.userModel(comment.user._id).last_name}
                      </Link>
                    </Typography>
                    <Typography variant="body2">{comment.comment}</Typography>
                    <Divider style={{ marginTop: "10px" }} />
                  </div>
                );
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                Chưa có bình luận nào.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
