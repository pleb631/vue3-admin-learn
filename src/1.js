function calTime(s, e) {
    let n = document.querySelector(".list-count"),
        p = n ? `div.action-list-content > div:nth-child(${n.innerText.split("/")[0]}) .duration` : ".list .duration",
        l = document.querySelectorAll(p),
        h = 0, m = 0, t = 0;

    l.forEach((v, i) => {
        if (i >= s - 1 && i <= e - 1) {
            let a = v.innerText.split(":").map(Number);
            [h1, m1, s1] = a.length === 3 ? a : [0, ...a];
            h += h1; m += m1; t += s1;
        }
    });

    m += Math.floor(t / 60);
    t %= 60;
    h += Math.floor(m / 60);
    m %= 60;

    console.log(`视频一共有${l.length}个`);
    console.log(`从p${s}到p${e} 总时长为${h}h ${m}min ${t}s`);
}
calTime(0, 2);
