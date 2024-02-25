type ContentType = "code" | "text";

type ContentChunk = {
  contentType: ContentType;
  content: string;
  id: string | number;
};

const isCode = (index: number) => index % 2 === 1;

//TODO support _x_ and **x**
export const splitCodeFromText = (content: string): Array<ContentChunk> => {
  const rawChunks = content.split("`");

  const processedChunks = rawChunks.map((content, index): ContentChunk => {
    const baseChunk = { content, id: index };

    return isCode(index)
      ? { ...baseChunk, contentType: "code" }
      : { ...baseChunk, contentType: "text" };
  });

  return processedChunks;
};
