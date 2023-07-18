import { Mark } from '@tiptap/core';
import { Fragment } from '@tiptap/pm/model';

export interface RubyExtensionOptions {
  HTMLAttributes: object,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ruby: {
      setRuby: (HTMLAttributes: object) => ReturnType,
      unsetRuby: () => ReturnType,
    }
  }
}

export const Ruby = Mark.create<RubyExtensionOptions>({
  name: 'ruby',

  addAttributes() {
    return {
      text: {
        default: '',
      },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {
        text: {
          default: '',
        },
      },
    };
  },

  parseHTML() {
    return [{
      tag: 'ruby',

      getAttrs: (dom) => {
        let text = '';
        if (dom instanceof HTMLElement) {
          dom.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.tagName.toLowerCase() === 'rt') {
                text = node.innerText;
              }
            }
          });
        }
        const ret = {
          text,
        };
        return ret;
      },

      getContent: (dom, schema) => {
        let base = '';
        if (dom instanceof HTMLElement) {
          dom.childNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.tagName.toLowerCase() === 'rb') {
                base = node.innerText;
              }
            }
          });
        }

        return Fragment.fromJSON(schema, [{ type: 'text', text: base }]);
      },
    }];
  },

  addCommands() {
    return {
      setRuby: (HTMLAttributes) => ({ commands }) => commands.setMark('ruby', HTMLAttributes),
      unsetRuby: () => ({ commands }) => commands.unsetMark('ruby'),
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['ruby', ['rb', 0], ['rt', HTMLAttributes.text]];
  },
});
