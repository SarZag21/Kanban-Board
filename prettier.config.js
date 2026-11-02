/** @type {import("prettier").Config} */
// Definiert die globale Prettier-Konfiguration für das Projekt.
const config = {
	// Nutzt Tabs statt Leerzeichen, um die Einrückung konsistent zu halten.
	useTabs: true,
	// Verwendet einfache Anführungszeichen statt doppelte.
	singleQuote: true,
	// Keine Kommas am Ende der letzten Eigenschaft in Arrays oder Objekten.
	trailingComma: 'none',
	// Maximale Zeilenbreite für Formatierung.
	printWidth: 100,
	// Aktiviert Plugins für Svelte und Tailwind CSS.
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	// Für Svelte-Dateien wird der passende Parser verwendet.
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	// Verlinkt die Tailwind-Stylesheet-Datei für die Formatierung.
	tailwindStylesheet: './src/routes/layout.css'
};

// Exportiert die Konfiguration, damit Prettier sie automatisch einliest.
export default config;
