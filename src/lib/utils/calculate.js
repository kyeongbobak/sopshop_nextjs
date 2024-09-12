export const totalProductPrice = (productInfos, cartList) => {
  return cartList.length > 0 && productInfos.reduce((acc, cur, index) => acc + cur.price * cartList[index].quantity, 0);
};

export const totalShippingPrice = (productInfos) => {
  return productInfos.reduce((acc, cur) => acc + cur.shipping_fee, 0);
};
