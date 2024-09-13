import { View } from "react-native";
import Home from "@/assets/icons/home";
import React, { ReactNode } from "react";
import { SvgProps } from "react-native-svg";
import { theme } from "@/constants/theme";
import ArrowLeft from "@/assets/icons/arrow-left";
import MailIcon from "@/assets/icons/mail";
import LockIcon from "@/assets/icons/lock";
import UserIcon from "@/assets/icons/user";
import HeartIcon from "@/assets/icons/heart";
import AddIcon from "@/assets/icons/add";
import LogoutIcon from "@/assets/icons/logout";

interface IIcons {
  home: (props: SvgProps) => React.JSX.Element;
  arrowLeft: (props: SvgProps) => React.JSX.Element;
  mail: (props: SvgProps) => React.JSX.Element;
  lock: (props: SvgProps) => React.JSX.Element;
  user: (props: SvgProps) => React.JSX.Element;
  heart: (props: SvgProps) => React.JSX.Element;
  add: (props: SvgProps) => React.JSX.Element;
  logout: (props: SvgProps) => React.JSX.Element;
}

interface IProps extends SvgProps {
  name: keyof IIcons;
  size?: number;
}

const icons: IIcons = {
  home: Home,
  arrowLeft: ArrowLeft,
  mail: MailIcon,
  lock: LockIcon,
  user: UserIcon,
  heart: HeartIcon,
  add: AddIcon,
  logout: LogoutIcon,
};

const Icon = ({ name, ...props }: IProps) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.textLight}
      {...props}
    />
  );
};

export default Icon;
