import React from 'react';
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import './home.styles.scss';
import CustomDrawer from '../../components/drawer/drawer.component';


function Home() {
  let { section } = useParams();
  return (
    <div className="home-component">
      <CustomDrawer section={"dasboard"} />
      <Divider orientation="vertical" className="divider" />
      <div className="component">
        <div>Dashboard </div>
      </div>
    </div>
  );
}

export default Home;