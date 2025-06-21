"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiImage,
  FiCode,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
} from "react-icons/fi";
import s from "./Editor.module.scss";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL изображения:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("URL ссылки:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className={s.menuBar}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? s.isActive : ""}
        title="Жирный"
      >
        <FiBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? s.isActive : ""}
        title="Курсив"
      >
        <FiItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? s.isActive : ""}
        title="Список"
      >
        <FiList />
      </button>
      <button onClick={setLink} title="Добавить ссылку">
        <FiLink />
      </button>
      <button onClick={addImage} title="Добавить изображение">
        <FiImage />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? s.isActive : ""}
        title="Блок кода"
      >
        <FiCode />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? s.isActive : ""}
        title="По левому краю"
      >
        <FiAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? s.isActive : ""}
        title="По центру"
      >
        <FiAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? s.isActive : ""}
        title="По правому краю"
      >
        <FiAlignRight />
      </button>
    </div>
  );
};

export default function Editor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: s.proseMirror,
      },
    },
  });

  return (
    <div className={s.editor}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={s.content} />
    </div>
  );
}
