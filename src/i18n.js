import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          News: "NEWS",
          School: "SCHOOL",
          Work: "Work",
          Home: "Home",
          Play: "Play",
          "Sign up": "Sign up",
          Login: "Log in",
          Discover: "Discover",
          Library: "Library",
          Reports: "Reports",
          Create: "Create",
          Profile: "Profile",
          Settings: "Settings",
          Logout: "Logout",
          "Add name": "Add name",
          Assignments: "Assignments",
          "Self-paced kahoots are perfect for e-learning as remote workers play independently at a time that suits them.":
            "Self-paced kahoots are perfect for e-learning as remote workers play independently at a time that suits them.",
          "Learn more": "Learn more",
          "Add interests": "Add interests",
          "My interests:": "My interests:",
          Plan: "Plan",
          "See all": "See all",
          questions: "questions",
          " My kahuts": "Kahuts của tôi",
          "Play demo game": "Play demo game",
          "Create a Kahut": "Create a Kahut",
          "Host kahut": "Host kahut",
          Advertisement: "Advertisement",
        },
      },
      vn: {
        translations: {
          News: "Tin tức ",
          School: "Trường học",
          Work: "Công việc",
          Home: "Trang chủ",
          Play: "Chơi",
          "Sign up": "Đăng kí",
          Login: "Đăng nhập",
          Discover: "Khám phá",
          Library: "Thư viện",
          Reports: "Đánh giá",
          Create: "Tạo mới",
          Profile: "Thông tin",
          Settings: "Cài đặt",
          Logout: "Đăng xuất",
          "Add name": "Thêm mới",
          Assignments: "Bài tập",
          "Self-paced kahoots are perfect for e-learning as remote workers play independently at a time that suits them.":
            "Các kahoots tự nhịp độ là lựa chọn hoàn hảo cho việc học trực tuyến khi những người làm việc từ xa chơi độc lập vào một thời điểm phù hợp với họ.",
          "Learn more": "Thêm",
          "Add interests": "Thêm",
          "My interests:": "Sở thích:",
          Plan: "Kế hoạch",
          "See all": "Xem tất cả",
          questions: "câu hỏi",
          " My kahuts": "Kahuts của tôi",
          "Play demo game": "Chơi thử",
          "Create a Kahut": "Tạo kahut",
          "Host kahut": "Host kahut",
          Advertisement: "Quảng cáo",
        },
      },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
