import React, { useEffect, useState } from 'react';
import { getAllBlogPosts } from './../../../core/api/cms';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Chip, Pagination, Box } from '@mui/material';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getAllBlogPosts();
      setBlogs(data);
    };
    fetchBlog();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {blogs.slice((page - 1) * 9, page * 9).map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'visible', backgroundColor: 'transparent' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={'/src/assets/blog.png'} // Assuming blog object has an image property
                  alt={blog.title}
                  sx={{ borderRadius: 2, boxShadow: 3 }}
                />
                <Chip
                  label={blog.author} // Changed to display category as per image
                  variant="filled"
                  sx={{ position: 'absolute', top: 8, left: 8, backgroundColor: 'white', fontWeight: 'bold' }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'left', boxShadow: 'none', border: 'none' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {formatDate(blog.date)}
                </Typography>
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(blogs.length / 9)}
        page={page}
        onChange={handlePageChange}
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default Blog;
