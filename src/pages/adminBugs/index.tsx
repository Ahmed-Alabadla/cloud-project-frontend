import { Container } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../context';
import Bugs from '../../components/dashboard/bugs';

const AdminBugs = () => {
  const themes = useContext(ThemeContext);
  return (
    <Container sx={{
      width: '100%',
      padding: '50px 0px 50px 0px',
      height: '100vh',
      backgroundColor: themes?.themeMode === 'dark' ? '#181A1B' : '#F4F7FF',
    }}
    >
      <Bugs />
    </Container>
  );
};
export default AdminBugs;
