import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Image = styled.img`
  width: 300px;
  margin-bottom: 16px; /* Adjust the margin value as needed */
`;

const Text = styled(Typography)`
  margin-bottom: 8px; /* Adjust the margin value as needed */
`;

const LinkText = styled(Link)`
  text-decoration: none;
  color : white;
`;

const NotFound = () => (
  <Container>
    <Image
      src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
      alt="404 Error"
    />
    <Text variant="h4">
      Oops! Page Not Found
    </Text>
    <Text variant="body1">
      The page you are looking for does not exist.
    </Text>
    <Button variant="contained" color="primary">
      <LinkText to="/">
        Go to Homepage
      </LinkText>
    </Button>
  </Container>
);

export default NotFound;
