import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineBell,
  AiFillBell,
  AiOutlineSetting,
  AiTwotoneSetting,
} from 'react-icons/ai';
import {
  HiOutlinePencil,
  HiPencil,
  HiOutlineGlobe,
  HiGlobe,
  HiOutlineBookmark,
  HiBookmark,
} from 'react-icons/hi';

const TopBarNavigation: FC<{
  activateTab: string;
  authorAvatar: string;
  authorName: string;
}> = ({ activateTab, authorAvatar, authorName }) => {
  return <nav></nav>;
};

export default TopBarNavigation;
