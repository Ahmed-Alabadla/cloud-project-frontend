import type { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import router from './routes/index.tsx';
import { AuthContext, ThemeProvider } from './context';
import './index.css';

const App = (): ReactElement => (
  <ThemeProvider>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={
        { vertical: 'top', horizontal: 'right' }
      }
    >
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>

    </SnackbarProvider>
  </ThemeProvider>

);

export default App;
