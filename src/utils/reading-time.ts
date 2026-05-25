/**
 * 轻量阅读时长估算：中文按字、英文按词分别统计后合并为分钟数。
 */

/** 英文阅读速度（词/分钟） */
const LATIN_WORDS_PER_MINUTE = 200;
/** 中文阅读速度（字/分钟） */
const CJK_CHARS_PER_MINUTE = 300;

/** CJK 汉字（含扩展区） */
const CJK_CHAR_RE = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g;

export interface ReadingTime {
  /** 阅读分钟数，最少 1 分钟 */
  minutes: number;
  /** 统计单位：CJK 字数 + 拉丁词数 */
  words: number;
}

/** 去掉代码块与 HTML，便于统计正文 */
function stripForCount(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingTime(text: string): ReadingTime {
  const cleaned = stripForCount(text);
  const cjkChars = (cleaned.match(CJK_CHAR_RE) ?? []).length;
  const withoutCjk = cleaned.replace(CJK_CHAR_RE, ' ');
  const latinWords = withoutCjk.split(' ').filter(Boolean).length;
  const words = cjkChars + latinWords;

  const minutes = Math.max(
    1,
    Math.round(cjkChars / CJK_CHARS_PER_MINUTE + latinWords / LATIN_WORDS_PER_MINUTE),
  );

  return { words, minutes };
}
