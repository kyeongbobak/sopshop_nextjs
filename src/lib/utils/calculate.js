export const totalProductPrice = (productInfos, cartList) => {
  return productInfos.reduce((acc, cur, index) => acc + cur.price * cartList[index].quantity, 0);
};

export const totalShippingPrice = (productInfos) => {
  return productInfos.reduce((acc, cur) => acc + cur.shipping_fee, 0);
};
