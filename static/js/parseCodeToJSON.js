export function parseCode(res) {
    let firstCode = res.charCodeAt(0);
    //小于32(空格符),大于127(del删除)的都是控制字符,不能显示
    //其它ASCII码都为可显示字符
    if (firstCode < 0x20 || firstCode > 0x7f) {
        return res.substring(1);
    }
}