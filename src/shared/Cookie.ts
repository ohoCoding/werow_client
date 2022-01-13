// 쿠기에 값을 저장, 삭제, 조회

// 쿠키 저장
const setCookie = (name: string, value: string): void => {
    const date = new Date();
    // 만료 시간 5시간
    date.setTime(date.getTime() + 1 * 1000 * 60 * 60 * 5);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;`;
};

// 쿠키 조회
// eslint-disable-next-line consistent-return
const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const part: any = parts.pop();
        return part.split(';').shift();
    }
};

// 쿠키 삭제
const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;`;
};

export { setCookie, deleteCookie, getCookie };
