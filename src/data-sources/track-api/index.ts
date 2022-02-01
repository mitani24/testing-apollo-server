import { RESTDataSource } from "apollo-datasource-rest";
import {
  GetAuthorPath,
  GetAuthorResponse200,
  GetTrackPath,
  GetTrackResponse200,
  GetTracksQuery,
  GetTracksResponse200,
  UpdateTrackBody,
  UpdateTrackPath,
  UpdateTrackResponse200,
} from "./types";

const formatQuery = (obj?: Record<string, any>) => {
  if (!obj) return obj;
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
};

export class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  getTracks({ query }: { query?: GetTracksQuery }) {
    return this.get<GetTracksResponse200>("/tracks", formatQuery(query));
  }

  getTrack({ path }: { path: GetTrackPath }) {
    return this.get<GetTrackResponse200>(`/tracks/${path.track_id}`);
  }

  updateTrack({
    path,
    body,
  }: {
    path: UpdateTrackPath;
    body: UpdateTrackBody;
  }) {
    return this.patch<UpdateTrackResponse200>(`/tracks/${path.track_id}`, body);
  }

  getAuthor({ path }: { path: GetAuthorPath }) {
    return this.get<GetAuthorResponse200>(`authors/${path.author_id}`);
  }
}
