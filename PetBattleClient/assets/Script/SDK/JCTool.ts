export default class JCTool {

    public static shuffleSort(arr) {
        var n = arr.length;
        while(n--) {
            var index = Math.floor(Math.random() * n);
            [arr[index], arr[n]] = [arr[n], arr[index]];
        }
    }

    public static updateObject(oldObject: any, newObject: any) {
        for (let p in oldObject) {
            delete oldObject[p];
        }
        for (let p in newObject) {
            oldObject[p] = newObject[p];
        }
    }

    public static uuid(): string {
        let arr = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            arr[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        arr[14] = "4";
        arr[19] = hexDigits.substr((arr[19] & 0x3) | 0x8, 1);
        arr[8] = arr[13] = arr[18] = arr[23] = "";
        return arr.join("");
    }

    public static hasChinese(str: string): boolean {
		for (let i = 0; i < str.length; i++) {
			var patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
			if (patrn.exec(str[i])){
				return true;
			}
		}	
		return false;
    }
    
    public static isFullChinese(str: string): boolean {
		for (let i = 0; i < str.length; i++) {
			var patrn= /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
			if (!patrn.exec(str[i])){
				return false;
			}
		}	
		return true;
    }
    
    public static isLetterOrNum(str: string) {
        return /^[\d\w]+$/.test(str);
    }

    public static checkDate(dateStr: string, separator: string): boolean {
        let dateArray = dateStr.split(separator);
        if (dateArray.length < 3) {
            return false;
        }
        for (let elem of dateArray) {
            if (isNaN((elem as any))) {
                return false;
            }
        }
        let year = Number(dateArray[0]);
        let month = Number(dateArray[1]);
        let day = Number(dateArray[2]);
        var dateObj = new Date(year, month-1, day),
            nYear = dateObj.getFullYear(),
            nMonth = dateObj.getMonth() + 1,
            nDay = dateObj.getDate();
        if (year == nYear && month == nMonth && day == nDay) {
            return true;
        } else {
            return false;
        }
    }

    public static checkEmail(email: string): boolean {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (reg.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    public static checkPhone(phone: string): boolean {
        const reg=/^[1][3,4,5,7,8][0-9]{9}$/;
		if (!reg.test(phone)) {
		    return false;
		} else {
		    return true;
		}
    }
    
    public static checkIdCard(idCard: string): boolean {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(idCard)) {
            return true;
        } else {
            return false;
        }
    }

    public static autoHttps(): string {
        if (window.location.href.startsWith("https")) {
            return "https://";
        } else {
            return "http://";
        }
    }

    public static getQueryVariable(variable: string): string | undefined {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split('=');
            if(pair[0] == variable){
                return pair[1];
            }
        }
        return undefined;
    }

    public static requestReadyStateExplains:any = {
        "0": "????????????????????????????????? open() ?????????",
        "1": "open() ????????????????????????",
        "2": "send() ???????????????????????????????????????????????????????????????",
        "3": "?????????, responseText ?????????????????????????????????",
        "4": "????????????????????????"
    }

    public static requestStatusExplains:any = {
        "0": "??????????????????????????????????????????????????????????????????",
        "100": "???????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "101": "?????????????????? ??????????????????????????????????????????????????????????????????????????????",
        "200": "???????????? ??????????????????????????????????????????????????????????????????????????????????????????",
        "201": "??????????????? ???????????????????????????????????????????????????",
        "202": "??????????????? ?????????????????????????????????????????????",
        "203": "????????????????????? ?????????????????????????????????????????????????????????????????????????????????",
        "204": "??????????????? ???????????????????????????????????????????????????????????????",
        "205": "?????????????????? ???????????????????????????????????????????????????????????????",
        "206": "?????????????????? ?????????????????????????????? GET ?????????",
        "300": "?????????????????? ??????????????????????????????????????????????????????????????????????????? (user agent) ???????????????????????????????????????????????????????????????",
        "301": "?????????????????? ??????????????????????????????????????????????????????????????????????????? GET ??? HEAD ???????????????????????????????????????????????????????????????",
        "302": "?????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "303": "???????????????????????? ???????????????????????????????????????????????? GET ??????????????????????????????????????????????????????",
        "304": "??????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "305": "?????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "307": "????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "400": "?????????????????? ????????????????????????????????????",
        "401": "??????????????? ??????????????????????????? ???????????????????????????????????????????????????????????????", 
        "403": "???????????? ????????????????????????", 
        "404": "??????????????? ????????????????????????????????????",
        "405": "?????????????????? ?????????????????????????????????",
        "406": "??????????????? ?????????????????????????????????????????????????????????",
        "407": "???????????????????????? ?????????????????? 401?????????????????????????????????????????????????????????????????????",
        "408": "?????????????????? ???????????????????????????????????????", 
        "409": "???????????? ???????????????????????????????????????????????????????????????????????????????????????????????????",
        "410": "??????????????? ????????????????????????????????????????????????????????????????????????", 
        "411": "???????????????????????? ??????????????????????????????????????????????????????????????????", 
        "412": "??????????????????????????? ???????????????????????????????????????????????????????????????????????????", 
        "413": "???????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????", 
        "414": "???????????? URI ????????? ????????? URI??????????????????????????????????????????????????????", 
        "415": "?????????????????????????????? ?????????????????????????????????????????????", 
        "416": "????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????", 
        "417": "???????????????????????? ????????????????????????????????????????????????????????????",
        "500": "??????????????????????????? ?????????????????????????????????????????????",
        "501": "?????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "502": "?????????????????? ????????????????????????????????????????????????????????????????????????",
        "503": "????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????", 
        "504": "?????????????????? ????????????????????????????????????????????????????????????????????????????????????",
        "505": "???HTTP ????????????????????? ???????????????????????????????????? HTTP ??????????????? "
    } 
    
    public static request(requestObject: RequestObject) {
        requestObject.async = (requestObject.async == undefined ? true : requestObject.async);
        requestObject.method = (requestObject.method == undefined ? RequestMethod.GET : requestObject.method);
        requestObject.data = (requestObject.data == undefined ? {} : requestObject.data);
        requestObject.dataType = (requestObject.dataType == undefined ? DataType.FORM : requestObject.dataType);
        requestObject.responeType = (requestObject.responeType == undefined ? ResponeType.Object : requestObject.responeType);
        requestObject.debug = (requestObject.debug == undefined ? false : requestObject.debug);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (requestObject.debug) {
                console.warn(
                    "???????????????", requestObject.url, 
                    "???????????????", xhr.readyState, JCTool.requestReadyStateExplains[xhr.readyState],
                    "???????????????", xhr.status, JCTool.requestStatusExplains[xhr.status],
                );
            }
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status < 400) {
                if (requestObject.success instanceof Function) {
                    if (requestObject.responeType == ResponeType.Object) {
                        if (requestObject.debug) {
                            console.warn("???????????????", requestObject.url, "???????????????????????????JSON");
                        }
                        let result = undefined;
                        try {
                            result = JSON.parse(xhr.responseText);
                            if (requestObject.debug) {
                                console.warn("???????????????", requestObject.url, "???????????????????????????JSON", result);
                            }
                        } catch {
                            result = xhr.responseText;
                            if (requestObject.debug) {
                                console.error("???????????????", requestObject.url, "???????????????????????????JSON", result);
                            }
                        }
                        requestObject.success(result);
                    } else if (requestObject.responeType == ResponeType.String) {
                        let result = xhr.responseText;
                        if (requestObject.debug) {
                            console.warn("???????????????", requestObject.url, "???????????????????????????Text");
                            console.warn("???????????????", requestObject.url, "???????????????????????????Text", result);
                        }
                        requestObject.success(result);
                    }
                }
            } else {
                if (requestObject.fail instanceof Function) {
                    requestObject.fail();
                }
            }
        };

        var getUrlForm = function(dataObject:any, startChar:string, centerChar:string): string {
            let str = ""; 
            if (dataObject) {
                let paramIndex = -1;
                for (let key in dataObject) {
                    paramIndex++;
                    str += (paramIndex == 0 ? startChar : centerChar);
                    str += key + '=' + encodeURIComponent(dataObject[key]);
                }
            }
            return str;
        }

        if (requestObject.method == RequestMethod.GET) {
            xhr.open("GET", requestObject.url += getUrlForm(requestObject.data, '?', '&'), requestObject.async);
            xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
            xhr.send();
        } else if (requestObject.method == RequestMethod.POST) {
            xhr.open("POST", requestObject.url, requestObject.async);
            if (requestObject.dataType == DataType.FORM) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(getUrlForm(requestObject.data, '', '&'));
            } else if (requestObject.dataType == DataType.JSON) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(requestObject.data));
            }
        }
    }

    public static md5(string: string): string {
        function md5_RotateLeft(lValue, iShiftBits) {
                return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }
        function md5_AddUnsigned(lX,lY){
                var lX4,lY4,lX8,lY8,lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                } else {
                        return (lResult ^ lX8 ^ lY8);
                }
        }         
        function md5_F(x,y,z){
                return (x & y) | ((~x) & z);
        }
        function md5_G(x,y,z){
                return (x & z) | (y & (~z));
        }
        function md5_H(x,y,z){
                return (x ^ y ^ z);
        }
        function md5_I(x,y,z){
                return (y ^ (x | (~z)));
        }
        function md5_FF(a,b,c,d,x,s,ac){
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_GG(a,b,c,d,x,s,ac){
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_HH(a,b,c,d,x,s,ac){
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_II(a,b,c,d,x,s,ac){
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1=lMessageLength + 8;
                var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                var lWordArray=Array(lNumberOfWords-1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while ( lByteCount < lMessageLength ) {
                        lWordCount = (lByteCount-(lByteCount % 4))/4;
                        lBytePosition = (lByteCount % 4)*8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                        lByteCount++;
                }
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                return lWordArray;
        };
        function md5_WordToHex(lValue){
                var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                for(lCount = 0;lCount<=3;lCount++){
                        lByte = (lValue>>>(lCount*8)) & 255;
                        WordToHexValue_temp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                }
                return WordToHexValue;
        };
        function md5_Utf8Encode(string){
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        }else if((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        } else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                }
                return utftext;
        };
        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;
        string = md5_Utf8Encode(string);
        x = md5_ConvertToWordArray(string);
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        for (k=0;k<x.length;k+=16) {
                AA=a; BB=b; CC=c; DD=d;
                a=md5_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                d=md5_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                c=md5_FF(c,d,a,b,x[k+2], S13,0x242070DB);
                b=md5_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                a=md5_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                d=md5_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                c=md5_FF(c,d,a,b,x[k+6], S13,0xA8304613);
                b=md5_FF(b,c,d,a,x[k+7], S14,0xFD469501);
                a=md5_FF(a,b,c,d,x[k+8], S11,0x698098D8);
                d=md5_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
                d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
                c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
                b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
                a=md5_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                d=md5_GG(d,a,b,c,x[k+6], S22,0xC040B340);
                c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                b=md5_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                a=md5_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
                c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                b=md5_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                a=md5_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                c=md5_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                b=md5_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                d=md5_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                c=md5_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                a=md5_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                d=md5_HH(d,a,b,c,x[k+8], S32,0x8771F681);
                c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                a=md5_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                d=md5_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                c=md5_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                d=md5_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                c=md5_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                b=md5_HH(b,c,d,a,x[k+6], S34,0x4881D05);
                a=md5_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                b=md5_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                a=md5_II(a,b,c,d,x[k+0], S41,0xF4292244);
                d=md5_II(d,a,b,c,x[k+7], S42,0x432AFF97);
                c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                b=md5_II(b,c,d,a,x[k+5], S44,0xFC93A039);
                a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
                d=md5_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                b=md5_II(b,c,d,a,x[k+1], S44,0x85845DD1);
                a=md5_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                c=md5_II(c,d,a,b,x[k+6], S43,0xA3014314);
                b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                a=md5_II(a,b,c,d,x[k+4], S41,0xF7537E82);
                d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                c=md5_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                b=md5_II(b,c,d,a,x[k+9], S44,0xEB86D391);
                a=md5_AddUnsigned(a,AA);
                b=md5_AddUnsigned(b,BB);
                c=md5_AddUnsigned(c,CC);
                d=md5_AddUnsigned(d,DD);
        }
        return (md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
    }
}
export interface RequestObject {
    url: string;
    debug?: boolean;
    async?: boolean;
    method?: RequestMethod;
    data?: any;
    dataType?: DataType;
    responeType?: ResponeType;
    success?: Function;
    fail?: Function;
}
export enum DataType {FORM, JSON}
export enum RequestMethod {GET, POST}
export enum ResponeType {Object, String}