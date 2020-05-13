const baseURL = "https://api.imjad.cn/qqfm/v1/";
export default {
  getAllAlbum(aid: any) {
    return baseURL + "?type=album&id=" + aid;
  },
  getAllShow(id: any) {
    return baseURL + "?type=show&id=" + id;
  },
  getShow(id: any) {
    return baseURL + "?type=skip_show&id=" + id;
  }
}