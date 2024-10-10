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
        normal: {
            selected: require('~/assets/Images/seats/seat-select-normal.png'),
            unselected: require('~/assets/Images/seats/seat-unselect-normal.png'),
            reserved: require('~/assets/Images/seats/seat-buy-normal.png'),
        },

        vip: {
            selected: require('~/assets/Images/seats/seat-select-vip.png'),
            unselected: require('~/assets/Images/seats/seat-unselect-vip.png'),
            reserved: require('~/assets/Images/seats/seat-buy-vip.png'),
        },

        double: {
            selected: require('~/assets/Images/seats/seat-select-double.png'),
            unselected: require('~/assets/Images/seats/seat-unselect-double.png'),
            reserved: require('~/assets/Images/seats/seat-buy-double.png'),
        },
    },
};

export default images;
