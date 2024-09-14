export const totalProductPrice = (productInfos, cartList) => {
  const itemInCart = productInfos.filter((product) => cartList.find((list) => list.product_id === product.product_id));
  return itemInCart.reduce((acc, cur, index) => acc + cur.price * cartList[index].quantity, 0);
};

export const totalShippingPrice = (productInfos) => {
  return productInfos.reduce((acc, cur) => acc + cur.shipping_fee, 0);
};
