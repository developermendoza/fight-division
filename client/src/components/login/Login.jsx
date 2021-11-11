import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect, Route } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { login } from '../../actions/auth';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import Copyright from '../copyright/Copyright';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from  '@material-ui/core/FormHelperText';
import { userAuthenticated } from '../../utils';

const Login = (props) => {
  const initialState = {
    email:"",
    password:''
  }
  const classes = useStyles();
  const [ user, setUser ] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory()
  const [ errors, setErrors ] = useState({})
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]:value
    })
  }

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user, history, "login"))
  }

  useEffect(() => {
    if(props.errors){
      setErrors(props.errors)
    }
    return () => {
      dispatch({type:"CLEAR_ERRORS"})
    };
  }, [props.errors, dispatch]);

  // useEffect(() => {
  //   userAuthenticated ? <Redirect to="/login" />
  // }, [input])


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} square style={{maxWidth:"400px"}}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
              error={errors.email? true : false}
              helperText={errors?errors.email: null}
            />
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="password" error={errors.password? true : false}>Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={user.password}
            onChange={handleChange}
            error={errors.password? true : false}
            name="password"
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
           {errors && (
            <FormHelperText error id="errors-password">
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/recover-password"variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.auth.errorLogin
  }
}

export default connect(mapStateToProps)(Login)