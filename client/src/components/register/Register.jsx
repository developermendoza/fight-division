import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useStyles } from './styles';
import Copyright from '../copyright/Copyright';
import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { register } from '../../actions/auth';
import InputAdornment from '@material-ui/core/InputAdornment';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from  '@material-ui/core/FormHelperText';
import ImageUploading from "react-images-uploading";

const Register = (props) => {
  const initialState = {
    username: "",
    email:"",
    password:"",
    confirmPassword:"",
    image:""
  }

  const classes = useStyles();
  const [ user, setUser ] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ errors, setErrors ] = useState({})
  const [values, setValues] =useState({
    showPassword: false,
    showConfirmPassword: false
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]:value
    })
  }

  const setImage = (base64) => {
    setUser({
      ...user,
      image:base64[0].data_url
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("user: ", user)
    dispatch(register(user, history, "register"))
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(props.errors){
      setErrors(props.errors)
    }
    return () => {
      dispatch({type:"CLEAR_ERRORS"})
    };
  }, [props.errors,dispatch])

  return (
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={user.username}
                onChange={handleChange}
                error={errors.username? true : false}
                helperText={errors?errors.username: null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email? true : false}
                helperText={errors?errors.email: null}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="password" error={errors.password? true : false}>Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={user.password}
                  onChange={handleChange}
                  error={errors.password? true : false}
                  name="password"
                  autoComplete="new-password"
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
            </Grid>
            <Grid item xs={12}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="confirmPassword" error={errors.confirmPassword? true : false}>Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  type={values.showConfirmPassword ? 'text' : 'password'}
                  value={user.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword? true : false}
                  name="confirmPassword"
                  autoComplete="new-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {errors && (
                  <FormHelperText error id="errors-password">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <InputLabel>Add An Avatar</InputLabel>
          <br/>
              <ImageUploading
                value={user.image}
                onChange={setImage}
                dataURLKey="data_url"
              >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
              }) => (
          // write your building UI
              <div className={`register-upload-image ${classes.uploadImageWrapper}`}
                style={{
                    backgroundImage: "url(images/icons/upload.png)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "80px",
                    backgroundPosition: "50% 20px",
                    backgroundColor: isDragging ? "grey" : null || imageList.length > 0 ? "grey" : null,
                  }}
                {...dragProps}
              >
                {imageList.length > 0 ? <div className={classes.imageWrapper}>
                <img src={user.image} alt="" width="100" />
                <div>
                  <Button variant="contained" type="button" className={`${classes.imageUploadButton}`}     onClick={() => {
                  onImageRemove(0)
                  } 
            } >Remove</Button>
            </div>
          </div> : <Button type="button" variant="contained"
             className={`${classes.imageUploadButton}`}
                  onClick={onImageUpload}
                  {...dragProps}
                  >
                  Browse Image
                </Button> }
          </div>
        )}
      </ImageUploading>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.auth.errorRegister
  }
}

export default connect(mapStateToProps)(Register);