import { useGlobalPagesContext } from "../Context/Global.Context";

const CartPage = () => {
  const { name } = useGlobalPagesContext();

  return (
    <>
      <h1>{name}</h1>
    </>
  );
};
export default CartPage;
