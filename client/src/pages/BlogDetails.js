import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [blogs, setBlogs] = useState({});
  const id = useParams().id;

  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog updated successfully.");
        navigate("/my-blogs");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  //   get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.blog);
        setInputs({
          title: data?.blog?.title,
          description: data?.blog?.description,
          image: data?.blog?.image,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);
  console.log(blogs);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin={"auto"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              padding: 3,
              color: "gray",
              marginTop: "30px",
            }}
          >
            Update A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            value={inputs.title}
            name="title"
            onChange={handleChange}
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            value={inputs.description}
            name="description"
            onChange={handleChange}
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            value={inputs.image}
            name="image"
            onChange={handleChange}
            required
          />
          <Button color="warning" variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default BlogDetails;
