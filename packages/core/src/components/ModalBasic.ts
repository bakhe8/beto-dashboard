export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function ModalBasic(root: HTMLElement, props: ModalProps) {
  if (!props.open) return null;
  const previouslyFocused = document.activeElement as HTMLElement | null;
  const dialog = document.createElement('div');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';

  // Ensure the dialog has an accessible name via aria-labelledby
  const titleId = `modalbasic-title-${Math.random().toString(36).slice(2)}`;
  dialog.setAttribute('aria-labelledby', titleId);

  dialog.innerHTML = `
    <div class="bg-white rounded-lg p-6 shadow-xl w-96 max-w-full mx-4 relative" role="document">
      <h2 id="${titleId}" class="text-xl font-semibold mb-4">${props.title || 'Modal'}</h2>
      <div class="modal-content">
        <slot></slot>
      </div>
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors" aria-label="Close modal">&times;</button>
    </div>`;

  const closeBtn = dialog.querySelector('button');
  const closeHandler = () => {
    dialog.remove();
    props.onClose();
    document.removeEventListener('keydown', onKeydown as any);
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeHandler();
    }
  };
  document.addEventListener('keydown', onKeydown as any);

  closeBtn?.addEventListener('click', closeHandler);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeHandler();
  });

  root.appendChild(dialog);

  // Focus the close button after mount for accessibility
  setTimeout(() => closeBtn?.focus(), 100);

  return {
    close: () => {
      dialog.remove();
      closeBtn?.removeEventListener('click', closeHandler);
      document.removeEventListener('keydown', onKeydown as any);
    }
  };
}
