import { Outlet } from 'react-router-dom';

const LayoutAdmin = () => (
  <div style={{ display: 'flex' }}>
    <Dashboard />
    <div style={{ flexGrow: 1 }}>
      <Outlet />
    </div>
  </div>
);

export default LayoutAdmin;
