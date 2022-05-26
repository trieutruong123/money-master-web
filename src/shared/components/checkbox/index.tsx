import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

type MuiColor = "primary" | "secondary" | "success" | "error" | "warning" | "info" | "default" | undefined;

interface IProps {
    sx?: any,
    color?: MuiColor,
    icon?: JSX.Element;
    checkedIcon?: JSX.Element;
    onChange?: Function;
    defaultChecked?: boolean;
}


const CheckBoxButton = ({ sx = {}, color = 'primary', defaultChecked = false, onChange, icon, checkedIcon }: IProps) => {
    const [checked, setChecked] = React.useState<boolean>(defaultChecked);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e?.target.checked);
            setChecked(e?.target.checked);

        }
    }

    return <>
        <Checkbox
            defaultChecked={defaultChecked}
            sx={{ ...sx }}
            color={color}
            onChange={handleChange}
        />
    </>
}
export default CheckBoxButton