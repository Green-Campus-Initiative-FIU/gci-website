"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "@/components/site/SiteImage";
import PhotoField from "./PhotoField";
import { SCHEMAS } from "@/content/schemas";
import { deleteItemAction, importDefaultsAction, moveItemAction, saveItemAction } from "@/content/actions";

/*
 * Generic editor for a managed list (committees, team, events, faq).
 * Fields come from SCHEMAS so the form and the server validation match.
 */
export default function ItemsManager({ collection, items: serverItems, defaults = null, intro }) {
  const schema = SCHEMAS[collection];
  const router = useRouter();
  // Local copy so moves and deletes show instantly; resyncs whenever the server sends new data.
  const [items, setItems] = useState(serverItems);
  useEffect(() => setItems(serverItems), [serverItems]);
  const [editing, setEditing] = useState(null); // item id, "new", or null
  const [pending, start] = useTransition();
  const [message, setMessage] = useState(null);

  const run = (fn) =>
    start(async () => {
      setMessage(null);
      const res = await fn().catch(() => ({ error: "Couldn't reach the server. Try again." }));
      if (res?.error) {
        setMessage({ error: res.error });
        setItems(serverItems);
      } else {
        if (res?.ok) setMessage({ ok: res.ok });
        router.refresh();
      }
    });

  // Built-in items (committees/FAQ) are shown until they're copied into the database.
  if (!items.length && defaults?.length) {
    return (
      <div className="panel">
        <p style={{ maxWidth: "40em" }}>
          The site is showing {defaults.length} built-in {schema.noun} right now. To edit, add or remove any of them, first make them editable. They&apos;ll look the same on the site.
        </p>
        <ul className="plainlist">
          {defaults.map((d) => (
            <li key={d[schema.titleField]}>{d[schema.titleField]}</li>
          ))}
        </ul>
        <button className="btn btn-gold btn-small" disabled={pending} onClick={() => run(() => importDefaultsAction(collection))}>
          {pending ? "Copying…" : `Make these ${schema.noun} editable`}
        </button>
        {message?.error && <p className="err">{message.error}</p>}
      </div>
    );
  }

  return (
    <>
      {intro && <p className="dash-intro">{intro}</p>}
      {message?.ok && (
        <p className="ok" role="status">
          {message.ok}
        </p>
      )}
      {message?.error && (
        <p className="err" role="alert">
          {message.error}
        </p>
      )}

      <ul className="mylist">
        {items.map((item, i) =>
          editing === item.id ? (
            <li key={item.id}>
              <ItemForm
                collection={collection}
                item={item}
                onDone={(ok) => {
                  setEditing(null);
                  if (ok) setMessage({ ok });
                  router.refresh();
                }}
              />
            </li>
          ) : (
            <li key={item.id} className="myrow">
              <Thumb schema={schema} item={item} />
              <div>
                <h3>{item[schema.titleField]}</h3>
                {schema.subtitleField && <span className="date">{item[schema.subtitleField]}</span>}
              </div>
              <div className="btns">
                {schema.ordered && (
                  <>
                    <button className="btn btn-small" aria-label="Move up" disabled={pending || i === 0} onClick={() => { setItems(swap(items, i, i - 1)); run(() => moveItemAction(collection, item.id, "up")); }}>
                      ↑
                    </button>
                    <button className="btn btn-small" aria-label="Move down" disabled={pending || i === items.length - 1} onClick={() => { setItems(swap(items, i, i + 1)); run(() => moveItemAction(collection, item.id, "down")); }}>
                      ↓
                    </button>
                  </>
                )}
                <button className="btn btn-small" onClick={() => setEditing(item.id)} disabled={editing !== null}>
                  Edit
                </button>
                <DeleteButton label={schema.label.toLowerCase()} disabled={pending} onDelete={() => { setItems(items.filter((x) => x.id !== item.id)); run(() => deleteItemAction(collection, item.id)); }} />
              </div>
            </li>
          )
        )}
      </ul>

      {editing === "new" ? (
        <ItemForm
          collection={collection}
          onDone={(ok) => {
            setEditing(null);
            if (ok) setMessage({ ok });
            router.refresh();
          }}
        />
      ) : (
        <button className="btn btn-gold btn-small" onClick={() => setEditing("new")} disabled={editing !== null} style={{ marginTop: 16 }}>
          + Add {schema.label.toLowerCase()}
        </button>
      )}
    </>
  );
}

const swap = (arr, a, b) => {
  const next = [...arr];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
};

function Thumb({ schema, item }) {
  const photo = schema.fields.find((f) => f.type === "image");
  if (!photo) return <span className="thumb thumb-empty" aria-hidden="true" />;
  return (
    <span className={`thumb${photo.square ? " thumb-round" : ""}`}>
      {item[photo.name] ? <Image src={item[photo.name]} alt="" fill sizes="96px" style={{ objectFit: "cover" }} /> : null}
    </span>
  );
}

function DeleteButton({ label, onDelete, disabled }) {
  const [confirm, setConfirm] = useState(false);
  if (confirm)
    return (
      <span className="confirm">
        Delete this {label}?
        <button className="btn btn-small btn-danger" disabled={disabled} onClick={onDelete}>
          Yes, delete
        </button>
        <button className="btn btn-small" onClick={() => setConfirm(false)}>
          Keep
        </button>
      </span>
    );
  return (
    <button className="btn btn-small btn-danger" disabled={disabled} onClick={() => setConfirm(true)}>
      Delete
    </button>
  );
}

function ItemForm({ collection, item = null, onDone }) {
  const schema = SCHEMAS[collection];
  const [state, formAction] = useActionState(saveItemAction.bind(null, collection, item?.id ?? null), null);

  useEffect(() => {
    if (state?.ok) onDone(state.ok);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.savedAt]);

  return (
    <form className="form panel" action={formAction}>
      <h2 className="dash-sub">{item ? `Edit ${schema.label.toLowerCase()}` : `New ${schema.label.toLowerCase()}`}</h2>
      {schema.fields.map((f) => (
        <Field key={f.name} f={f} value={item?.[f.name]} />
      ))}
      {state?.error && (
        <p className="err" role="alert">
          {state.error}
        </p>
      )}
      <div className="actions">
        <button type="button" className="btn btn-small" onClick={() => onDone(null)}>
          Cancel
        </button>
        <SaveButton />
      </div>
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold btn-small" type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

function Field({ f, value }) {
  const common = { name: f.name, required: f.required, placeholder: f.placeholder, maxLength: f.max };
  const hint = f.hint && <span className="hint">{f.hint}</span>;
  switch (f.type) {
    case "image":
      return <PhotoField name={f.name} label={f.label} defaultUrl={value} folder={f.folder} square={f.square} />;
    case "textarea":
      return (
        <label>
          {f.label} {hint}
          <textarea {...common} rows={f.rows || 4} defaultValue={value ?? ""} />
        </label>
      );
    case "lines":
      return (
        <label>
          {f.label} {hint}
          <textarea name={f.name} rows={Math.min(6, f.max || 4)} defaultValue={Array.isArray(value) ? value.join("\n") : ""} />
        </label>
      );
    case "select":
      return (
        <label>
          {f.label}
          <select name={f.name} defaultValue={value || f.options[0].value}>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      );
    default:
      return (
        <label>
          {f.label} {hint}
          <input {...common} type={f.type === "date" ? "date" : f.type === "email" ? "email" : f.type === "url" ? "url" : "text"} defaultValue={value ?? ""} />
        </label>
      );
  }
}
