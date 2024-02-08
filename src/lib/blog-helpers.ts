import fetch from "node-fetch";
import { BASE_PATH, REQUEST_TIMEOUT_MS } from "../server-constants";
import type {
  Block,
  Heading1,
  Heading2,
  Heading3,
  RichText,
  Column,
} from "./interfaces";
import { pathJoin } from "./utils";

export const filePath = (url: URL): string => {
  const [dir, filename] = url.pathname.split("/").slice(-2);
  return pathJoin(BASE_PATH, `/notion/${dir}/${filename}`);
};

export const extractTargetBlocks = (
  blockType: string,
  blocks: Block[]
): Block[] => {
  return blocks
    .reduce((acc: Block[], block) => {
      if (block.Type === blockType) {
        acc.push(block);
      }

      if (block.ColumnList && block.ColumnList.Columns) {
        acc = acc.concat(
          _extractTargetBlockFromColums(blockType, block.ColumnList.Columns)
        );
      } else if (block.BulletedListItem && block.BulletedListItem.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.BulletedListItem.Children)
        );
      } else if (block.NumberedListItem && block.NumberedListItem.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.NumberedListItem.Children)
        );
      } else if (block.ToDo && block.ToDo.Children) {
        acc = acc.concat(extractTargetBlocks(blockType, block.ToDo.Children));
      } else if (block.SyncedBlock && block.SyncedBlock.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.SyncedBlock.Children)
        );
      } else if (block.Toggle && block.Toggle.Children) {
        acc = acc.concat(extractTargetBlocks(blockType, block.Toggle.Children));
      } else if (block.Paragraph && block.Paragraph.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.Paragraph.Children)
        );
      } else if (block.Heading1 && block.Heading1.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.Heading1.Children)
        );
      } else if (block.Heading2 && block.Heading2.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.Heading2.Children)
        );
      } else if (block.Heading3 && block.Heading3.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.Heading3.Children)
        );
      } else if (block.Quote && block.Quote.Children) {
        acc = acc.concat(extractTargetBlocks(blockType, block.Quote.Children));
      } else if (block.Callout && block.Callout.Children) {
        acc = acc.concat(
          extractTargetBlocks(blockType, block.Callout.Children)
        );
      }

      return acc;
    }, [])
    .flat();
};

const _extractTargetBlockFromColums = (
  blockType: string,
  columns: Column[]
): Block[] => {
  return columns
    .reduce((acc: Block[], column) => {
      if (column.Children) {
        acc = acc.concat(extractTargetBlocks(blockType, column.Children));
      }
      return acc;
    }, [])
    .flat();
};

export const buildURLToHTMLMap = async (
  urls: URL[]
): Promise<{ [key: string]: string }> => {
  const htmls: string[] = await Promise.all(
    urls.map(async (url: URL) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT_MS);

      return fetch(url.toString(), { signal: controller.signal })
        .then(res => {
          return res.text();
        })
        .catch(() => {
          console.log("Request was aborted");
          return "";
        })
        .finally(() => {
          clearTimeout(timeout);
        });
    })
  );

  return urls.reduce((acc: { [key: string]: string }, url, i) => {
    if (htmls[i]) {
      acc[url.toString()] = htmls[i];
    }
    return acc;
  }, {});
};

export const getStaticFilePath = (path: string): string => {
  return pathJoin(BASE_PATH, path);
};

export const getNavLink = (nav: string) => {
  if ((!nav || nav === "/") && BASE_PATH) {
    return pathJoin(BASE_PATH, "") + "/";
  }

  return pathJoin(BASE_PATH, nav);
};

export const getPostLink = (slug: string) => {
  return pathJoin(BASE_PATH, `/posts/${slug}`);
};

export const getTagLink = (tag: string) => {
  return pathJoin(BASE_PATH, `/posts/tag/${encodeURIComponent(tag)}`);
};

