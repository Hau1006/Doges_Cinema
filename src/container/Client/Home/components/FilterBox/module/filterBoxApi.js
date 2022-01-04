import callApi from "../../../../../../apis/callApi";

export const getMovieTicket = async (maPhim) => {
  const res = await callApi(`LayThongTinLichChieuPhim?MaPhim=${maPhim}`, '', '');
  return new Promise((resolve, reject) => {
    if (res?.status === 200) {
      resolve({ data: res.data });
    }
  })
}