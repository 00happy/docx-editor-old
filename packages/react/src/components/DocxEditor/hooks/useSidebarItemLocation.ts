import { useEffect } from 'react';

import type { PagedEditorRef } from '../PagedEditor';

/**
 * Locating: when the user expands a comment / tracked-change card in the
 * sidebar, scroll the document to the corresponding site.
 *
 * Card ids follow the sidebar convention: `comment-<id>` for comments,
 * `tc-<rid>-<n>` for tracked changes (the revision id is the second segment).
 */
export function useSidebarItemLocation(
  expandedSidebarItem: string | null,
  pagedEditorRef: React.RefObject<PagedEditorRef | null>
): void {
  useEffect(() => {
    if (!expandedSidebarItem) return;
    if (expandedSidebarItem.startsWith('comment-')) {
      const commentId = Number(expandedSidebarItem.slice(8));
      if (!Number.isNaN(commentId)) pagedEditorRef.current?.scrollToCommentId(commentId);
    } else if (expandedSidebarItem.startsWith('tc-')) {
      const revisionId = Number(expandedSidebarItem.split('-')[1]);
      if (!Number.isNaN(revisionId)) pagedEditorRef.current?.scrollToChangeId(revisionId);
    }
  }, [expandedSidebarItem, pagedEditorRef]);
}
