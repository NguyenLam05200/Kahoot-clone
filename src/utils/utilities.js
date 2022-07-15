
import QuizIcon from '@mui/icons-material/Quiz';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const requestFullScreen = () => {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}


const schemaQuiz = {
    type: 0, //0: Quiz, 1: True or False, 2: Multi selections
    img: null,
    time: 20,
    text: '',
    ans: [
        { text: '', isRight: false },
        { text: '', isRight: false },
        { text: '', isRight: false },
        { text: '', isRight: false },
    ],
    points: 1 //0: no points, 1: standard, 2: double
}

const schemaTrueOrFalse = {
    type: 1, //0: Quiz, 1: True or False, 2: Multi selections
    img: '',
    time: 20,
    text: '',
    ans: [
        { text: 'True', isRight: true },
        { text: 'False', isRight: false },
    ],
    points: 1 //0: no points, 1: standard, 2: double
}
const cssIcon = {
    color: '#18bd80',
    fontSize: 25,
    fontWeight: 'bold'
}

const optionsQuestionType = [
    { text: 'Quiz', icon: <QuizIcon sx={cssIcon} /> },
    {
        text: 'True or False', icon: <PhonelinkEraseIcon sx={cssIcon} />
    },
    { text: 'Multi selections', icon: <DynamicFeedIcon sx={cssIcon} /> },
];

// const optionsPoints = [
//     'No points',
//     'Standard points',
//     'Double points'
// ]


const optionsPoints = [
    { text: 'No points', icon: <LocationDisabledIcon sx={cssIcon} /> },
    {
        text: 'Standard', icon: <GpsFixedIcon sx={cssIcon} />
    },
    { text: 'Double points', icon: <AutoAwesomeIcon sx={cssIcon} /> },
];

const optionsTimeLimit = [5, 10, 15, 20, 30, 60, 90, 120, 240];


export {
    schemaQuiz,
    schemaTrueOrFalse,
    optionsPoints,
    optionsQuestionType,
    optionsTimeLimit
}