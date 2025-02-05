import { useState } from 'react';
import * as React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { register } from './usersThunk.ts';
import FileInput from '../../components/FileInput/FileInput.tsx';


const initialState = {
  username: '',
  password: '',
  image: '',
  displayName: ''
};

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit =  async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const getFiledError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch (e) {
      return e;
    }
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="d-flex flex-column align-items-center">
            <h3 className="my-5">Sign Up</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={inputChange}
                type="text"
                className={`form-control ${getFiledError('username') ? 'is-invalid' : ''}`}
                placeholder="Enter Username"
              />
              {getFiledError('username') && (
                <div className="invalid-feedback">{getFiledError('username')}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={inputChange}
                type="password"
                className={`form-control ${getFiledError('password') ? 'is-invalid' : ''}`}
                placeholder="Password"
              />
              {getFiledError('password') && (
                <div className="invalid-feedback">{getFiledError('password')}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                id="displayName"
                name="displayName"
                value={form.displayName}
                onChange={inputChange}
                type="text"
                className="form-control"
                placeholder="Enter Display Name"
              />
            </div>
            <div className="form-group my-3">
              <FileInput name="image" label="Image" onGetFile={getImage}/>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
            <Link to="/login" className="mt-3">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;