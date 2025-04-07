"use client";

import React from "react";
import Ruler from "./ruler";
import { Threads } from "./threads";
import { PAGE_WIDTH } from "@/constants/page-width";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import TableCell from "@tiptap/extension-table-cell";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import ImageResize from "tiptap-extension-resize-image";
import TableHeader from "@tiptap/extension-table-header";
import { useEditor, EditorContent } from "@tiptap/react";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";

import { useStorage } from "@liveblocks/react";
import { useEditorStore } from "@/store/use-editor-store";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";

type EditorProps = {
  initialContent?: string | undefined;
};

export default function Editor({ initialContent }: EditorProps) {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onDestroy: () => setEditor(null),
    onUpdate: ({ editor }) => setEditor(editor),
    onSelectionUpdate: ({ editor }) => setEditor(editor),
    onTransaction: ({ editor }) => setEditor(editor),
    onFocus: ({ editor }) => setEditor(editor),
    onBlur: ({ editor }) => setEditor(editor),
    onContentError: ({ editor }) => setEditor(editor),
    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin}px; padding-right:${rightMargin}px;`,
        class:
          "focus:outline-none print:border-0 pbg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        history: false,
      }),
      Image,
      ImageResize,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Underline,
      FontFamily,
      TextStyle,
      FontSizeExtension,
      LineHeightExtension,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
    ],
  });

  return (
    <div className="size-full overflow-x-auto   bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div
        className={`min-w-max mx-auto flex justify-center w-[${PAGE_WIDTH}px]  py-y print:py-0 print:w-full print:min-w-0 mt-4`}
      >
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
}
