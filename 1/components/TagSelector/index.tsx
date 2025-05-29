"use client";

import styles from "./index.module.css";

interface TagSelectorProps {
    tags: string[];
    selectedTag: string | null;
    onSelect: (tag: string) => void;
}

const TagSelector = ({ tags, selectedTag, onSelect }: TagSelectorProps) => {
    return (
        <div className={styles.wrapper}>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onSelect(tag)}
                    className={`${styles.button} ${
                        selectedTag === tag ? styles.selected : ""
                    }`}
                >
                    #{tag}
                </button>
            ))}
        </div>
    );
};

export default TagSelector;
