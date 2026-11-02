
<script>
    // Svelte-Hook, der nach dem ersten Rendern ausgeführt wird.
    import { onMount } from 'svelte';
    // Importiert die Spalten-Komponente, die jede Kanban-Spalte darstellt.
    import Lane from '../lib/Lane.svelte';
    // Importiert das Formular, mit dem neue Aufgaben angelegt werden.
    import IssueForm from '../lib/IssueForm.svelte';
    // Date-fns wird für Datumsformatierungen verwendet.
    import { format } from 'date-fns';

    // Definiert die vier vorhandenen Kanban-Spalten.
    const lanes = ['Do', 'Doing', 'Done', 'Archiv'];

    // Referenz auf das HTML-Dialog-Element.
    let dialog;
    // Speichert alle Aufgaben im Zustand der Komponente.
    let issues = $state([]);
    // Prüft, ob die Aufgaben aus dem lokalen Speicher bereits geladen wurden.
    let loaded = $state(false);

    // Lädt beim ersten Rendern bestehende Einträge aus localStorage.
    onMount(() => {
        try {
            // Versucht, gespeicherte Aufgaben zu lesen, sonst default auf leeres Array.
            issues = JSON.parse(localStorage.getItem('issues') || '[]');
            // Falls kein Array zurückkommt, wird der Inhalt verworfen.
            if (!Array.isArray(issues)) issues = [];
        } catch {
            // Bei fehlerhaftem JSON wird eine sichere leere Liste verwendet.
            issues = [];
        }

        // Markiert den Ladevorgang als abgeschlossen.
        loaded = true;
    });

    // Speichert Aufgaben automatisch, sobald sich der Zustand ändert und geladen ist.
    $effect(() => {
        if (loaded) {
            localStorage.setItem('issues', JSON.stringify(issues));
        }
    });

    // Öffnet das Dialogfenster für neue Aufgaben.
    function openDialog() {
        dialog.showModal();
    }

    // Fügt eine neue Aufgabe in die Liste ein und setzt Standardwerte.
    function addIssue(data) {
        issues.push({
            ...data,
            // Generiert eine eindeutige ID für jedes Element.
            id: crypto.randomUUID(),
            // Speichert das Erstellungsdatum im Format YYYY-MM-DD.
            creationDate: new Date().toLocaleDateString('en-CA'),
            // Konvertiert die Story Points in eine Zahl.
            storyPoints: Number(data.storyPoints),
            // Neue Aufgaben starten immer in der ersten Spalte.
            lane: 'Do'
        });

        // Schließt den Dialog nach dem Anlegen.
        dialog.close();
    }

    // Fragt die Browser-Benachrichtigungsrechte an, falls nötig.
    async function enableNotifications() {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }

    // Verschiebt eine Aufgabe in eine andere Spalte und zeigt optional eine Benachrichtigung an.
    function moveIssue(id, lane) {
        // Sucht die Aufgabe anhand ihrer ID.
        const issue = issues.find(i => i.id === id);

        // Bricht ab, wenn die Aufgabe nicht existiert oder schon in der gewünschten Spalte ist.
        if (!issue || issue.lane === lane) return;

        // Aktualisiert die Spalte der Aufgabe.
        issue.lane = lane;

        // Zeigt nur eine Notification, wenn die Aufgabe im Done-Lane landet und die Berechtigung vorliegt.
        if (lane === 'Done' && 'Notification' in window &&
            Notification.permission === 'granted') {
            new Notification('Issue completed', {
                body: issue.title
            });
        }
    }

    // Exportiert alle Aufgaben als CSV-Datei.
    function exportCSV() {
        // Reihenfolge der Spalten im CSV.
        const columns = [
            'title', 'description', 'creationDate',
            'dueDate', 'storyPoints', 'priority', 'lane'
        ];

        // Escapet Werte korrekt, damit CSV-Strings gültig bleiben.
        const escapeCSV = (value) =>
            '"' + String(value ?? '')
                .replace(/^[=+\-@\t\r]/, "'$&")
                .replaceAll('"', '""') + '"';

        // Erstellt die CSV-Zeilen inklusive Header und Daten.
        const rows = [
            columns.join(','),
            ...issues.map(issue =>
                columns.map(key => escapeCSV(issue[key])).join(',')
            )
        ];

        // Erstellt ein Blob mit UTF-8 BOM, damit Excel die Datei sauber erkennt.
        const blob = new Blob(
            ['\uFEFF' + rows.join('\r\n')],
            { type: 'text/csv;charset=utf-8' }
        );

        // Legt einen temporären Download-Link an.
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'kanban-issues.csv';
        a.click();

        // Aufräumen, damit kein Speicherleck entsteht.
        URL.revokeObjectURL(url);
    }
</script>

<svelte:head>
    <!-- Setzt den Browser-Titel der Seite. -->
    <title>Kanban Board</title>
    <!-- Beschreibt die Seite für Suchmaschinen und Browser. -->
    <meta
        name="description"
        content="Offline Kanban Board for managing issues"
    />
</svelte:head>

<header>
    <!-- Überschrift der Anwendung. -->
    <h1>Kanban Board</h1>

    <div class="buttons">
        <!-- Öffnet das Formular zum Erstellen einer neuen Aufgabe. -->
        <button onclick={openDialog}>+ New Issue</button>
        <!-- Exportiert alle Aufgaben als CSV. -->
        <button onclick={exportCSV}>Export CSV</button>
        <!-- Fragt nach Benachrichtigungsrechten des Browsers. -->
        <button onclick={enableNotifications}>Enable Notifications</button>
    </div>
</header>

<div class="board">
    <!-- Rendert für jede Spalte eine eigene Lane-Komponente. -->
    {#each lanes as lane}
        <Lane
            title={lane}
            issues={issues.filter(i => i.lane === lane)}
            onMove={moveIssue}
        />
    {/each}
</div>

<dialog bind:this={dialog}>
    <!-- Überschrift im Popup-Dialog. -->
    <h2>New Issue</h2>

    <!-- Das Formular zur Erstellung neuer Aufgaben. -->
    <IssueForm onCreate={addIssue} />

    <!-- Schließt das Dialogfenster. -->
    <button class="close" onclick={() => dialog.close()}>
        Close
    </button>
</dialog>

<style>
    /* Setzt den globalen Seitenhintergrund und die Grundschrift. */
    :global(body) {
        margin: 0;
        background: #f8f9fb;
        color: #263445;
        font-family: Arial, sans-serif;
    }

    /* Abstand um den Kopfbereich der Seite. */
    header {
        padding: 25px;
    }

    /* Stil für die Hauptüberschrift. */
    h1 {
        font-size: 32px;
        margin: 0 0 20px;
    }

    /* Container für die Aktionstasten im Header. */
    .buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    /* Stil für die Buttons im Header. */
    .buttons button {
        padding: 11px 15px;
        background: #263445;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    /* Layout der Kanban-Spalten. */
    .board {
        display: flex;
        gap: 15px;
        padding: 0 25px 25px;
        align-items: stretch;
        overflow-x: auto;
    }

    /* Dialogfenster mit fester Größe und Rundungen. */
    dialog {
        position: fixed;
        margin: auto;
        padding: 25px;
        border: none;
        border-radius: 10px;
        width: 350px;
        max-width: 85vw;
        max-height: 85vh;
        overflow-y: auto;
    }

    /* Dunkler Hintergrund hinter dem Dialog. */
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.55);
    }

    /* Schließen-Button im Dialog. */
    .close {
        margin-top: 12px;
        padding: 8px;
        cursor: pointer;
    }
</style>
