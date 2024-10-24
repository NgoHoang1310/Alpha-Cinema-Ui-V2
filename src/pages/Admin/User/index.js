import classNames from 'classnames/bind';
import * as React from 'react';
import styles from './User.module.scss';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { openModal } from '~/store/reducers/modalReducer';
import { ModifyUser } from '~/components/Modal/Admin';

import * as apiServices from '~/services';

const cx = classNames.bind(styles);

const ROLESNAME = {
    ADMIN: 'Quản trị viên',
    USER: 'Khách hàng',
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tên người dùng',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'phone',
        numeric: true,
        disablePadding: false,
        label: 'Số điện thoại',
    },
    {
        id: 'role',
        numeric: true,
        disablePadding: false,
        label: 'Vai trò',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Hành động',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ backgroundColor: '#f4f6f8' }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        style={{ fontSize: '1.4rem', fontWeight: 700, color: '#637381' }}
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%', fontSize: '1.6rem', fontWeight: 700 }}
                    color="var(--primary-color)"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} đang chọn
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%', fontSize: '1.6rem', fontWeight: 700 }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Tìm kiếm
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>{/* <DeleteIcon /> */}</IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>{/* <FilterListIcon /> */}</IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

function User() {
    const { modifyUser } = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [users, setUsers] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleAction = (type) => {
        switch (type) {
            case 'new': {
                dispatch(openModal({ type: 'modifyUser', data: { isOpen: true } }));
                break;
            }

            case 'update': {
                console.log('update');
                break;
            }

            case 'delete': {
                console.log('delete');
                break;
            }

            default:
                return;
        }
    };

    React.useEffect(() => {
        const fetchApi = async () => {
            const res = await apiServices.getUsers();
            setUsers(res);
        };
        fetchApi();
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...users].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );
    return (
        <div className={cx('wrapper')}>
            <div className="d-flex pt-3 pb-3 mb-5">
                <h1 className="flex-fill fw-bolder">Người dùng</h1>
                <div>
                    <Button
                        onClick={() => handleAction('new')}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        className={cx('success')}
                    >
                        Thêm mới
                    </Button>
                </div>
            </div>
            <div className={cx('table-user')}>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2, borderRadius: 4, overflow: 'hidden' }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={users.length}
                                />
                                {/* test */}
                                <TableBody>
                                    {users.map((user, index) => {
                                        const isItemSelected = selected.includes(user.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, user.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={user.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    style={{ fontSize: '1.4rem' }}
                                                    component="th"
                                                    id={labelId}
                                                    scope="user"
                                                    padding="auto"
                                                    className="d-flex align-items-center"
                                                >
                                                    <Avatar
                                                        src="https://free.minimals.cc/assets/images/avatar/avatar-22.webp"
                                                        className="me-3"
                                                    />
                                                    {user.userName}
                                                </TableCell>
                                                <TableCell style={{ fontSize: '1.4rem' }} align="left">
                                                    {user.email}
                                                </TableCell>
                                                <TableCell style={{ fontSize: '1.4rem' }} align="left">
                                                    {user.phone || '-'}
                                                </TableCell>
                                                <TableCell style={{ fontSize: '1.4rem' }} align="left">
                                                    {user.roles.map((role) => {
                                                        return ROLESNAME[role];
                                                    })}
                                                </TableCell>
                                                <TableCell style={{ fontSize: '1.4rem' }} align="left">
                                                    {!user.destroyed ? (
                                                        <span className="badge badge--success">Đang hoạt động</span>
                                                    ) : (
                                                        <span className="badge badge--danger">Bị khóa</span>
                                                    )}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button
                                                        className="warn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button className="danger">
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            translate="yes"
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{ fontSize: '1.4rem' }}
                        />
                    </Paper>
                </Box>
            </div>
            <ModifyUser />
        </div>
    );
}

export default User;
