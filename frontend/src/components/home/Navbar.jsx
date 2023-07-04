import React from 'react'
import {Box,Typography,styled} from '@mui/material'
import { navData } from '../../constants/data.js'

const Component = styled(Box)(({theme})=>({
  display: "flex",
  margin: "55px 130px 0 130px",
  justifyContent: "space-between",
  overflow: "hidden",
  [theme.breakpoints.down('lg')]:{
    margin: 0
  }
}));

const Container = styled(Box)`
  padding: 12px 8px;
  text-align: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
`

const Navbar = () => {
  return (
    <Box style={{background:"#fff"}}>
    <Component>
        {
            navData.map(data=>{
                return (
                <Container>
                   <img src={data.url} alt="nav" style={{width:64}}/>
                   <Text>{data.text}</Text>
                </Container>);
            })
        }
    </Component>
    </Box>
  )
}

export default Navbar
