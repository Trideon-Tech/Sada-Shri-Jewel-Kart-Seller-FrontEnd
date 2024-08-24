import CustomDrawer from "../../components/drawer/drawer.component";
import OrderDetail from "../../components/orderDetail/orderDetail.component";
import "./productpage.styles.scss";
import { useParams } from "react-router-dom";

const OrderDetailsComponent = () => {
  let { id } = useParams();
  return (
    <div className="product-component">
      <CustomDrawer section={"orders"} />
      <div className="component">
        <OrderDetail id={id} />
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
