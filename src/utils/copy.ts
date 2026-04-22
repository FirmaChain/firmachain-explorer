// Replaced copy-to-clipboard

export async function copyText(text: string): Promise<boolean> {
    try {
        if (window.isSecureContext && navigator.clipboard?.writeText) {
            // Use modern clipboard API in secure contexts
            await navigator.clipboard.writeText(text);
            return true;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, text.length);

        // Use legacy copy API as fallback
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);

        return success;
    } catch {
        return false;
    }
}
