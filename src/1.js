function calTime(start, end) {
    var lis = document.querySelectorAll(
        "#mirror-vdcon > div.right-container > div > div.rcmd-tab > div.video-pod.video-pod > div.video-pod__body > div > div > div.stats > div"
    );


    var time_h = 0; // 小时
    var time_m = 0; // 分
    var time_s = 0; // 秒

    lis.forEach((currentValue, index) => {
        if (index >= start - 1 && index <= end - 1) {
            let time = currentValue.innerText;
            // 操作string类型的时长信息
            let timeArr = time.split(":");
            if (timeArr.length == 3) {
                //分集时长显示包含小时的情况
                time_h += Number(timeArr[0]);
                time_m += Number(timeArr[1]);
                time_s += Number(timeArr[2]);
            } else {
                time_m += Number(timeArr[0]);
                time_s += Number(timeArr[1]);
            }
        }
    });
    // 得到总时长mm:ss格式
    time_m = time_m + parseInt(time_s / 60);
    time_s = time_s % 60;
    // 计算小时
    time_h += parseInt(time_m / 60);
    time_m = time_m % 60;
    console.log(
        `从p${start}到p${end} 总时长为${time_h}h ${time_m}min ${time_s}s`
    );
}

calTime(start, end);
