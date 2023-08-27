import { stringify } from '@vivliostyle/vfm';

export function getHtmlLength(html: string) {
  const rawText = html.replace(/<rt>.*?<\/rt>/g, '').replace(/<.*?>/g, '').replace(/\r?\n/g, '');
  return rawText.length;
}

export function getVfmLength(vfm: string) {
  const newVfm = stringify(vfm, { disableFormatHtml: true });
  return getHtmlLength(newVfm);
}
