export default function formateDate(d) {
    const date = new Date(d);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (yy < 10) yy = "0" + yy;

    return yy + "-" + mm + "-" + dd;
}
