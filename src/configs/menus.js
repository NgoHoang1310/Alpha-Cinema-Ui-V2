import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faUser, faVideo, faCog, faMoon, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faChevronRight} />,
        title: 'Hà Nội',
        children: {
            data: [
                {
                    code: 'en',
                    title: 'Beta Thanh Xuân',
                },
                {
                    code: 'vi',
                    title: 'Beta Giải Phóng',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faChevronRight} />,
        title: 'Thái Nguyên',
        children: {
            data: [
                {
                    code: 'en',
                    title: 'Beta Thái Nguyên',
                },
            ],
        },
    },
];

const MENU_USERS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ',
    },
    {
        icon: <FontAwesomeIcon icon={faCog} />,
        title: 'Cài đặt',
        to: '/setting',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Chế độ tối',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOutAlt} />,
        title: 'Đăng xuất',
        to: '/',
        separate: true,
        logOut: true,
    },
];

export default { MENU_ITEMS, MENU_USERS };
