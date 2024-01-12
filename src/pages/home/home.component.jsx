import React from 'react';
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import './home.styles.scss';
import CustomDrawer from '../../components/drawer/drawer.component';
import Products from '../products/products.component';
import AddNewProduct from '../products/addNewProduct.component';

function Home() {
  let { section } = useParams();
  return (
    <div className="home-component">
      <CustomDrawer section={section} />
      <Divider orientation="vertical" className="divider" />
      <div className="component">
        {section === "dashboard" ? <div>hello</div> : section === "products" ? <Products /> : section === "addNewProduct" ? <AddNewProduct/> : <>Hey</>}
      </div>
    </div>
  );
}

export default Home;