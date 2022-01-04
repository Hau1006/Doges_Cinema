import callApi from "../../../../apis/callApi";

export const getMovieList = async (page = 1, limit = 16) => {
  const res = await callApi(`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP02&soTrang=${page}&soPhanTuTrenTrang=${limit}`, '', '');
  return new Promise((resolve, reject) => {
    if (res?.status === 200) {
      resolve({ data: res.data });
    }
  })
}