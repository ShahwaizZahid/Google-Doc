import { create } from "zustand";
import { type Editor } from "@tiptap/react";

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor: Editor | null) => set({ editor }),
}));
