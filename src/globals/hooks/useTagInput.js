import { useState, useRef, useCallback } from "react";

const normalizeValue = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  // Si viene como string separado por comas: "ABC,DEF" → ["ABC", "DEF"]
  if (typeof value === "string")
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  return [];
};

export function useTagInput({
  name,
  value,
  onChange,
  allowDuplicates = false,
  maxTags,
} = {}) {
  const [tags, setTags] = useState(() => normalizeValue(value));
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }, []);

  const notifyChange = useCallback(
    (newTags) => {
      onChange?.({ target: { name, value: newTags } });
    },
    [name, onChange],
  );

  const addTag = useCallback(
    (val) => {
      const trimmed = val.trim();
      if (!trimmed) return;

      if (!allowDuplicates && tags.includes(trimmed)) {
        triggerShake();
        setInput("");
        return;
      }

      if (maxTags && tags.length >= maxTags) {
        triggerShake();
        return;
      }

      const newTags = [...tags, trimmed];
      setTags(newTags);
      setInput("");
      notifyChange(newTags);
    },
    [tags, allowDuplicates, maxTags, triggerShake, notifyChange],
  );

  const removeTag = useCallback(
    (index) => {
      const newTags = tags.filter((_, i) => i !== index);
      setTags(newTags);
      notifyChange(newTags);
    },
    [tags, notifyChange],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(input);
      } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    },
    [input, tags, addTag, removeTag],
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const parts = e.clipboardData
        .getData("text")
        .split(/[\n,]+/)
        .map((p) => p.trim())
        .filter(Boolean);
      parts.forEach(addTag);
    },
    [addTag],
  );

  const handleBlur = useCallback(() => {
    if (input.trim()) addTag(input);
  }, [input, addTag]);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    tags,
    input,
    shake,
    inputRef,
    addTag,
    removeTag,
    handleKeyDown,
    handlePaste,
    handleBlur,
    handleInputChange,
    focusInput,
  };
}
