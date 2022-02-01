import {
  operations,
  components,
} from "../../lib/generated/track-api-base-types";

/**
 * Schemas
 */
export type TrackRequired = components["schemas"]["TrackRequired"];
export type AuthorRequired = components["schemas"]["AuthorRequired"];

/**
 * Operations
 */

// getTracks
export type GetTracksQuery = operations["getTracks"]["parameters"]["query"];
export type GetTracksResponse200 =
  operations["getTracks"]["responses"]["200"]["content"]["application/json"];

// getTrack
export type GetTrackPath = operations["getTrack"]["parameters"]["path"];
export type GetTrackResponse200 =
  operations["getTrack"]["responses"]["200"]["content"]["application/json"];

// updateTrack
export type UpdateTrackPath = operations["updateTrack"]["parameters"]["path"];
export type UpdateTrackBody = Omit<
  operations["updateTrack"]["requestBody"]["content"]["application/json"],
  "id"
>;
export type UpdateTrackResponse200 =
  operations["updateTrack"]["responses"]["200"]["content"]["application/json"];

// getAuthor
export type GetAuthorPath = operations["getAuthor"]["parameters"]["path"];
export type GetAuthorResponse200 =
  operations["getAuthor"]["responses"]["200"]["content"]["application/json"];
