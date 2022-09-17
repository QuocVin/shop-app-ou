import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    Box,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import cookies from 'react-cookies';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from "./Home-styles";
import { setAuthLS, LS_KEY } from "../../helpers/localStorage";
import { formSearch } from "./Home-const";
import { useForm } from "react-hook-form";
import {
    AppTable,
    AppInput,
    AppForm,
    AppSearch,
    AppAlert,
} from '../../components';
import { PublicRoutes } from '../../routes/public-route';
import { infoRequest } from '../../helpers/utils';
import { ProtectPaths } from '../../routes/protect-route';

export default function Home() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertInfo, setAlertInfo] = React.useState(false);
    const { control, setValue, getValues } = useForm();

    const signInSucess = (role) => {
        setAuthLS(LS_KEY.AUTH_TOKEN, role);
    }

    // xử lý sự kiện đóng thông báo
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setOpenAlert(false);
            if (alertInfo.typeAlert.success) {
                window.location.reload();
            }
        }
    };

    return (
        <Container className={classes.Home}>
            <Box className='box-login'>
                <Box>
                    <Typography variant="h4" className='title-login'>{PublicRoutes.Home.label}</Typography>
                </Box>

            </Box>
        </Container>
    );
}