// Importiert das Prettier-Plugin für ESLint, damit Formatierungsregeln nicht doppelt angewendet werden.
import prettier from 'eslint-config-prettier';
// Importiert das PATH-Modul, damit der Pfad zur .gitignore-Datei erkannt werden kann.
import path from 'node:path';
// Importiert die empfohlenen Standardregeln für JavaScript.
import js from '@eslint/js';
// Importiert die ESLint-Regeln speziell für Svelte.
import svelte from 'eslint-plugin-svelte';
// Importiert die Hilfsfunktionen zum Definieren der ESLint-Konfiguration.
import { defineConfig, includeIgnoreFile } from 'eslint/config';
// Importiert globale Variablen, damit Browser- und Node-Umgebungen korrekt erkannt werden.
import globals from 'globals';

// Ermittelt den genauen Pfad zur .gitignore-Datei im Projekt.
const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

// Exportiert die komplette ESLint-Konfiguration.
export default defineConfig([
	// Ignoriert alle Einträge aus der .gitignore-Datei.
	includeIgnoreFile(gitignorePath),
	// Aktiviert die Basis-Regeln für JavaScript.
	js.configs.recommended,
	// Aktiviert die Standardregeln für Svelte-Projekte.
	svelte.configs.recommended,
	// Deaktiviert Regeln, die mit Prettier bereits abgehandelt werden.
	prettier,
	// Aktiviert die Prettier-Integration für Svelte-Dateien.
	svelte.configs.prettier,
	{
		// Legt globale Variablen für Browser- und Node-Umgebungen fest.
		languageOptions: { globals: { ...globals.browser, ...globals.node } }
	},

	{
		// Wendet spezielle Einstellungen nur auf Svelte-Dateien an.
		files: ['**/*.svelte', '**/*.svelte.js'],
		languageOptions: { parserOptions: {} }
	},

	{
		// Hier können individuelle Regeln ergänzt oder überschrieben werden.
		// Beispiel: 'svelte/button-has-type': 'error'
		rules: {}
	}
]);
