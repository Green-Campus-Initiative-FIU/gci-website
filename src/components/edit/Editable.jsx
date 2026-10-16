"use client";

import { useState } from "react";
import { useEdit } from "./EditProvider";
import { Emphasize } from "@/components/site/Emphasize";

/*
 * A piece of page text an admin can change in place.
 *   <Editable k="home.hero.lede" v={c["home.hero.lede"]} as="p" className="lede" />
 * `emphasize` colors one word (display mode only). Single-line fields ignore Enter.
 */
export default function Editable({ k, v, as: Tag = "span", emphasize, multiline = false, ...rest }) {
  const { editing, changes, version } = useEdit();
  const shown = changes?.[k] ?? v;

  if (!editing) {
    return <Tag {...rest}>{emphasize ? <Emphasize text={shown} word={emphasize} /> : shown}</Tag>;
  }
  // Remount when edit mode starts or changes are discarded/saved, so the text resets.
  return <EditableField key={`${k}:${version}`} k={k} initial={shown} Tag={Tag} multiline={multiline} rest={rest} />;
}

function EditableField({ k, initial, Tag, multiline, rest }) {
  const { setChange } = useEdit();
  // Children are fixed at mount so React never rewrites the text under the caret.
  const [text] = useState(initial);
  return (
    <Tag
      {...rest}
      data-edit=""
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck
      role="textbox"
      aria-label="Editable text"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onInput={(e) => setChange(k, e.currentTarget.innerText)}
    >
      {text}
    </Tag>
  );
}
