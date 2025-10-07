import { Outlet } from 'react-router-dom';
import DashBoard from '../components/dashboard/dashBoard';

const LayoutAdmin = () => (
  <div style={{ display: 'flex' }}>
    <DashBoard />
    <div style={{ flexGrow: 1 }}>
      <Outlet />
    </div>
  </div>
);

export default LayoutAdmin;