export const getPageLink = (page: number, tag: string) => {
  if (page === 1) {
    return tag ? getTagLink(tag) : pathJoin(BASE_PATH, "/");
  }
  return tag
    ? pathJoin(
        BASE_PATH,
        `/posts/tag/${encodeURIComponent(tag)}/page/${page.toString()}`
      )
    : pathJoin(BASE_PATH, `/posts/page/${page.toString()}`);
};

export const getDateStr = (date: string) => {
  const dt = new Date(date);

  if (date.indexOf("T") !== -1) {
    // Consider timezone
    const elements = date.split("T")[1].split(/([+-])/);
    if (elements.length > 1) {
      const diff = parseInt(`${elements[1]}${elements[2]}`, 10);
      dt.setHours(dt.getHours() + diff);
    }
  }

  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

export const buildHeadingId = (heading: Heading1 | Heading2 | Heading3) => {
  return heading.RichTexts.map((richText: RichText) => {
    if (!richText.Text) {
      return "";
    }
    return richText.Text.Content;
  })
    .join()
    .trim();
};

export const isTweetURL = (url: URL): boolean => {
  if (
    url.hostname !== "twitter.com" &&
    url.hostname !== "www.twitter.com" &&
    url.hostname !== "x.com" &&
    url.hostname !== "www.x.com"
  ) {
    return false;
  }
  return /\/[^/]+\/status\/[\d]+/.test(url.pathname);
};

export const isTikTokURL = (url: URL): boolean => {
  if (url.hostname !== "tiktok.com" && url.hostname !== "www.tiktok.com") {
    return false;
  }
  return /\/[^/]+\/video\/[\d]+/.test(url.pathname);
};

export const isInstagramURL = (url: URL): boolean => {
  if (
    url.hostname !== "instagram.com" &&
    url.hostname !== "www.instagram.com"
  ) {
    return false;
  }
  return /\/p\/[^/]+/.test(url.pathname);
};

export const isPinterestURL = (url: URL): boolean => {
  if (
    url.hostname !== "pinterest.com" &&
    url.hostname !== "www.pinterest.com" &&
    url.hostname !== "pinterest.jp" &&
    url.hostname !== "www.pinterest.jp"
  ) {
    return false;
  }
  return /\/pin\/[\d]+/.test(url.pathname);
};

export const isCodePenURL = (url: URL): boolean => {
  if (url.hostname !== "codepen.io" && url.hostname !== "www.codepen.io") {
    return false;
  }
  return /\/[^/]+\/pen\/[^/]+/.test(url.pathname);
};

export const isShortAmazonURL = (url: URL): boolean => {
  if (url.hostname === "amzn.to" || url.hostname === "www.amzn.to") {
    return true;
  }
  return false;
};

export const isFullAmazonURL = (url: URL): boolean => {
  if (
    url.hostname === "amazon.com" ||
    url.hostname === "www.amazon.com" ||
    url.hostname === "amazon.co.jp" ||
    url.hostname === "www.amazon.co.jp"
  ) {
    return true;
  }
  return false;
};

export const isAmazonURL = (url: URL): boolean => {
  return isShortAmazonURL(url) || isFullAmazonURL(url);
};

export const isYouTubeURL = (url: URL): boolean => {
  if (["www.youtube.com", "youtube.com", "youtu.be"].includes(url.hostname)) {
    return true;
  }
  return false;
};

// Supported URL
//
// - https://youtu.be/0zM3nApSvMg
// - https://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
// - https://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
// - https://www.youtube.com/watch?v=0zM3nApSvMg
// - https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
// - https://www.youtube.com/embed/0zM3nApSvMg?rel=0
// - https://youtube.com/live/uOLwqWlpKbA
export const parseYouTubeVideoId = (url: URL): string => {
  if (!isYouTubeURL(url)) return "";

  if (url.hostname === "youtu.be") {
    return url.pathname.split("/")[1];
  } else if (url.pathname === "/watch") {
    return url.searchParams.get("v") || "";
  } else {
    const elements = url.pathname.split("/");

    if (elements.length < 2) return "";

    if (
      elements[1] === "v" ||
      elements[1] === "embed" ||
      elements[1] === "live"
    ) {
      return elements[2];
    }
  }

  return "";
};
