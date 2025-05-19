import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";


function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  // lấy toàn bộ ảnh theo id người dùng
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          `https://ldk3f3-8081.csb.app/api/photo/photosOfUser/${userId}`
        );
        const data = await res.json();
        console.log(data.photos);
        setPhotos(data.photos);
      } catch (e) {
        console.log("Lỗi khi fetch ảnh: ", e);
      }
    };
    fetchPhotos();
  }, [userId]);

  // Lấy người dùng
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://ldk3f3-8081.csb.app/api/user/${userId}`
        );
        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        console.log("Lỗi khi fetch người dùng: ", e);
      }
    };
    fetchUser();
  }, [userId]);

  // Nếu chưa có thông tin người dùng, không render gì
  if (!user) return null;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Ảnh của người dùng: {user.last_name}
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
                const commenter = comment.user_id || {}; // Nếu không có thông tin người dùng, để mặc định là {}
                return (
                  <div key={index} style={{ marginBottom: "12px" }}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(comment.date_time).toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Người bình luận:{ commenter.last_name ? (
                        <Link to={`/users/${commenter._id}`} style={{ textDecoration: "none" }}>
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          {commenter.last_name}
                        </span>
                      </Link>
                      ) : (
                        "Người dùng không xác định"
                      )}
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
