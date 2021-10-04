import React, { useEffect } from 'react';
import { Row, Col, Card, Dropdown, Form } from 'react-bootstrap';
import Aux from "./../../../hoc/_Aux";
import DEMO from "../../../store/constant";
import Select from 'react-select';
import Gallery from "../../../App/components/Gallery";
import { useState } from 'react';
import callApi from '../../../helpers/conectorApi';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from './Loading';
import { useForm } from '../../hooks/useForm';
import moment from 'moment';
import { ValidationForm, SelectGroup } from 'react-bootstrap4-form-validation';
import { alert_warning, alert_exitoso } from '../../../helpers/Notificacion';
import { useSelector } from 'react-redux';
import { NoAutorizado } from './NoAutorizado';
const menuId = 36;

export const QuejaList = () => {

    const stateRedux = useSelector(stateRedux => stateRedux);
    const [accesos, setAccesos] = useState([]);
    const [listQuejasDepto, setListQuejasDepto] = useState([]);
    const [listQuejas, setListQuejas] = useState([]);
    const [numPaginaActual, setNumPaginaActual] = useState(0);
    const [numPagMax, setNumPagMax] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemsTodos, setTotalItemsTodos] = useState(0);
    const [origenQuejas, setOrigenQuejas] = useState('Todos los departamentos');
    const [infoItem, setInfoItem] = useState({});

    const [listRegiones, setListRegiones] = useState([]);
    const [listDepartamentos, setListDepartamentos] = useState([]);
    const [listMunicipios, setListMunicipios] = useState([]);
    const [listComercios, setListComercios] = useState([]);
    const [listSucursales, setListSucursales] = useState([]);
    const [adjuntosQueja, setAdjuntosQueja] = useState([]);

    const [filtrosAvanzados, setFiltrosAvanzados] = useState(false);
    const [editQueja, setEditQueja] = useState(false);
    const [tipoBusqueda, setTipoBusqueda] = useState(0);
    const [btnClickAvanzado, setBtnClickAvanzado] = useState(0);
    const [btnClickXDepto, setBtnClickXDepto] = useState(0);

    const [loadingInfo, setLoadingInfo] = useState(false);


    const [values, handleOnChange, , setValues] = useForm({
        tipoBusqueda,
        fechaInicial: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD'),
        fechaFinal: moment(new Date()).format('YYYY-MM-DD'),
        departamentoId: 0,
        regionId: 0,
        municipioId: 0,
        comercioId: 0,
        sucursalId: 0,
        estado_quejaId: 0
    });

    const [resultQueja, handleChangeRespues, , setValuesQueja] = useForm({
        solucion: '',
        observaciones: ''
    });

    const GetQuejasPorDepto = async () => {
        if (accesos.find(acceso => Number(acceso.menuId) === menuId && acceso.accesoId === 3)) {
            let response = await callApi('quejaadmin/quejasdepto');
            if (response) {
                setListQuejasDepto(response);
            }
        }
    }

    const GetAccesosByMenuId = () => {
        if (stateRedux?.accesos) {
            const { accesos } = stateRedux;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
            setAccesos(misAccesos);
        }
    }


    const GetCatalogo = async (parametro, parametro2 = 0) => {
        if (accesos.find(acceso => Number(acceso.menuId) === menuId && acceso.accesoId === 3)) {
            let response = {};
            let items = [];
            switch (parametro) {
                case 'misregiones':
                    response = await callApi(`quejaadmin/${parametro}`);
                    if (response) {
                        items = response || [];
                        items.unshift({ value: 0, label: 'TODAS LAS REGIONES' });
                        setListRegiones(items);
                    }
                    break;
                case 'misdeptos':
                    response = await callApi(`quejaadmin/${parametro}?regionId=${parametro2}`);
                    if (response) {
                        items = response || [];
                        items.unshift({ value: 0, label: 'TODOS LOS DEPARTAMENTOS' });
                        setListDepartamentos(items);
                    }
                    break;
                case 'municipios':
                    response = await callApi(`quejaadmin/${parametro}?departamentoId=${parametro2}`);
                    if (response) {
                        items = response || [];
                        items.unshift({ value: 0, label: 'TODOS LOS MUNICIPIOS' });
                        setListMunicipios(items);
                    }
                    break;
                case 'comers':
                    response = await callApi(`quejaadmin/${parametro}?departamentoId=${values.departamentoId}&municipioId=${values.municipioId}`);
                    if (response) {
                        items = response || [];
                        items.unshift({ value: 0, label: 'TODOS LOS COMERCIOS' });
                        setListComercios(items);
                    }
                    break;
                case 'sucurs':
                    response = await callApi(`quejaadmin/${parametro}?comercioId=${values.comercioId}&municipioId=${values.municipioId}`);
                    if (response) {
                        items = response || [];
                        items.unshift({ value: 0, label: 'TODAS LAS SUCURSALES' });
                        setListSucursales(items);
                    }
                    break;
                default:
                    break;
            }
        }

    }



    const GetQuejas = async () => {
        if (accesos.find(item => Number(item.menuId) === menuId && item.accesoId === 3)) {
            if (Number(tipoBusqueda) === 0) {
                let response = await callApi(`quejaadmin/list?tipoBusqueda=0&pagina=${numPaginaActual}`, {
                    method: 'POST',
                    body: JSON.stringify(values)
                });
                if (response) {
                    let { count, rows } = response;
                    setNumPagMax(count / 10);
                    let items = listQuejas || [];
                    items.push(...rows);
                    setListQuejas(items);
                    setTotalItems(count);
                    setNumPaginaActual(numPaginaActual + 1);
                }
            } else if (Number(tipoBusqueda) === 1) {
                let response = await callApi(`quejaadmin/list?tipoBusqueda=0&pagina=${numPaginaActual}`, {
                    method: 'POST',
                    body: JSON.stringify(values)
                });
                if (response) {
                    let { count, rows = [] } = response;
                    setNumPagMax(count / 10);
                    let items = listQuejas || [];
                    items.push(...rows);
                    setListQuejas(items);
                    setTotalItems(count);
                    setNumPaginaActual(numPaginaActual + 1);
                }

            }
        }
    }
    const hanldeClickDepto = (id, descripcion) => {
        setFiltrosAvanzados(false);
        setListQuejas([]);
        setNumPaginaActual(0);
        setValues({ ...values, tipoBusqueda: 0, departamentoId: id });
        setOrigenQuejas(descripcion);
        let actual = btnClickXDepto;
        let nuevo = actual + 1;
        setBtnClickXDepto(nuevo);
    }

    useEffect(() => {
        GetQuejasPorDepto();
        GetQuejas();
    }, [accesos, btnClickXDepto])


    const GetInfoQueja = async (id) => {
        setLoadingInfo(true);
        let response = await callApi(`quejaadmin/info/${id}`)
        if (response) {
            if (response?.Media) {
                let itemsImages = response.Media.map(item => {
                    let bufferBase64 = new Buffer(item.blob.data, "binary").toString("base64");
                    return {
                        src: "data:image/jpeg;base64," + bufferBase64,
                        thumbnail: "data:image/jpeg;base64," + bufferBase64,
                        caption: `Adjunto ${item.mediaId} ${item.fecha_crea}`,
                        useForDemo: true
                    }
                });
                setAdjuntosQueja(itemsImages);
            }

            setValuesQueja({ ...resultQueja, quejaId: response.quejaId, solucion: response.solucion, observaciones: response.observaciones, estado_quejaId: response.estado_quejaId, Usuario: response.Usuario });
        }
        setLoadingInfo(false);
    }
    const handleItemInfo = (item) => {
        GetInfoQueja(item.quejaId);
        setInfoItem(item);
        setstate({ isOpen: true });
        console.log(accesos);
    }

    const [state, setstate] = useState({
        gridSize: 'large-view',
        isOpen: false
    });

    const deskClass = ['btn-page', 'help-desk', state.gridSize];
    const gridDefault = 'btn waves-effect waves-light btn-primary';
    const gridActiveClass = 'btn waves-effect waves-light btn-primary active';

    const queView = 'q-view';
    const queViewActive = 'q-view active';

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetCatalogo('misregiones');
    }, [accesos]);

    useEffect(() => {
        if (accesos.find(i => Number(i.menuId) === Number(menuId) && Number(i.accesoId) === 2)) {
            setEditQueja(true);
        } else {
            setEditQueja(false);
        }
    }, [accesos]);



    useEffect(() => {
        GetCatalogo('misdeptos', values.regionId);
    }, [values.regionId]);

    useEffect(() => {
        GetCatalogo('municipios', values.departamentoId);
    }, [values.departamentoId]);

    useEffect(() => {
        GetCatalogo('comers', values.departamentoId);
    }, [values.departamentoId]);

    useEffect(() => {
        GetCatalogo('comers', values.departamentoId);
    }, [values.municipioId]);

    useEffect(() => {
        GetCatalogo('sucurs', values.municipioId);
    }, [values.municipioId]);


    useEffect(() => {
        GetCatalogo('sucurs', values.comercioId);
    }, [values.comercioId]);

    useEffect(() => {
        GetQuejas();
    }, [accesos]);

    useEffect(() => {
        if (filtrosAvanzados === true) {
            setValues({ ...values, departamentoId: 0, tipoBusqueda: 1 });
        } else {
            setValues({ ...values, tipoBusqueda: 0 });
        }
    }, [filtrosAvanzados])

    const handleRegionId = ({ value }) => {
        setValues({ ...values, regionId: value });
    }

    const handleDepartamentoId = ({ value }) => {
        setValues({ ...values, departamentoId: value });
    }

    const handleMunicipioId = ({ value }) => {
        setValues({ ...values, municipioId: value });
    }

    const handleComercioId = ({ value }) => {
        setValues({ ...values, comercioId: value });
    }

    const handleSucursalId = ({ value }) => {
        setValues({ ...values, sucursalId: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setListQuejas([]);
        setNumPaginaActual(0);
        setOrigenQuejas("FILTRO AVANZADO");
        let actual = btnClickAvanzado;
        let nuevo = actual + 1;
        setBtnClickAvanzado(nuevo)
    }

    useEffect(() => {
        GetQuejas();
    }, [btnClickAvanzado])

    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };

    useEffect(() => {
        if (listQuejasDepto.length > 0) {
            let todos = listQuejasDepto.reduce((prev, cur) => Number(prev) + (Number(cur.total)), 0);
            setTotalItemsTodos(todos);
        }
    }, [listQuejasDepto])

    const UpdateQueja = async () => {
        if (String(resultQueja.solucion).trim().length > 10) {
            setLoadingInfo(true);
            let response = await callApi(`quejaadmin`, {
                method: 'PUT',
                body: JSON.stringify(resultQueja)
            });
            if (response) {
                alert_exitoso("Se actualizó la queja exitosamente");
                setstate({ isOpen: false });
            }
            setLoadingInfo(false);
        } else {
            alert_warning("Se debe de agregar una descripción de la solución");
        }
    }

    return (
        <Aux>
            {
                accesos.find(item => Number(item.menuId) === menuId && item.accesoId === 3) ?
                    <>
                        <Row className={deskClass.join(' ')}>
                            <Col xl={2} lg={12}>
                                <div className="right-side">
                                    <Card>
                                        <Card.Header className="pt-4 pb-4">
                                            <h5>Quejas por departamento</h5>
                                        </Card.Header>
                                        <Card.Body className="p-3">
                                            <div className="cat-list">
                                                <div className="border-bottom pb-3 " key={`depto_id${0}`} onClick={() => { hanldeClickDepto(0, "Todos los departamento") }}>
                                                    <div className="d-inline-block">
                                                        <a href={DEMO.BLANK_LINK}><i className="feather icon-edit" />TODOS</a>
                                                    </div>
                                                    <div className="float-right span-content">
                                                        <a href={DEMO.BLANK_LINK} className="btn waves-effect waves-light btn-default badge-info rounded-circle mr-1" data-toggle="tooltip" data-placement="top" title="Mostrar listado de quejas" data-original-title="tooltip on top">{totalItemsTodos}</a>
                                                    </div>
                                                </div>

                                                {
                                                    listQuejasDepto.map(({ departamentoId, departamento, total }, index) => {
                                                        return (
                                                            <div className="border-bottom pb-3 " key={`depto_id${departamentoId}`} onClick={() => { hanldeClickDepto(departamentoId, departamento) }}>
                                                                <div className="d-inline-block">
                                                                    <a href={DEMO.BLANK_LINK}><i className="feather icon-edit" /> {departamento}</a>
                                                                </div>
                                                                <div className="float-right span-content">
                                                                    <a href={DEMO.BLANK_LINK} className="btn waves-effect waves-light btn-default badge-info rounded-circle mr-1" data-toggle="tooltip" data-placement="top" title="Mostrar listado de quejas de este departamento" data-original-title="tooltip on top">{total}</a>
                                                                </div>
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col xl={10} lg={12}>
                                <Card>
                                    <Card.Body>

                                        <nav className="navbar justify-content-between p-0 align-items-center">
                                            <h5>Listado de Quejas registradas en el sistema</h5>
                                            <div className="btn-group btn-group-toggle">
                                                <label onClick={() => setstate({ gridSize: 'sm-view' })} className={state.gridSize === 'sm-view' ? gridActiveClass : gridDefault}>
                                                    <input type="radio" name="options" id="option1" defaultChecked={true} /> <i className="feather icon-align-justify m-0" />
                                                </label>
                                                <label onClick={() => setstate({ gridSize: 'md-view' })} className={state.gridSize === 'md-view' ? gridActiveClass : gridDefault}>
                                                    <input type="radio" name="options" id="option1" defaultChecked={true} /> <i className="feather icon-menu m-0" />
                                                </label>
                                                <label onClick={() => setstate({ gridSize: 'large-view' })} className={state.gridSize === 'large-view' ? gridActiveClass : gridDefault}>
                                                    <input type="radio" name="options" id="option1" defaultChecked={true} /> <i className="feather icon-grid m-0" />
                                                </label>
                                            </div>
                                        </nav>
                                        <hr />
                                        <div className="text-center">
                                            <span className="b-b-primary text-primary" style={{ cursor: 'pointer' }} onClick={() => { setFiltrosAvanzados(!filtrosAvanzados) }}>Filtros avanzados</span>
                                        </div>
                                        {filtrosAvanzados === true &&
                                            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                                <Form.Row>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label htmlFor="regionId">Region</Form.Label>
                                                        <Select
                                                            id="regionId"
                                                            name="regionId"
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            defaultValue={listRegiones.find(i => i.value === values.regionId)}
                                                            required
                                                            placeholder="Region"
                                                            onChange={handleRegionId}
                                                            options={listRegiones}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label htmlFor="departamentoId">Departamento</Form.Label>
                                                        <Select
                                                            id="departamentoId"
                                                            name="departamentoId"
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            defaultValue={listDepartamentos.find(i => i.value === values.departamentoId)}
                                                            required
                                                            placeholder="Departamento"
                                                            onChange={handleDepartamentoId}
                                                            options={listDepartamentos}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4">
                                                        <Form.Label htmlFor="municipioId">Municipio</Form.Label>
                                                        <Select
                                                            id="municipioId"
                                                            name="municipioId"
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            defaultValue={listMunicipios.find(i => i.value === values.municipioId)}
                                                            required
                                                            placeholder="Departamento"
                                                            onChange={handleMunicipioId}
                                                            options={listMunicipios}
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label htmlFor="comercioId">Comercio</Form.Label>
                                                        <Select
                                                            id="comercioId"
                                                            name="comercioId"
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            defaultValue={listComercios.find(i => i.value === values.comercioId)}
                                                            required
                                                            placeholder="Comercio"
                                                            onChange={handleComercioId}
                                                            options={listComercios}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6">
                                                        <Form.Label htmlFor="sucursalId">Sucursal</Form.Label>
                                                        <Select
                                                            id="sucursalId"
                                                            name="sucursalId"
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            defaultValue={listSucursales.find(i => i.value === values.sucursalId)}
                                                            required
                                                            placeholder="Sucursal"
                                                            onChange={handleSucursalId}
                                                            options={listSucursales}
                                                        />
                                                    </Form.Group>
                                                </Form.Row>
                                                <div className="row">
                                                    <Form.Group as={Col} md="3">
                                                        <Form.Label htmlFor="estado_quejaId">Estado de Queja</Form.Label>
                                                        <SelectGroup
                                                            name="estado_quejaId"
                                                            id="estado_quejaId"
                                                            required
                                                            onChange={handleOnChange}
                                                            value={values.estado_quejaId}
                                                        >
                                                            <option value="0">TODOS LOS ESTADOS</option>
                                                            <option value="1">ENVIADA</option>
                                                            <option value="5">FINALIZADA</option>
                                                        </SelectGroup>
                                                    </Form.Group>

                                                    <div className="col-md-3">
                                                        <div className="form-group col">
                                                            <label className="form-label">Fecha Inicial</label>
                                                            <input
                                                                type="date"
                                                                id="fechaInicial"
                                                                name="fechaInicial"
                                                                value={values.fechaInicial}
                                                                onChange={handleOnChange}
                                                                className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group col">
                                                            <label className="form-label">Fecha Final</label>
                                                            <input
                                                                type="date"
                                                                id="fechaFinal"
                                                                name="fechaFinal"
                                                                value={values.fechaFinal}
                                                                onChange={handleOnChange}
                                                                className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group col">
                                                            <label className="form-label">&nbsp;&nbsp;</label>
                                                            <div className="mb-3 input-group">
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-primary" type="submit">Filtrar<i className="feather icon-search" /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </ValidationForm>
                                        }
                                    </Card.Body>
                                </Card>
                                {
                                    listQuejas.length > 0 ?
                                        <>
                                            <h4>{origenQuejas} ({totalItems})</h4>
                                            <hr />
                                        </>
                                        : <>
                                            <h4>{origenQuejas} (0)</h4>
                                            <hr />
                                        </>
                                }
                                <InfiniteScroll
                                    dataLength={listQuejas.length}
                                    next={GetQuejas}
                                    hasMore={true}
                                    loader={numPaginaActual <= numPagMax && <Loading />}
                                >
                                    {

                                        listQuejas.map((item, index) => {
                                            let clase = "open-tic";
                                            if (item.estado_quejaId === 5) {
                                                clase = "close-tic";
                                            }
                                            return (
                                                <div className={`ticket-block ${clase}`} key={`itemqueja__${index}`}>
                                                    <Row className="row">
                                                        <div className="col">
                                                            <div className="card hd-body" onClick={() => handleItemInfo(item)}>
                                                                <div className="row align-items-center">
                                                                    <div className="col border-right pr-0">
                                                                        <div className="card-body inner-center">
                                                                            <div className="ticket-customer font-weight-bold">[{item.quejaId}] - Anónimo {
                                                                                item.estado_quejaId === 5 && <strong> - (PROCESO FINALIZADO)</strong>
                                                                            }</div>
                                                                            <ul className="list-inline mt-2 mb-0">
                                                                                <li>Departamento {item.departamento} - Municipio {item.municipio}</li>
                                                                                <li className="list-inline-item"><i className="feather icon-home mr-1 f-14" />{item.razon_social} ({item.sucursal})</li>
                                                                                <li className="list-inline-item"><i className="feather icon-calendar mr-1 f-14" />Ingreso: {item.fecha_crea}</li>
                                                                            </ul>
                                                                            <div className="excerpt mt-4">
                                                                                <h6>Queja</h6>
                                                                                <p>{item.descripcion}</p>
                                                                            </div>
                                                                            <div className="mt-2">
                                                                                <div className="mr-3 text-muted" style={{ cursor: 'pointer' }}><i className="feather icon-eye mr-1" />Ver Detalles</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-auto pl-0 right-icon">
                                                                        <div className="card-body">
                                                                            <ul className="list-unstyled mb-0">
                                                                                <li style={{ cursor: 'pointer' }}><div data-toggle="tooltip" data-placement="top" title="" data-original-title="tooltip on top"><i className="feather icon-circle text-muted" /></div></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            )
                                        })


                                    }
                                </InfiniteScroll>
                            </Col>
                        </Row>

                        <div className={state.isOpen ? queViewActive : queView}>
                            <div className="overlay" onClick={() => setstate({ isOpen: false })} />
                            <div className="content">
                                {
                                    loadingInfo === true ? <Loading />
                                        : <Col sm={12}>
                                            <Card className='border-0 shadow-none'>
                                                <Card.Body className='pr-0 pl-0 pt-0'>
                                                    <Row>
                                                        <Col>
                                                            <div className="tab-block border-bottom mb-4 pb-3">
                                                                <h5><i className="feather icon-corner-up-left mr-1" />Responder queja</h5>
                                                            </div>
                                                            <Col>
                                                                <h6 className="mb-0">[{infoItem.quejaId}] - Anónimo
                                                                    {
                                                                        resultQueja.estado_quejaId === 5 &&
                                                                        <strong> - (PROCESO FINALIZADO POR [{resultQueja?.Usuario?.user_name}])</strong>
                                                                    }
                                                                </h6>
                                                                <hr />
                                                                <h6 className="mb-1">Departamento: {infoItem.departamento} - {infoItem.razon_social}</h6>
                                                                <h6 className="mb-1">Municipio:{infoItem.municipio} - {infoItem.sucursal}</h6>
                                                                <label className="text-muted">Ingreso:{infoItem.fecha_crea}</label>
                                                            </Col>
                                                            <Col sm={12} className='mt-3'>
                                                                {
                                                                    adjuntosQueja.length > 0 ?
                                                                        <div className="comment-content">
                                                                            <h6 className="mb-1">Queja: {infoItem.descripcion}</h6>
                                                                            <hr />
                                                                            <h6 className="mb-5">Solicita: {infoItem.solicitud}</h6>
                                                                            <p><strong>Imagenes adjuntas</strong></p>
                                                                            <hr />
                                                                            <Gallery images={adjuntosQueja || []} backdropClosesModal />
                                                                        </div>
                                                                        : <div className="comment-content">
                                                                            <h6 className="mb-1">Queja: {infoItem.descripcion}</h6>
                                                                        </div>
                                                                }
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>

                                                <Row className="border-bottom border-top pb-3 pt-4 pl-3 pr-3">

                                                    <div className="form-group col-md-12">
                                                        <label className="form-label" htmlFor="solucion">Solucion a queja</label>
                                                        <textarea
                                                            className="form-control"
                                                            name="solucion"
                                                            id="solucion"
                                                            placeholder="Se debe de describir la solución a dicha queja"
                                                            autoComplete="off"
                                                            rows="6"
                                                            minLength="50"
                                                            value={resultQueja.solucion ?? ""}
                                                            onChange={handleChangeRespues}
                                                            readOnly={(resultQueja.estado_quejaId === 5 || !editQueja) && true}
                                                        >
                                                        </textarea>
                                                    </div>

                                                    <div className="form-group col-md-12">
                                                        <label className="form-label" htmlFor="observaciones">Observaciones</label>
                                                        <textarea
                                                            className="form-control"
                                                            name="observaciones"
                                                            id="observaciones"
                                                            placeholder="Observaciones"
                                                            autoComplete="off"
                                                            rows="3"
                                                            value={resultQueja.observaciones ?? ""}
                                                            onChange={handleChangeRespues}
                                                            readOnly={(resultQueja.estado_quejaId === 5 || !editQueja) && true}
                                                        >
                                                        </textarea>
                                                    </div>

                                                    <button type="button" className="btn btn-warning mr-1" onClick={() => setstate({ isOpen: false })} > Cancelar</button>
                                                    {
                                                        resultQueja.estado_quejaId !== 5 && editQueja === true &&
                                                        <button type="button" className="btn btn-success" onClick={() => { UpdateQueja(); }}>Responder</button>
                                                    }
                                                </Row>
                                            </Card>
                                        </Col>
                                }
                            </div>
                        </div>
                    </>
                    : <NoAutorizado />
            }
        </Aux>

    )
}

