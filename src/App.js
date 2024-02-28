import './App.css';
import Container from '@mui/material/Container';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Main from './components/Main';
import { Stack } from '@mui/material';
import RigthBar from './components/RigthBar';
import { Route, Routes } from 'react-router-dom';
import MonthList from './components/MonthList';
import AddButton from './components/AddButton';
import FormModal from './components/FormModal';
import FrndList from './components/FrndList';
import Profile from './components/Profile';

export const DataContext = createContext(null);

// Initial state
const initialState = {
  items: [],
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_ITEMS':
      return {
        ...state,
        items: action.payload,
      }
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload.updatedItem } : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// Profile Initial state
const profileInitialState = {
  profile: {},
};

// Profile Reducer function
const profileReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_PROFILE':
      return {
        ...state,
        profile: action.payload,
      }
    case 'ADD_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        // items: state.items.map(item =>
        //   item.id === action.payload.id ? { ...item, ...action.payload.updatedItem } : item
        // ),
        profile: action.payload
      };
    default:
      return state;
  }
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [profileState, profileDispatch] = useReducer(profileReducer, profileInitialState);

  useEffect(() => {
    localStorage.getItem('BirthDayData') === null &&
      localStorage.setItem('BirthDayData', JSON.stringify([]))
    localStorage.getItem('Profile') === null &&
      localStorage.setItem('Profile', JSON.stringify([]))
  }, [])

  // useEffect(() => {
  //   console.log(state.items)
  //   console.log(profileState)
  // }, [state, profileState])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('BirthDayData'));
    if (storedItems) {
      dispatch({ type: 'INITIALIZE_ITEMS', payload: storedItems });
    }
    const fetchedProfile = localStorage.getItem('Profile') && JSON.parse(localStorage.getItem('Profile'));
    // console.log('fetched Profile', fetchedProfile)
    if (fetchedProfile) {
      profileDispatch({ type: 'INITIALIZE_PROFILE', payload: fetchedProfile })
    }
  }, []);

  return (
    <React.Fragment>
      <DataContext.Provider value={{ localData: state, localDispatch: dispatch, profileData: profileState, profileDispatch: profileDispatch }}>
        <Header />
        <Container sx={{ maxWidth: { lg: '95%' } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={1}>
            <SideBar />
            <Routes>
              <Route path="/" exact element={<FrndList />} />
              <Route path="/month" exact element={<Main />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
            <RigthBar />
          </Stack>
          <AddButton />
        </Container>
      </DataContext.Provider>
    </React.Fragment>
  );
}

export default App;
