import { ShowArtieModel } from "@prisma/client";

export const getArtieImageUrl = (model: ShowArtieModel): string => {
  const artieImageMap: Record<ShowArtieModel, string> = {
    PAINTING: "/images/artie/painting.png",
    DEFAULT: "/images/artie/default.png",
    ANGRY: "/images/artie/angry.png",
    RUSHING: "/images/artie/rushing.png",
    SURPRISE: "/images/artie/surprise.png",
    TIRED: "/images/artie/tired.png",
    UMM: "/images/artie/umm.png",
  };

  return artieImageMap[model] || artieImageMap.DEFAULT;
};
