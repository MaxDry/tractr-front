import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class VideoGameService {
  all(queries = {}) {
    return axios
      .get(`${getBaseUrl()}/video-games`, { params: queries })
      .then(({ data }) => data);
  }

  get(id: number) {
    return axios
      .get(`${getBaseUrl()}/video-games/${id}`)
      .then(({ data }) => data);
  }
}
