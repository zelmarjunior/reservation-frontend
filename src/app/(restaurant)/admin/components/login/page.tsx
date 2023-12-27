'use client'
import * as React from 'react'
import styles from './page.module.css'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { useAdminContext } from '@/app/contexts/adminContext';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const router = useRouter();
  const { setUserLogged } = useAdminContext();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const login = async () => {
    console.log(process.env.AVAILABILITY_API_URL);

    const response = await fetch("http://localhost:3333/admin/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
        restaurantId: 1
      })
    });

    if (response.ok) {
      const data = await response.json();

      console.log(data);
      

/*       if (data) {
        setUserLogged(true);
      } else {
        setUserLogged(false);
      } */
    } else {
      throw new Error(response.statusText);
    }
  };

  const handleLogin = async () => {
    console.log(name, password);
    if (!name || !password) return
    //const isLogged = await login();

    //router.push('/admin')
  };

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: '30px', marginTop: '30px' }}>
      <h1 className={styles.login_title}>Login</h1>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <TextField id="outlined-basic" label="User" variant="outlined" />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button className={styles.icon_button} onClick={() => handleLogin()} aria-label="fingerprint" color="success">Logar</Button>
    </Box>
  )
}
