import {View} from "react-native";
import Home from "@/assets/icons/home";
import React, {ReactNode} from "react";
import {SvgProps} from "react-native-svg";
import {theme} from "@/constants/theme";

interface IIcons {
    home: (props: SvgProps) => React.JSX.Element
}
interface IProps extends SvgProps{
    name: keyof IIcons
    size?: number
}

const icons: IIcons = {
    home: Home
}

const Icon = ({name, ...props}: IProps) => {
    const IconComponent = icons[name]
    return (
        <IconComponent height={props.size || 24} width={props.size || 24} strokeWidth={props.strokeWidth || 1.9} color={theme.colors.textLight} {...props}  />



    )
}

export default Icon