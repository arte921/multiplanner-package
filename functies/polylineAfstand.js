const coordinaatAfstand = import("#f/coordinaatAfstand");

export default (polyline) => {
    let afstand = 0;
    for (let i = 1; i < polyline.length; i++) {
        afstand += coordinaatAfstand(polyline[i], polyline[i - 1]);
    }
    return afstand;
};