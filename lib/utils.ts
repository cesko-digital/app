// This is a hack, see https://github.com/vercel/next.js/issues/11993
export const prepareToSerialize = (data: any) =>
  JSON.parse(JSON.stringify(data));
