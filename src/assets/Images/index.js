const images = {
    logo: require('~/assets/Images/logo.jpg'),
    imagePlaceholder: require('~/assets/Images/no-image.png'),
    imageScreen: require('~/assets/Images/ic-screen.png'),
    sickers: {
        P: require('~/assets/Images/stickers/P.png'),
        T13: require('~/assets/Images/stickers/T13.png'),
        T16: require('~/assets/Images/stickers/T16.png'),
        T18: require('~/assets/Images/stickers/T18.png'),
    },
    seats: {
        NORMAL: {
            SELECTED: require('~/assets/Images/seats/seat-select-normal.png'),
            EMPTY: require('~/assets/Images/seats/seat-unselect-normal.png'),
            RESERVED: require('~/assets/Images/seats/seat-buy-normal.png'),
        },

        VIP: {
            SELECTED: require('~/assets/Images/seats/seat-select-vip.png'),
            EMPTY: require('~/assets/Images/seats/seat-unselect-vip.png'),
            RESERVED: require('~/assets/Images/seats/seat-buy-vip.png'),
        },

        DOUBLE: {
            SELECTED: require('~/assets/Images/seats/seat-select-double.png'),
            EMPTY: require('~/assets/Images/seats/seat-unselect-double.png'),
            RESERVED: require('~/assets/Images/seats/seat-buy-double.png'),
        },
    },
};

export default images;
