import request from "@/utils/request";
export function getTest(chara,money,datas) {
    const data = {
        chara: chara,
        money: money,
        data:datas
    };
    return request({
        url: "/test/GFDXtest",
        method: "post",
        data: data,
    });
}

export function getForeTest(chara,result,forecast) {
    const data = {
        chara: chara,
        result: result,
        forecast:forecast
    };
    return request({
        url: "/test/Wuzitest",
        method: "post",
        data: data,
    });
}

export function getForecastTest(size,target,datas){
    const data = {chara: size, result: target, forecast: datas};
    return request({
        url: "/test/Foretest",
        method: "post",
        data: data,
    })
}
