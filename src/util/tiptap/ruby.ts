import { Mark, mergeAttributes } from '@tiptap/core';

export interface RtExtensionOptions {
  HTMLAttributes: object,
}

export const Rt = Mark.create({
  name: 'rt',

  addOptions() {
    return {
      HtmlAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'rt',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['bold', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
