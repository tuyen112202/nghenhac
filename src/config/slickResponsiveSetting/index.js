//banner
export var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1170,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,         
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
//slide playlist

export var settingsPlaylist = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                infinite: true,         
            },
        },
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,         
            },
        },
        {
            breakpoint: 1170,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
            },
        },
        {
            breakpoint: 920,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,         
            },
        },
        {
            breakpoint: 710,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,         
            },
        },
    ],
};