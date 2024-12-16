import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class GenreService {
  all() {
    return axios.get(`${getBaseUrl()}/genres`).then(({ data }) => data);
  }
}
