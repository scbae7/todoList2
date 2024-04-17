import RegEx from '../regEx.mjs';

const idValidator = new RegEx('idInput','^[a-zA-Z가-힣]{4,10}','아이디는 4~10자의 한글과 영어로만 입력해주세요.');
const pwValidator = new RegEx('pwInput','^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})','비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.');