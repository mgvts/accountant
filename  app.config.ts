export default defineAppConfig({
    ui: {
        variables: {
            light: {
                background: '255 255 255',
                foreground: 'var(--color-gray-700)'
            },
            dark: {
                background: 'var(--color-gray-900)',
                foreground: 'var(--color-gray-200)'
            },
        },
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 bottom-auto'
        }
    }
})
