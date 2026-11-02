
// Importiert die Vite-Konfigurationsfunktion.
import { defineConfig } from 'vite';
// Importiert das Tailwind-Plugin für Vite, damit Tailwind in der App genutzt werden kann.
import tailwindcss from '@tailwindcss/vite';
// Importiert das PWA-Plugin für SvelteKit, damit die App installierbar und offlinefähig wird.
import { withPwa } from '@vite-pwa/sveltekit';

// Definiert die Vite-Konfiguration für das Projekt.
export default defineConfig({
    // Enthält alle Plugins, die Vite beim Bundeln und Entwickeln verwenden soll.
    plugins: [
        // Aktiviert Tailwind direkt im Vite-Workflow.
        tailwindcss(),
        // Initialisiert die PWA-Integration mit den angegebenen Optionen.
        withPwa(
            {},
            {
                // Aktiviert Auto-Updates für den Service Worker.
                registerType: 'autoUpdate',
                // Workbox-Konfiguration zur Berechnung der Cache-Entitäten.
                workbox: {
                    // Welche Dateien für den Offline-Cache berücksichtigt werden sollen.
                    globPatterns: [
                        'client/**/*.{js,css,ico,png,svg,webp,webmanifest}',
                        'prerendered/**/*.{html,json}'
                    ],
                    // Keine harte Fehlermeldung, wenn einige Muster im Build nicht gefunden werden.
                    globStrict: false
                },
                // Definiert das Web-App-Manifest für die installierbare PWA.
                manifest: {
                    // Name der App, der im Installationsdialog angezeigt wird.
                    name: 'Kanban Board',
                    // Kurzname, der in der Taskleiste oder App-Übersicht verwendet wird.
                    short_name: 'Kanban',
                    // Startseite der App nach dem Start.
                    start_url: '/',
                    // App wird als eigenständige Anwendung im Browser angezeigt.
                    display: 'standalone',
                    // Hintergrundfarbe der App beim Laden.
                    background_color: '#f8f9fb',
                    // Theme-Farbe für Browser-UI und Installations-Dialog.
                    theme_color: '#263445',
                    // PWA-Icons für verschiedene Größen.
                    icons: [
                        {
                            // Icon mit 192x192 Pixeln.
                            src: '/icon-192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            // Icon mit 512x512 Pixeln.
                            src: '/icon-512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
            }
        )
    ]
});
