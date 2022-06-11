import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { rootStore } from 'shared/store';


interface IProps {
    content: string;
    onFinish: Function;
    variant?: 'text' | 'outlined' | 'contained';
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const Input = styled('input')({
    display: 'none',
});


const acceptImage = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png'];

export const ImagePicker = ({ content, onFinish, variant, color }: IProps) => {
    const [isError, setIsError] = React.useState(false);
    const handleChange = (event: any) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        const image: any = formData.get('image');
        if (acceptImage.includes(image.type)) {
            onFinish(formData);
        } else {
            rootStore.raiseError('Wrong image file type');
        }
    };
    return (
        <>
            <label htmlFor="contained-button-file">
                <Input accept="image/png, image/jpeg" id="contained-button-file" multiple type="file" onChange={handleChange} />
                <Button color={color} fullWidth variant={variant} component="span">
                    {content}
                </Button>
            </label>
        </>
    );
};