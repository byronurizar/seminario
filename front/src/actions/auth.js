import callApi from '../helpers/conectorApi';
import * as actionTypes from '../store/actions';
import Cookies from 'js-cookie'

let inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

export const loginBackend = (infoLogin) => {
    return async (dispatch) => {
        if (infoLogin===undefined) {
            let token = Cookies.get("auth");
            if(token){
            token=atob(token);
            const dataUsuario=await InformacionUsuario();
            const {userInfo, accesos, menu}=!!dataUsuario && dataUsuario
            dispatch(login(token, userInfo, accesos, menu));
            }
        } else {
            let data = await callApi('auth', {
                method: 'POST',
                body: JSON.stringify(infoLogin)
            });
            if (data) {
                const { token } = data;
                if(infoLogin.recordarme===true){
                    Cookies.set("auth", btoa(token), { expires: 7 });
                }else{
                Cookies.set("auth", btoa(token));
                }
                const dataUsuario=await InformacionUsuario();
                const {userInfo, accesos, menu}=!!dataUsuario && dataUsuario
                dispatch(login(token, userInfo, accesos, menu));
            }
        }

    }
}

export const UpdateAcesosMenu = () => {
    return async (dispatch) => {
        const accesos = await GetAccesos();
        const menu = await GetMenu();
        dispatch(updatePermisoYMenu(accesos, menu));
    }
}
export const UpdateUserInfo=()=>{
    return async (dispatch) => {
        const dataUsuario=await InformacionUsuario();
        const {userInfo, accesos, menu}=!!dataUsuario && dataUsuario
        dispatch(updateInfo(userInfo, accesos, menu));
    }
}

const updateInfo=(userInfo, accesos, menu)=>({
    type: actionTypes.UPDATE_USER_INFO,
    payload: {
        userInfo,
        accesos,
        menu,
        logged: true
    }
});
const login = (token, userInfo, accesos, menu) => ({
    type: actionTypes.LOGIN,
    payload: {
        token,
        userInfo,
        accesos,
        menu,
        logged: true
    }
});

export const updatePassWord = () => ({
    type: actionTypes.CAMBIO_PASSWORD
});

export const logout = () => ({
    type: actionTypes.LOGOUT
});


const updatePermisoYMenu = (accesos, menu) => ({
    type: actionTypes.ACTUALIZAR_PERMISOS_MENU,
    payload: {
        accesos,
        menu
    }
});

const GetAccesos = async () => {
    let accesos = await callApi('rolmenuacceso/accesos');
    if (accesos) {
        return accesos;
    } else {
        return [];
    }
}

const GetMenu = async () => {
    let menu = await callApi('menu/mimenu');
    if (menu) {
        return menu;
    } else {
        return [];
    }
}

const InformacionUsuario=async()=>{
    let response = await callApi('usuario/info');
    if (response) {
        return response;
    } else {
        return {};
    }
}