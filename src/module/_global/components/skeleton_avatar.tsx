import { Avatar } from '@mantine/core';
import React from 'react';
import bgIcon from "../../../../public/assets/img/avatar.png"

interface AvatarType {
  img: string
  size: string
  sizeNoImg: string
}

export default function SkeletonAvatar({ img, size, sizeNoImg }: AvatarType) {
  return (
    <>
      {img == "" ? 
        <Avatar
        size={sizeNoImg}
        radius={"100"}
        src={String(bgIcon)}
      />
        :
        <Avatar
          size={size}
          radius={"100"}
          src={img}
        />
      }
    </>
  );
}
