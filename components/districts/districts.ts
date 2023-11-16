import { UserProfile } from "src/data/user-profile";
import sourceData from "./districts.json";

/** Map member is a subset of user profile containing just the necessary fields */
export type MapMember = Pick<
  UserProfile,
  "name" | "slackId" | "slackAvatarUrl" | "slackProfileUrl"
>;

/** Map model is a map where the keys are district names and the values are lists of users in given district */
export type MapModel = Record<string, MapMember[]>;

/** Parse lat long coordinates from the Mapy.cz format into Leaflet format */
const parseCoords = (input: string) =>
  input.replace("N", "").replace("E", "").split(/,\s*/).map(parseFloat);

/** A list of district with their lat/long coordinates */
export const districts: Record<string, number[]> = Object.fromEntries(
  sourceData
    .filter(({ coords }) => coords !== "")
    .map(({ name, coords }) => [name, parseCoords(coords)])
);
