// 정규식 이메일체크, 아이디 체크, 핸드폰번호 체크

export const emailCheck = (email: string): boolean => {
    const _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;

    return _reg.test(email);
};
export const idCheck = (id: string): boolean => {
    const _reg = /^[0-9a-zA-Z]+$/;
    return _reg.test(id);
};

export const phoneNumCheck = (phoneNum: string): boolean => {
    const _reg = /^\d{3}-\d{4}-\d{4}$/;

    return _reg.test(phoneNum);
};
