const App = require('express');
const app = App();

app.use(App.static("public"));
app.use(App.json())
Math.distance = function(x0, x1, y0, y1) {
    return Math.sqrt(Math.pow(x0-(x1+8), 2)+Math.pow(y0-(y1+8), 2));
};
Math.delta = function(v0, v1) {
    return v0 > v1 ? v0 - v1 : v1 - v0;
}

app.post("/movement", (req, res) => {
    const data = req.body;
    const distance = [];
    const delta = [];
    for(let i = 0; i < data.length; i++) {
        let xy1 = data[i-1];
        let xy2 = data[i];
        if(xy1 && xy2) {
            const dist = Math.distance(xy1.x, xy2.x, xy1.y, xy2.y)
            distance.push(dist)
        }   
    }
    for(let i = 0; i < distance.length; i++) {
        let d1 = distance[i-1];
        let d2 = distance[i];
        if(d1 && d2) {
            delta.push(Math.delta(d1, d2));
        }
    }
    if(distance.length < 20 || delta.some(v => v > 50)) {
        return res.send(`Bot movement detected`)
    } else {
        return res.send(`Human movement detected`)
    }
    res.sendStatus(200)
})

app.listen(80);