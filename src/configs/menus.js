import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
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

export default { MENU_ITEMS };
