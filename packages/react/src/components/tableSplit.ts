/**
 * Re-export from @ucontract/docx-editor-core where the implementation now lives.
 * Kept for backward compatibility with in-package imports.
 */
export {
  type SplitCellDialogConfig,
  getSplitCellDialogConfig,
  splitActiveTableCell,
} from '@ucontract/docx-editor-core/prosemirror/commands';
