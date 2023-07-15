import Delta from 'quill-delta';
import {
  createScroll as baseCreateScroll,
  createRegistry,
} from '../__helpers__/factory';
import Editor from '../../../core/editor';
import Header from '../../../formats/header';
import Italic from '../../../formats/italic';
import { describe, expect, test } from 'vitest';

const createScroll = (html: string) =>
  baseCreateScroll(html, createRegistry([Header, Italic]));

describe('Header', () => {
  test('add', () => {
    const editor = new Editor(createScroll('<p><em>0123</em></p>'));
    editor.formatText(4, 1, { header: 1 });
    expect(editor.getDelta()).toEqual(
      new Delta().insert('0123', { italic: true }).insert('\n', { header: 1 }),
    );
    expect(editor.scroll).toMatchInlineSnapshot('<h1><em>0123</em></h1>');
  });

  test('remove', () => {
    const editor = new Editor(createScroll('<h1><em>0123</em></h1>'));
    editor.formatText(4, 1, { header: false });
    expect(editor.getDelta()).toEqual(
      new Delta().insert('0123', { italic: true }).insert('\n'),
    );
    expect(editor.scroll).toMatchInlineSnapshot('<p><em>0123</em></p>');
  });

  test('change', () => {
    const editor = new Editor(createScroll('<h1><em>0123</em></h1>'));
    editor.formatText(4, 1, { header: 2 });
    expect(editor.getDelta()).toEqual(
      new Delta().insert('0123', { italic: true }).insert('\n', { header: 2 }),
    );
    expect(editor.scroll).toMatchInlineSnapshot('<h2><em>0123</em></h2>');
  });
});
