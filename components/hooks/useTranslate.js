import { useLocale } from "../../contexts/LocaleContext";
// import { useContext } from "react";
// import { LocaleContext } from "../../contexts/LocaleContext";

const dict = {
  ko: {
    confirm: "확인",
    cancel: "취소",
    edit: "수정",
    delete: "삭제",
    newest: "최신순",
    best: "베스트순",
    "title placeholder": "제목을 입력해주세요.",
    "content placeholder": "제목을 입력해주세요.",
    "terms of service": "서비스 이용약관",
    "privacy policy": "개인정보 처리방침",
    "load more": "더 보기",
    "12월": "12.",
  },
  en: {
    confirm: "OK",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    newest: "Newest",
    best: "Best",
    "title placeholder": "Enter a title.",
    "content placeholder": "Enter the content.",
    "terms of service": "Terms of Service",
    "privacy policy": "Privacy Policy",
    "load more": "Load More",
    "12월": "December",
  },
};

function useTranslate() {
  const locale = useLocale();
  // const { locale } = useContext(LocaleContext);

  const translate = (key) => dict[locale][key] || "";
  return translate;
}

export default useTranslate;
