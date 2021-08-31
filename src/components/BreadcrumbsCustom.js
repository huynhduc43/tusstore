import React from 'react';

import {
  Link as Links,
  useLocation
} from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const convert = (path, breadCrumb, productUrl) => {
  let newPath = [];
  path.forEach(element => {
    switch (element) {
      case "products":
        break;
      case "cactus":
        newPath.push({
          name: "Tất cả xương rồng",
          url: "/products/cactus",
        });
        break;

      case "large-cactus":
        newPath.push({
          name: "Cỡ lớn",
          url: "/products/cactus/large-cactus",
        });
        break;

      case "medium-cactus":
        newPath.push({
          name: "Cỡ vừa",
          url: "/products/cactus/medium-cactus",
        });
        break;

      case "small-cactus":
        newPath.push({
          name: "Cỡ nhỏ",
          url: "/products/cactus/small-cactus",
        });
        break;

      case "mix-cactus":
        newPath.push({
          name: "Mix",
          url: "/products/cactus/mix-cactus",
        });
        break;
      //Lotus
      case "stone-lotus":
        newPath.push({
          name: "Tất cả sen đá",
          url: "/products/stone-lotus",
        });
        break;

      case "large-stone-lotus":
        newPath.push({
          name: "Cỡ lớn",
          url: "/products/stone-lotus/large-stone-lotus",
        });
        break;

      case "mediume-stone-lotus":
        newPath.push({
          name: "Cỡ vừa",
          url: "/products/stone-lotus/medium-stone-lotus",
        });
        break;

      case "smalle-stone-lotus":
        newPath.push({
          name: "Cỡ nhỏ",
          url: "/products/stone-lotus/small-stone-lotus",
        });
        break;

      case "mix-stone-lotus":
        newPath.push({
          name: "Mix",
          url: "/products/stone-lotus/mix-stone-lotus",
        });
        break;
      case "pots":
        newPath.push({
          name: "Tất cả chậu",
          url: "/products/pots",
        });
        break;
      case "ceramic-pots":
        newPath.push({
          name: "Chậu sứ",
          url: "/products/pots/ceramic-pots",
        });
        break;
      case "terracotta-pots":
        newPath.push({
          name: "Chậu đất nung",
          url: "/products/pots/terracotta-pots",
        });
        break;
      //Cart
      case "cart":
        newPath.push({
          name: "Giỏ hàng",
          url: "/cart",
        });
        break;
      //Account
      case "account":
        newPath.push({
          name: "Tài khoản",
          url: "/account/profile",
        });
        break;

      case "profile":
        newPath.push({
          name: "Thông tin tài khoản",
          url: "/account/profile",
        });
        break;

      case "manage-orders":
        newPath.push({
          name: "Quản lý đơn hàng",
          url: "/account/manage-orders",
        });
        break;

      case "wishlist":
        newPath.push({
          name: "Sản phẩm yêu thích",
          url: "/account/wishlist",
        });
        break;

      case "notifications":
        newPath.push({
          name: "Thông báo",
          url: "/account/notifications",
        });
        break;

      default:
        newPath.push({
          name: breadCrumb,
          url: productUrl,
        });
    }
  });
  return newPath;
}

export default function SimpleBreadcrumbs(props) {
  const location = useLocation();
  let path = location.pathname.split('/');
  path.shift();
  const newpath = convert(path, props.breadCrumb, location.pathname);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {location !== "/" && <Link color="inherit" component={Links} to="/">
        Home
      </Link>}
      {newpath.map((item, i) => (
        <Link key={i} color="inherit" component={Links} to={item.url}>
          {item.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
