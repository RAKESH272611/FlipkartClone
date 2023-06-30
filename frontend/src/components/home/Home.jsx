import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import {styled,Box} from '@mui/material';

const Component = styled(Box)`
  padding: 10px;
  background: #F2F2F2;
`

const Home = () => {
  return (
    <>
        <Navbar/>
        <Component>
        <Banner/>
        </Component>
    </>
  )
}

export default Home
