import React from 'react';

import {
  Link as Links,
  useLocation
} from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const convert = (path) => {
  let newPath = [];
  path.forEach(element => {
    switch (element) {
      case "list-of-cactus":
        newPath.push({
          name: "Tất cả xương rồng",
          url: "/list-of-cactus",
        });
        break;

      case "large-cactus":
        newPath.push({
          name: "Cỡ lớn",
          url: "/list-of-cactus/large-cactus",
        });
        break;

      case "medium-cactus":
        newPath.push({
          name: "Cỡ vừa",
          url: "/list-of-cactus/medium-cactus",
        });
        break;

      case "small-cactus":
        newPath.push({
          name: "Cỡ nhỏ",
          url: "/list-of-cactus/small-cactus",
        });
        break;

      case "mix-cactus":
        newPath.push({
          name: "Mix",
          url: "/list-of-cactus/mix-cactus",
        });
        break;
      //Lotus
      case "list-of-lotus":
        newPath.push({
          name: "Tất cả sen đá",
          url: "/list-of-lotus",
        });
        break;

      case "large-lotus":
        newPath.push({
          name: "Cỡ lớn",
          url: "/list-of-lotus/large-lotus",
        });
        break;

      case "medium-lotus":
        newPath.push({
          name: "Cỡ vừa",
          url: "/list-of-lotus/medium-lotus",
        });
        break;

      case "small-lotus":
        newPath.push({
          name: "Cỡ nhỏ",
          url: "/list-of-lotus/small-lotus",
        });
        break;

      case "mix-lotus":
        newPath.push({
          name: "Mix",
          url: "/list-of-lotus/mix-lotus",
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
    }
  });
  return newPath;
}

export default function SimpleBreadcrumbs(props) {
  const location = useLocation();
  let path = location.pathname.split('/');
  path.shift();
  const newpath = convert(path);

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
