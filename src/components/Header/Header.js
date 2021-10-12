import React from "react";

//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

//My components
import NavBar from './NavBar';

export default function Header() {
  const data = [
    {
      navItemName: "Xương rồng",
      list: [
        {
          itemName: "Tất cả",
          itemUrl: '/products/cactus',
          path: /,Cactus,/,
        },
        {
          itemName: "Cỡ lớn",
          itemUrl: '/products/cactus/large-cactus',
          path: /,Cactus,LargeCactus/,
        },
        {
          itemName: "Cỡ vừa",
          itemUrl: '/products/cactus/medium-cactus',
          path: /,Cactus,MediumCactus/,
        },
        {
          itemName: "Cỡ nhỏ",
          itemUrl: '/products/cactus/small-cactus',
          path: /,Cactus,SmallCactus/,
        },
        {
          itemName: "Mix",
          itemUrl: '/products/cactus/mix-cactus',
          path: /,Cactus,MixCactus/,
        }
      ]
    },
    {
      navItemName: "Sen đá",
      list: [
        {
          itemName: "Tất cả",
          itemUrl: '/products/stone-lotus',
          path: /,StoneLotus,/,
        },
        {
          itemName: "Cỡ lớn",
          itemUrl: '/products/stone-lotus/large-stone-lotus',
          path: /,StoneLotus,LargeStoneLotus,/,
        },
        {
          itemName: "Cỡ vừa",
          itemUrl: '/products/stone-lotus/medium-stone-lotus',
          path: /,StoneLotus,MediumStoneLotus,/,
        },
        {
          itemName: "Cỡ nhỏ",
          itemUrl: '/products/stone-lotus/small-stone-lotus',
          path: /,StoneLotus,SmallStoneLotus,/,
        },
        {
          itemName: "Mix",
          itemUrl: '/products/stone-lotus/mix-stone-lotus',
          path: /,StoneLotus,MixStoneLotus,/,
        },
      ]
    },
    {
      navItemName: "Chậu",
      list: [
        {
          itemName: "Tất cả",
          itemUrl: '/products/pots',
          path: /,Pots,/,
        },
        {
          itemName: "Chậu sứ",
          itemUrl: '/products/pots/ceramic-pots',
          path: /,Pots,CeramicPots,/,
        },
        {
          itemName: "Chậu đất nung",
          itemUrl: '/products/pots/terracotta-pots',
          path: /,Pots,TerracottaPots,/,
        },
      ]
    }
  ]

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar data={data} />
    </React.Fragment>
  );
}