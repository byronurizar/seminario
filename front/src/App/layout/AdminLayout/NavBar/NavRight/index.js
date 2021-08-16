import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import avatarMen from '../../../../../assets/images/user/userMen.jpg';
import avatarWoman from '../../../../../assets/images/user/userWoman.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../../../../actions/auth';
import Cookies from 'js-cookie';
const NavRight = ({ rtlLayout,history }) => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state);
    let bufferBase64;
    if (userInfo?.imagen) {
        bufferBase64 = new Buffer(userInfo.imagen.foto.data, "binary").toString("base64");
    }
    const handleLogout = () => {
        Cookies.remove("auth");
        localStorage.clear();
        dispatch(logout());
        history.replace("/auth/login");
    }
    return (
        <Aux>
            <ul className="navbar-nav ml-auto">
                {
                    false &&
                    <li>
                        <Dropdown alignRight={!rtlLayout}>

                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="feather icon-bell icon" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                                        <a href={DEMO.BLANK_LINK}>clear all</a>
                                    </div>
                                </div>
                                <div style={{ height: '300px' }}>
                                    <PerfectScrollbar>
                                        <ul className="noti-body">
                                            <li className="n-title">
                                                <p className="m-b-0">NEW</p>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>{userInfo?.nombre ?? 'Por favor inicie sesión'}</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />5 min</span></p>
                                                        <p>New ticket Added</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="n-title">
                                                <p className="m-b-0">EARLIER</p>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />10 min</span></p>
                                                        <p>Prchace New Theme and make payment</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar1} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />12 min</span></p>
                                                        <p>currently login</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="notification">
                                                <div className="media">
                                                    <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                                                    <div className="media-body">
                                                        <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10" />30 min</span></p>
                                                        <p>Prchace New Theme and make payment</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </PerfectScrollbar>
                                </div>
                                <div className="noti-footer">
                                    <a href={DEMO.BLANK_LINK}>show all</a>
                                </div>
                            </Dropdown.Menu>

                        </Dropdown>
                    </li>
                }
                <li>
                    <Dropdown alignRight={!rtlLayout} className="drp-user">
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <i className="icon feather icon-user" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                {/* <img src={Avatar2} className="img-radius" alt="User Profile" /> */}
                                {
                                    userInfo?.imagen != null ?
                                        <img src={"data:image/jpeg;base64," + bufferBase64} className="img-radius" alt="Imagen de usuario" />
                                        :
                                        userInfo?.generoId === 2 ?
                                            <img src={avatarWoman} className="img-radius" alt="User-Profile" />
                                            :
                                            <img src={avatarMen} className="img-radius" alt="User-Profile" />
                                }
                                <span>{userInfo?.nombre ?? 'Por favor inicie sesión'}</span>
                                <a className="dud-logout" title="Salir" onClick={handleLogout}><i className="feather icon-log-out" /></a>
                                {/* <Link to={"/auth/login"} className="dud-logout" title="Salir"> <i className="feather icon-log-out" /></Link> */}
                            </div>
                            <ul className="pro-body">
                                <li><Link to="/base/infouser" className="dropdown-item"><i className="feather icon-user" /> Mi Perfil</Link></li>
                                {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings" /> Settings</a></li>
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail" /> My Messages</a></li>
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock" /> Lock Screen</a></li> */}
                                <li><a className="dropdown-item" onClick={handleLogout}><i className="feather icon-log-out" /> Salir</a></li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </Aux>
    )
}

export default withRouter(NavRight)
