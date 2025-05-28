import {
  array,
  field,
  record,
  string,
  type DecoderFunction,
  type decodeType,
} from "typescript-json-decoder";

import { nazvyPravnichForem } from "~/src/ares/pravnicke-osoby";
import { decodeIČO } from "~/src/decoding";

//
// Types
//

const nazevPodleKoduPravniFormy = (value: unknown) =>
  nazvyPravnichForem[string(value)];

export type EkonomickySubjekt = decodeType<typeof decodeEkonomickySubjekt>;
export const decodeEkonomickySubjekt = record({
  ico: decodeIČO,
  obchodniJmeno: string,
  pravniForma: string,
  nazevPravniFormy: field("pravniForma", nazevPodleKoduPravniFormy),
});

//
// API
//

const baseUrl = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest";

const decodeWrapper = <T>(decodeItem: DecoderFunction<T>) =>
  record({
    icoId: string,
    zaznamy: array(decodeItem),
  });

export const aresGetEkonomickySubjekt = async (
  ico: string,
): Promise<EkonomickySubjekt | null> =>
  fetch(`${baseUrl}/ekonomicke-subjekty-res/${ico}`)
    .then((response) => response.json())
    .then(decodeWrapper(decodeEkonomickySubjekt))
    .then((wrapper) => wrapper.zaznamy[0])
    .catch((e) => {
      console.error(e);
      return null;
    });
